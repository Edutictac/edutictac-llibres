/* Bounded ZIP inspection. Only local illustrated-slide projects are editable here. */
import { validateCredit } from "./rebost.js";

function validateSVG(svg) {
  if (!svg) return;
  if (/<script|<foreignObject|\bon\w+\s*=|javascript:/i.test(svg))
    throw new Error("invalid");
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (doc.querySelector("parsererror")) throw new Error("invalid");
  // Credits can contain website addresses as ordinary text. Inspect resource
  // attributes and CSS instead of rejecting those attribution text nodes.
  for (const node of doc.querySelectorAll("*")) {
    for (const attribute of node.attributes) {
      const namespace = attribute.name === "xmlns" ||
        attribute.namespaceURI === "http://www.w3.org/2000/xmlns/";
      if (!namespace && /https?:\/\//i.test(attribute.value))
        throw new Error("invalid");
    }
    if (node.localName.toLowerCase() === "style" && /https?:\/\//i.test(node.textContent))
      throw new Error("invalid");
  }
}

export async function inspectBook(bytes) {
  if (bytes.byteLength > 25 * 1024 * 1024) throw new Error("invalid");
  // Check central-directory sizes before inflating; reject ZIP64 and symlinks.
  const view = new DataView(bytes);
  let end = -1;
  for (
    let i = bytes.byteLength - 22;
    i >= Math.max(0, bytes.byteLength - 65557);
    i--
  )
    if (view.getUint32(i, true) === 0x06054b50) {
      end = i;
      break;
    }
  if (end < 0 || view.getUint16(end + 4, true) || view.getUint16(end + 6, true))
    throw new Error("invalid");
  const entries = view.getUint16(end + 10, true);
  let offset = view.getUint32(end + 16, true),
    declared = 0;
  if (entries > 2048 || entries === 65535) throw new Error("invalid");
  for (let i = 0; i < entries; i++) {
    if (offset + 46 > end || view.getUint32(offset, true) !== 0x02014b50)
      throw new Error("invalid");
    const size = view.getUint32(offset + 24, true),
      flags = view.getUint16(offset + 8, true),
      method = view.getUint16(offset + 10, true);
    const mode = view.getUint32(offset + 38, true) >>> 16;
    declared += size;
    if (
      declared > 100 * 1024 * 1024 ||
      flags & 1 ||
      ![0, 8].includes(method) ||
      (mode & 0xf000) === 0xa000
    )
      throw new Error("invalid");
    offset +=
      46 +
      view.getUint16(offset + 28, true) +
      view.getUint16(offset + 30, true) +
      view.getUint16(offset + 32, true);
  }
  let xml = null,
    total = 0,
    count = 0;
  const resources = {};
  await new Promise((resolve, reject) => {
    try {
      const unzip = new fflate.Unzip((file) => {
        if (
          ++count > 2048 ||
          /^(?:[a-z]:|\/)/i.test(file.name) ||
          file.name.includes("\\") ||
          file.name.split("/").includes("..") ||
          file.originalSize > 100 * 1024 * 1024
        )
          throw new Error("invalid");
        const chunks = [];
        let length = 0;
        file.ondata = (error, data, final) => {
          if (error) {
            reject(error);
            return;
          }
          total += data.length;
          length += data.length;
          if (
            total > 100 * 1024 * 1024 ||
            (/^content\/resources\//.test(file.name) &&
              length >
                (file.name.endsWith(".rebost.txt")
                  ? 420 * 1024
                  : 5 * 1024 * 1024)) ||
            (file.name === "content.xml" && length > 5 * 1024 * 1024)
          ) {
            reject(new Error("invalid"));
            throw new Error("invalid");
          }
          const resource =
            /^content\/resources\/.+\.(png|jpe?g|webp|rebost\.txt)$/i.test(
              file.name,
            );
          if (file.name === "content.xml" || resource) chunks.push(data);
          if (final && (file.name === "content.xml" || resource)) {
            const out = new Uint8Array(length);
            let offset = 0;
            for (const c of chunks) {
              out.set(c, offset);
              offset += c.length;
            }
            if (resource) resources[file.name] = out;
            else xml = new TextDecoder().decode(out);
          }
        };
        file.start();
      });
      unzip.register(fflate.UnzipInflate);
      const input = new Uint8Array(bytes);
      for (let i = 0; i < input.length; i += 8192)
        unzip.push(input.subarray(i, i + 8192), i + 8192 >= input.length);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
  if (
    !xml ||
    /<!ENTITY|<!DOCTYPE(?!\s+ode\s+SYSTEM\s+["']content\.dtd["']\s*>)/i.test(
      xml.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, ""),
    )
  )
    throw new Error("invalid");
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const tags = (name) => Array.from(doc.getElementsByTagNameNS("*", name));
  if (
    doc.querySelector("parsererror") ||
    tags("odeNavStructure").length < 1 ||
    tags("odeNavStructure").length > 51
  )
    throw new Error("invalid");
  for (const type of tags("odeIdeviceTypeName"))
    if (type.textContent !== "slide") throw new Error("invalid");
  for (const json of tags("jsonProperties")) {
    const data = JSON.parse(json.textContent || "{}");
    if (
      data.engine !== "fabric" ||
      data.version !== 3 ||
      !Number.isFinite(data.width) ||
      !Number.isFinite(data.height) ||
      data.width < 1 ||
      data.height < 1 ||
      data.width > 1920 ||
      data.height > 1200 ||
      !Array.isArray(data.fabric?.objects) ||
      data.fabric.objects.length > 500
    )
      throw new Error("invalid");
    const walk = (value) => {
      if (!value || typeof value !== "object") return;
      for (const [key, v] of Object.entries(value)) {
        if (["__proto__", "constructor", "prototype"].includes(key))
          throw new Error("invalid");
        if (key === 'layoutManager') {
          // Fabric 7 serializes this built-in descriptor inside standard groups.
          // Do not allow arbitrary registered layout classes or extra payloads.
          if (String(value.type).toLowerCase() !== 'group' || !v || v.type !== 'layoutManager' || v.strategy !== 'fit-content' ||
              Object.keys(v).some(k=>!['type','strategy'].includes(k)))
            throw new Error('invalid');
          continue;
        }
        if (
          key === "type" &&
          ![
            "textbox",
            "text",
            "i-text",
            "image",
            "fabricimage",
            "rect",
            "circle",
            "ellipse",
            "triangle",
            "polygon",
            "polyline",
            "path",
            "line",
            "group",
          ].includes(String(v).toLowerCase())
        )
          throw new Error("invalid");
        if (
          ["src", "slideAssetUrl"].includes(key) &&
          typeof v === "string" &&
          !/^(asset:\/\/|\{\{context_path\}\}\/)/.test(v)
        )
          throw new Error("invalid");
        if (typeof v === "object") walk(v);
      }
    };
    walk(data.fabric);
    validateSVG(data.svg || "");
  }
  for (const html of tags("htmlView"))
    if (
      /<script|<iframe|<object|<embed|\bon\w+\s*=|javascript:/i.test(
        html.textContent,
      )
    )
      throw new Error("invalid");
  for (const property of [...tags("odeProperty"), ...tags("userPreference")]) {
    const key =
      property.getElementsByTagNameNS("*", "key")[0]?.textContent || "";
    const value =
      property.getElementsByTagNameNS("*", "value")[0]?.textContent || "";
    if (
      (/custom|script|head|style/i.test(key) && value.trim()) ||
      (key === "theme" && value !== "base")
    )
      throw new Error("invalid");
  }
  // Rebuild an import-only container. Never import executable themes, libraries,
  // custom iDevices or pre-rendered HTML supplied by an archive.
  for (const [name, data] of Object.entries(resources)) {
    if (name.endsWith(".rebost.txt")) {
      if (data.length > 420 * 1024) throw new Error("invalid");
      validateCredit(JSON.parse(new TextDecoder().decode(data)));
      continue;
    }
    if (data.length > 5 * 1024 * 1024) throw new Error("invalid");
    let image;
    try {
      image = await createImageBitmap(new Blob([data]));
    } catch {
      throw new Error("invalid");
    }
    const valid = image.width <= 4096 && image.height <= 4096;
    image.close();
    if (!valid) throw new Error("invalid");
  }
  return fflate.zipSync({
    "content.xml": new TextEncoder().encode(xml),
    ...resources,
  }).buffer;
}
