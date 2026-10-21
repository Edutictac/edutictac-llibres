/* Optional publication client. No provider API, credentials or external uploads. */
export async function publicationRequest(path, options = {}) {
  const response = await fetch("/api/llibres" + path, {
    ...options,
    credentials: "same-origin",
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(120000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      typeof data.detail === "string" ? data.detail : "publication_unavailable",
    );
  return data;
}
export function safeWebURL(value) {
  const url = new URL(value, location.origin);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password
  )
    throw new Error("invalid_publication");
  return url.href;
}
export async function coverImage(svg) {
  const clean = DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ["image"],
    ADD_DATA_URI_TAGS: ["image"],
    ADD_ATTR: ["href"],
  });
  const url = URL.createObjectURL(new Blob([clean], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 360;
    canvas.getContext("2d").drawImage(image, 0, 0, 640, 360);
    return await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("invalid_publication"))),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
export async function publicationPackage(editor, book, metadata) {
  const pages = await editor.slides();
  const cover = await coverImage(pages[0].svg);
  const files = await editor.publicationCredits();
  files["manifest.json"] = new TextEncoder().encode(
    JSON.stringify({
      format: "llibres-publication",
      version: 1,
      visibility: "public",
      confirmed: true,
      title: book.title,
      ...metadata,
      pages: pages.map((p) => p.title),
    }),
  );
  for (const [i, page] of pages.entries()) {
    const document = new DOMParser().parseFromString(page.svg, "image/svg+xml");
    if (document.querySelector("parsererror"))
      throw new Error("invalid_publication");
    // Fabric includes the standard SVG DTD. Send only the SVG element; the
    // server rejects all DTDs and validates every element independently.
    files["pages/" + (i + 1) + ".svg"] = new TextEncoder().encode(
      new XMLSerializer().serializeToString(document.documentElement),
    );
  }
  files["cover.png"] = new Uint8Array(await cover.arrayBuffer());
  if (metadata.editable) files["source.elpx"] = new Uint8Array(book.bytes);
  const bytes = fflate.zipSync(files, { level: 6 });
  if (bytes.length > 30 * 1024 * 1024) throw new Error("publication_limit");
  return bytes;
}
