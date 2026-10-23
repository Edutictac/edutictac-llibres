import { messages } from "/i18n.js";
/* Version-pinned eXeLearning 4.0.5 adapter. Internal calls are confined here. */
import {
  imageCredit,
  migrateCredits,
  collectCredits,
  sceneObjects,
} from "./credits.js";
import { validateCredit } from "./rebost.js";
import {layouts, panelBoxes, comicPanels, bubbleData, makeBubble, protectPanels} from './comic.js';
export class Editor {
  constructor(frame) {
    this.frame = frame;
    this.pending = new Map();
    this.serial = 0;
    this.counter = 0;
    this.changed = () => {};
    this.comicSelectionChanged = () => {};
    this.comicPanelIndex = 0;
    window.addEventListener("message", (event) => {
      if (
        event.origin !== location.origin ||
        event.source !== frame.contentWindow
      )
        return;
      const d = event.data;
      if (!d || typeof d !== "object") return;
      const p = this.pending.get(d.requestId);
      if (p) {
        clearTimeout(p.timeout);
        this.pending.delete(d.requestId);
        d.error ? p.reject(new Error(d.error)) : p.resolve(d);
      }
    });
  }
  get window() {
    return this.frame.contentWindow;
  }
  get project() {
    return this.window.eXeLearning.app.project;
  }
  get bridge() {
    return this.project._yjsBridge;
  }
  get manager() {
    return this.bridge.documentManager;
  }
  async ready() {
    const start = Date.now();
    while (!this.window.eXeLearning?.documentReady) {
      if (Date.now() - start > 60000) throw new Error("editor_timeout");
      await new Promise((r) => setTimeout(r, 80));
    }
    await this.window.eXeLearning.documentReady;
    // The upstream open-file bridge uses randomUUID even on HTTP previews.
    if (!this.window.crypto.randomUUID)
      this.window.crypto.randomUUID = () =>
        "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
          (
            c ^
            (this.window.crypto.getRandomValues(new Uint8Array(1))[0] &
              (15 >> (c / 4)))
          ).toString(16),
        );
    this.window.eXeLearning.app.embeddingBridge.trustedOrigins = [
      location.origin,
    ];
    const link = this.window.document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/editor.css";
    this.window.document.head.append(link);
    this.window.document.body.classList.add("llibres-simple");
    this.observe();
  }
  connectImagePicker(pick) {
    const manager = this.window.eXeLearning.app.modals.filemanager;
    const original = manager.show.bind(manager);
    manager.show = (options = {}) => {
      if (
        options.accept === "image" &&
        !options.multiSelect &&
        options.onSelect
      ) {
        // Slide's existing gallery button delegates to our bounded image picker.
        // We insert through AssetManager ourselves; null prevents a second image.
        options.onSelect(null);
        pick();
        return;
      }
      return original(options);
    };
  }
  observe() {
    this.observedDoc?.off("update", this.observer);
    this.observedDoc = this.manager.ydoc;
    this.observer = () => {
      this.counter++;
      this.changed();
    };
    this.observedDoc.on("update", this.observer);
  }
  request(type, data = {}) {
    const requestId = "llibres-" + ++this.serial;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error("editor_timeout"));
      }, 90000);
      this.pending.set(requestId, { resolve, reject, timeout });
      this.window.postMessage({ type, data, requestId }, location.origin);
    });
  }
  pages() {
    return this.manager
      .getNavigation()
      .toJSON()
      .slice()
      .sort((a, b) => a.order - b.order);
  }
  title(value) {
    if (value !== undefined) this.manager.getMetadata().set("title", value);
    return this.manager.getMetadata().get("title");
  }
  async flush(sync = true) {
    for (const c of this.project.idevices.components.idevices) {
      if (c.loading) throw new Error("editor_loading");
      if (c.mode === "edition") {
        this.removeInlineCredits();
        const old = this.window.$exeDevice?._editorApi;
        if ((await c.save()) === false) throw new Error("save_failed");
        old?.destroy();
        if (this.window.$exeDevice) this.window.$exeDevice._editorApi = null;
      }
    }
    this.project.idevices.updateMode();
    if (sync) await this.syncCredits();
  }
  async edit() {
    this.project.idevices.updateMode();
    const c = this.project.idevices.components.idevices.find(
      (c) => c.odeIdeviceTypeName === "slide",
    );
    if (c && c.mode !== "edition") {
      for (const script of this.window.document.querySelectorAll(
        "head script[src]",
      ))
        if (new URL(script.src).pathname.endsWith("/slide/edition/slide.js"))
          script.remove();
      c.edition();
    }
    const start = Date.now();
    while (!this.window.$exeDevice?._editorApi) {
      if (Date.now() - start > 20000) throw new Error("editor_loading");
      await new Promise((r) => setTimeout(r, 60));
    }
    const canvas = this.window.__slideEditorCanvas;
    // mount() exposes its API before asynchronous image hydration finishes.
    // Never let an immediate save overwrite a scene that is still loading.
    let payload = c?.jsonProperties;
    if (typeof payload === "string") payload = JSON.parse(payload);
    const expected = payload?.fabric?.objects?.length ?? 0;
    if (!canvas.__llibresReady) {
      while (canvas.getObjects().length !== expected) {
        if (Date.now() - start > 20000) throw new Error("editor_loading");
        await new Promise((r) => setTimeout(r, 30));
      }
      canvas.__llibresReady = true;
    }
    // Fabric canvas.toJSON() does not forward the upstream include list.
    for (const Type of new Set([
      this.window.fabric.FabricObject,
      ...sceneObjects(canvas.getObjects()).map((o) => o.constructor),
    ])) {
      Type.customProperties = [
        ...new Set([
          ...(Type.customProperties || []),
          "slideMeta",
          "slideAssetUrl",
          "slideAssetName",
        ]),
      ];
    }
    await this.recoverLegacyCredits(canvas);
    this.removeInlineCredits();
    protectPanels(canvas, () => this.window.crypto.randomUUID());
    if (!canvas.__llibresComicObserved) {
      canvas.__llibresComicObserved = true;
      for (const event of ['selection:created', 'selection:updated', 'selection:cleared'])
        canvas.on(event, () => this.comicSelectionChanged());
      canvas.on('object:added', () => protectPanels(canvas, () => this.window.crypto.randomUUID()));
    }
    if (!canvas.__llibresObserved) {
      canvas.__llibresObserved = true;
      for (const event of [
        "object:added",
        "object:modified",
        "object:removed",
        "text:changed",
        "path:created",
      ])
        canvas.on(event, () => {
          this.counter++;
          this.changed();
        });
    }
  }
  async recoverLegacyCredits(canvas) {
    const labels = canvas
      .getObjects()
      .filter(
        (o) =>
          typeof o.text === "string" &&
          o.text.includes(" · ") &&
          !o.slideMeta?.rebostCreditsFooter &&
          !o.slideMeta?.rebostCreditId,
      );
    if (!labels.length) return;
    for (const meta of this.bridge.assetManager.getAllAssetsMetadata()) {
      if (!meta.filename?.endsWith(".rebost.txt") || meta.size > 420 * 1024)
        continue;
      const asset = await this.bridge.assetManager.getAsset(meta.id);
      if (!asset?.blob || asset.blob.size > 420 * 1024) continue;
      let credit;
      try {
        credit = validateCredit(JSON.parse(await asset.blob.text()));
      } catch {
        continue;
      }
      const entry = imageCredit(credit);
      for (const label of labels) {
        if (label.text === entry.text)
          label.slideMeta = { ...label.slideMeta, rebostCreditId: entry.id };
      }
    }
  }
  removeInlineCredits() {
    const canvas = this.window.__slideEditorCanvas;
    if (
      !canvas?.__llibresReady ||
      this.arrangingCredits ||
      canvas.getObjects().some((o) => o.slideMeta?.llibresCreditsPage)
    )
      return;
    this.arrangingCredits = true;
    try {
      const objects = canvas.getObjects();
      migrateCredits(objects);
      const images = collectCredits(
        sceneObjects(objects).filter((o) =>
          ["image", "fabricimage"].includes(String(o.type).toLowerCase()),
        ),
      );
      const labels = objects.filter((o) => o.slideMeta?.rebostCreditId);
      const footers = objects.filter((o) => o.slideMeta?.rebostCreditsFooter);
      const archives = objects.filter((o) => o.slideMeta?.rebostCreditArchive);
      const legacy = collectCredits([
        {
          type: "image",
          slideMeta: {
            rebostCredits: [
              ...labels.map((o) => ({
                id: o.slideMeta.rebostCreditId,
                text: o.text,
              })),
              ...[...footers, ...archives].flatMap(
                (o) => o.slideMeta.rebostLegacyCredits || [],
              ),
            ],
          },
        },
      ]).filter((c) => !images.some((i) => i.id === c.id && i.text === c.text));
      for (const o of [...labels, ...footers, ...archives]) canvas.remove(o);
      if (legacy.length) {
        const archive = new this.window.fabric.Rect({
          left: 0,
          top: 0,
          width: 1,
          height: 1,
          opacity: 0,
          selectable: false,
          evented: false,
        });
        archive.slideMeta = {
          rebostCreditArchive: true,
          rebostLegacyCredits: legacy,
        };
        canvas.add(archive);
      }
      if (labels.length || footers.length || archives.length)
        canvas.requestRenderAll();
    } finally {
      this.arrangingCredits = false;
    }
  }
  pageScene(page) {
    const component = (page.blocks || [])
      .flatMap((b) => b.components || [])
      .find((c) => c.ideviceType === "slide");
    let data = component?.jsonProperties;
    if (typeof data === "string") data = JSON.parse(data);
    return { component, data };
  }
  isCreditsPage(page) {
    return !!this.pageScene(page).data?.fabric?.objects?.some(
      (o) => o.slideMeta?.llibresCreditsPage,
    );
  }
  contentPages() {
    return this.pages().filter((p) => !this.isCreditsPage(p));
  }
  async showPage(id) {
    this.activePage = id;
    await this.project.structure.resetStructureData(id);
  }
  creditsScene(entries, title) {
    const base = this.scene("");
    const options = {
      originX: "left",
      originY: "top",
      left: 70,
      width: 1140,
      fontFamily: "Arial",
      fill: "#193f38",
      selectable: false,
      evented: false,
    };
    const heading = new this.window.fabric.Textbox(title, {
      ...options,
      top: 55,
      fontSize: 44,
    });
    heading.slideMeta = { llibresCreditsPage: true };
    const body = new this.window.fabric.Textbox(
      entries.map((c) => "• " + c.text).join("\n"),
      { ...options, top: 145, fontSize: 22, lineHeight: 1.3 },
    );
    body.slideMeta = { rebostBookCredits: entries };
    body.initDimensions();
    const scale = Math.min(1, 510 / body.height);
    body.set({ scaleX: scale, scaleY: scale });
    base.fabric.objects = [
      heading.toObject(["slideMeta"]),
      body.toObject(["slideMeta"]),
    ];
    base.svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="#fffdf5"/>' +
      heading.toSVG() +
      body.toSVG() +
      "</svg>";
    return base;
  }
  async syncCredits() {
    const binding = this.bridge.structureBinding;
    const original = this.activePage;
    // Migrate old footers through the native renderer to refresh SVG and HTML.
    for (const page of this.contentPages()) {
      const objects = this.pageScene(page).data?.fabric?.objects || [];
      if (
        !sceneObjects(objects).some(
          (o) =>
            o.slideMeta?.rebostCreditsFooter ||
            o.slideMeta?.rebostCreditId ||
            (typeof o.text === "string" && o.text.includes(" · ")),
        )
      )
        continue;
      await this.showPage(page.id);
      await this.edit();
      await this.flush(false);
    }
    const locale = String(this.manager.getMetadata().get("language") || "es");
    const entries = collectCredits(
      this.contentPages().flatMap(
        (p) => this.pageScene(p).data?.fabric?.objects || [],
      ),
      locale,
    );
    const managed = this.pages().filter((p) => this.isCreditsPage(p));
    let page = managed.shift();
    for (const duplicate of managed) binding.deletePage(duplicate.id);
    if (!entries.length) {
      if (page) binding.deletePage(page.id);
    } else {
      const title = messages[locale === "ca-valencia" ? "va" : locale]?.credits || messages.es.credits;
      let created = false;
      if (!page) {
        page = binding.addPage(title);
        this.addSlide(page.id, this.creditsScene(entries, title));
        created = true;
      }
      const { component, data } = this.pageScene(
        this.pages().find((p) => p.id === page.id),
      );
      const previous = data.fabric.objects.find(
        (o) => o.slideMeta?.rebostBookCredits,
      )?.slideMeta.rebostBookCredits;
      if (created || JSON.stringify(previous) !== JSON.stringify(entries)) {
        binding.updateComponent(component.id, {
          jsonProperties: JSON.stringify(this.creditsScene(entries, title)),
        });
        await this.showPage(page.id);
        await this.edit();
        await this.flush(false);
      }
      if (page.pageName !== title)
        binding.updatePage(page.id, { pageName: title });
    }
    const pages = [
      ...this.contentPages(),
      ...this.pages().filter((p) => this.isCreditsPage(p)),
    ];
    pages.forEach((p, order) => {
      if (p.order !== order) binding.updatePage(p.id, { order });
    });
    const restored = this.pages().some((p) => p.id === original)
      ? original
      : this.contentPages()[0]?.id;
    if (restored && restored !== this.activePage) await this.showPage(restored);
  }
  async select(id) {
    await this.flush();
    await this.showPage(id);
    await this.edit();
  }
  scene(text, background = "#fffdf5", subtitle = "") {
    const objects = [];
    const textbox = (text, top, fontSize) => ({
      type: "Textbox",
      originX: "left",
      originY: "top",
      left: 90,
      top,
      width: 1100,
      fontSize,
      fontFamily: "Arial",
      fill: "#193f38",
      text,
    });
    if (text) objects.push(textbox(text, 150, 70));
    if (subtitle) objects.push(textbox(subtitle, 320, 32));
    return {
      version: 3,
      engine: "fabric",
      width: 1280,
      height: 720,
      background,
      fabric: { version: "7.4.0", objects },
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="' +
        background +
        '"/>' +
        objects
          .map(
            (o) =>
              '<text x="90" y="' +
              (o.top + o.fontSize) +
              '" font-family="Arial" font-size="' +
              o.fontSize +
              '" fill="#193f38">' +
              o.text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;") +
              "</text>",
          )
          .join("") +
        "</svg>",
    };
  }
  addSlide(id, payload) {
    const b = this.bridge.structureBinding,
      block = b.createBlock(id, "");
    return b.createComponent(id, block, "slide", {
      jsonProperties: JSON.stringify(payload),
    });
  }
  async create(title, template, lang, layout = 2) {
    const text = messages[lang] || messages.es;
    const b = this.bridge.structureBinding;
    for (const p of this.pages()) b.deletePage(p.id);
    const m = this.manager.getMetadata();
    for (const [k, v] of Object.entries({
      title,
      language: lang === "va" ? "ca-valencia" : lang,
      addPagination: "true",
      addExeLink: "true",
      exportSource: "true",
    }))
      m.set(k, v);
    const cover = b.addPage(text.cover);
    this.addSlide(
      cover.id,
      this.scene(
        title,
        template === "album" ? "#e4ebdc" : "#f6e3ce",
        text.storySubtitle,
      ),
    );
    if (template === 'comic') {
      // Slides loads Fabric when its first editing canvas is mounted.
      await this.showPage(cover.id);
      await this.edit();
      await this.flush(false);
      const scene = this.pageScene(this.pages().find(p => p.id === cover.id));
      scene.data.fabric.objects[0].slideMeta = {comicDocument: {version: 1, layout: layouts.includes(layout) ? layout : 2}};
      this.bridge.structureBinding.updateComponent(scene.component.id, {jsonProperties: JSON.stringify(scene.data)});
      const page = b.addPage(text.page + ' 1');
      this.addSlide(page.id, this.comicScene(text.page + ' 1', layout));
    } else if (template !== "blank")
      for (let i = 1; i <= 2; i++) {
        const p = b.addPage(text.page + " " + i);
        this.addSlide(
          p.id,
          this.scene(
            i === 1 ? text.storyStart : "",
          ),
        );
      }
    await this.showPage(cover.id);
    this.observe();
    await this.edit();
    return cover.id;
  }
  comicScene(name, layout) {
    if (!layouts.includes(layout)) layout = 2;
    const scene = this.scene('');
    const heading = new this.window.fabric.Textbox(name, {
      originX:'left', originY:'top', left:60, top:40, width:1160,
      fontFamily:'Arial', fontSize:38, fill:'#193f38',
    });
    const objects = [heading, ...comicPanels(this.window.fabric, layout)];
    scene.fabric.objects = objects.map(object => object.toObject(['slideMeta']));
    scene.svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="#fffdf5"/>${objects.map(o=>o.toSVG()).join('')}</svg>`;
    return scene;
  }
  comicInfo() {
    const scenes = this.contentPages().map(p => ({page:p, data:this.pageScene(p).data}));
    const current = scenes.find(s=>s.page.id===this.activePage);
    const marker = scenes.flatMap(s=>s.data?.fabric?.objects || []).find(o=>o.slideMeta?.comicDocument || o.slideMeta?.comicPanel);
    const defaults = marker?.slideMeta?.comicDocument || marker?.slideMeta?.comicPanel;
    const frame = current?.data?.fabric?.objects?.find(o=>o.slideMeta?.comicPanel);
    const layout = frame?.slideMeta.comicPanel.layout;
    return {enabled:!!marker, layout:layouts.includes(layout)?layout:0, defaultLayout:layouts.includes(defaults?.layout)?defaults.layout:2};
  }
  selectedBubble() {
    const object = this.window.__slideEditorCanvas?.getActiveObject();
    return bubbleData(object) ? object : null;
  }
  bubbleDraft() { return bubbleData(this.selectedBubble()); }
  targetPanel() {
    const boxes = panelBoxes(this.comicInfo().layout);
    return boxes[Math.min(Math.max(0,this.comicPanelIndex),boxes.length-1)];
  }
  async writeBubble(draft) {
    const canvas = await this.drawing(false), box = this.targetPanel();
    if (!box) throw new Error('comicChoosePage');
    const old = draft.id ? canvas.getObjects().find(o=>bubbleData(o)?.id===draft.id) : null;
    if (draft.id && !old) throw new Error('comicSelectBubble');
    let group = makeBubble(this.window.fabric, {...draft,id: draft.id || this.window.crypto.randomUUID()}, box);
    if (old) {
      const position={left:old.left,top:old.top,angle:old.angle,scaleX:old.scaleX,scaleY:old.scaleY};
      const children=group.removeAll();
      old.removeAll();old.add(...children);old.slideMeta=group.slideMeta;old.set(position);
      group=old;
      // One modification for Slides' native undo history, rather than a delete
      // followed by an insert that would temporarily lose the edited bubble.
      canvas.fire('object:modified',{target:group});
    } else canvas.add(group);
    canvas.setActiveObject(group); group.setCoords(); canvas.requestRenderAll();
    this.comicSelectionChanged(); this.changed();
  }
  async addPage(name, comicLayout = 0) {
    await this.flush();
    const p = this.bridge.structureBinding.addPage(name);
    this.addSlide(p.id, layouts.includes(comicLayout) ? this.comicScene(name, comicLayout) : this.scene(""));
    await this.syncCredits();
    await this.showPage(p.id);
    await this.edit();
    return p.id;
  }
  async move(id, delta) {
    await this.flush();
    const pages = this.contentPages(),
      index = pages.findIndex((p) => p.id === id);
    if (index < 0 || index + delta < 0 || index + delta >= pages.length) return;
    const b = this.bridge.structureBinding;
    delta < 0 ? b.movePagePrev(id) : b.movePageNext(id);
    await this.showPage(id);
    await this.edit();
  }
  async rename(id, name) {
    await this.flush();
    if (this.isCreditsPage(this.pages().find((p) => p.id === id))) return;
    this.bridge.structureBinding.updatePage(id, { pageName: name });
    await this.showPage(id);
    await this.edit();
  }
  async delete(id) {
    await this.flush();
    if (
      this.contentPages().length <= 1 ||
      this.isCreditsPage(this.pages().find((p) => p.id === id))
    )
      return id;
    this.bridge.structureBinding.deletePage(id);
    await this.syncCredits();
    const p = this.contentPages()[0];
    await this.showPage(p.id);
    await this.edit();
    return p.id;
  }
  async save() {
    await this.flush();
    return (
      await this.request("REQUEST_EXPORT", {
        format: "elpx",
        options: { forceEditableSource: true },
      })
    ).bytes;
  }
  async open(bytes) {
    await this.request("OPEN_FILE", { bytes, filename: "llibre.elpx" });
    this.observe();
    const p = this.contentPages()[0];
    await this.showPage(p.id);
    await this.edit();
    await this.flush();
    await this.showPage(p.id);
    await this.edit();
    return p.id;
  }
  async export(format) {
    await this.flush();
    return this.request("REQUEST_EXPORT", {
      format,
      options: { forceEditableSource: true },
    });
  }
  async drawing(on) {
    await this.edit();
    const canvas = this.window.__slideEditorCanvas;
    canvas.isDrawingMode = on;
    if (on) {
      const brush = new this.window.fabric.PencilBrush(canvas);
      brush.color = "#245e4b";
      brush.width = 5;
      canvas.freeDrawingBrush = brush;
    }
    return canvas;
  }
  async image(file, credit = null) {
    if (
      file.size > 5 * 1024 * 1024 ||
      !["image/png", "image/jpeg", "image/webp"].includes(file.type)
    )
      throw new Error("imageError");
    const bitmap = await createImageBitmap(file);
    if (bitmap.width > 4096 || bitmap.height > 4096) {
      bitmap.close();
      throw new Error("imageError");
    }
    const target = document.createElement("canvas");
    target.width = bitmap.width;
    target.height = bitmap.height;
    target.getContext("2d").drawImage(bitmap, 0, 0);
    bitmap.close();
    const png = await new Promise((resolve) =>
      target.toBlob(resolve, "image/png"),
    );
    if (!png || png.size > 5 * 1024 * 1024) throw new Error("imageError");
    await this.edit();
    const canvas = await this.drawing(false),
      manager = this.bridge.assetManager;
    const upload = new this.window.File([png], "imatge.png", {
        type: "image/png",
      }),
      asset = await manager.insertImage(upload);
    if (credit) {
      // Keep original SVG as inert text, full license and provenance in all exports.
      // AssetManager's historical insertImage also accepts non-image attachments.
      await manager.insertImage(
        new this.window.File(
          [JSON.stringify(credit)],
          credit.id + ".rebost.txt",
          { type: "text/plain" },
        ),
      );
    }
    const image = await this.window.fabric.FabricImage.fromURL(
      await manager.resolveAssetURL(asset),
    );
    const scale = Math.min(800 / image.width, 420 / image.height, 1);
    image.set({
      originX: "left",
      originY: "top",
      left: 180,
      top: 160,
      scaleX: scale,
      scaleY: scale,
    });
    const panel = this.targetPanel();
    if (panel) {
      const fit = Math.min((panel.width-40)/image.width,(panel.height-60)/image.height,1);
      image.set({left:panel.left+(panel.width-image.width*fit)/2, top:panel.top+(panel.height-image.height*fit)/2, scaleX:fit, scaleY:fit});
    }
    image.slideAssetUrl = asset;
    image.slideAssetName = file.name;
    if (credit) image.slideMeta = { rebostCredits: [imageCredit(credit)] };
    canvas.add(image);
    this.removeInlineCredits();
    canvas.setActiveObject(image);
    canvas.requestRenderAll();
    this.counter++;
    this.changed();
    return asset;
  }
  async slides() {
    await this.flush();
    const slides = [];
    for (const p of this.pages()) {
      const c = (p.blocks || [])
        .flatMap((b) => b.components || [])
        .find((c) => c.ideviceType === "slide");
      let d = c?.jsonProperties;
      if (typeof d === "string") d = JSON.parse(d);
      if (!d?.svg) {
        slides.push({ title: p.pageName, svg: "" });
        continue;
      }
      const doc = new DOMParser().parseFromString(d.svg, "image/svg+xml");
      for (const image of doc.querySelectorAll("image")) {
        const href =
          image.getAttribute("href") ||
          image.getAttributeNS("http://www.w3.org/1999/xlink", "href") ||
          "";
        if (href.startsWith("asset://")) {
          const url = await this.bridge.assetManager.resolveAssetURL(href);
          const blob = await (await fetch(url)).blob();
          const data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
          });
          image.setAttribute("href", data);
          image.removeAttributeNS("http://www.w3.org/1999/xlink", "href");
        }
      }
      slides.push({
        title: p.pageName,
        svg: new XMLSerializer().serializeToString(doc),
      });
    }
    return slides;
  }
  async publicationCredits() {
    const used = new Set(
      collectCredits(
        this.contentPages().flatMap(
          (p) => this.pageScene(p).data?.fabric?.objects || [],
        ),
      ).map((c) => c.id),
    );
    const files = {};
    const manager = this.bridge.assetManager;
    for (const meta of manager.getAllAssetsMetadata()) {
      if (!meta.filename?.endsWith(".rebost.txt") || meta.size > 420 * 1024)
        continue;
      const asset = await manager.getAsset(meta.id);
      if (!asset?.blob) continue;
      const bytes = new Uint8Array(await asset.blob.arrayBuffer());
      const credit = validateCredit(
        JSON.parse(new TextDecoder().decode(bytes)),
      );
      if (used.has(credit.id))
        files["credits/" + (await manager.calculateHash(asset.blob)) + ".txt"] =
          bytes;
    }
    return files;
  }
}
