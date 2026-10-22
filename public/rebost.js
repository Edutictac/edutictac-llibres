/* Optional, same-origin, read-only Commons connector. No credentials in messages. */
const ID = /^img-[a-f0-9]{64}$/;
export function selection(event, source, request) {
  const d = event.data;
  return (
    event.origin === location.origin &&
    event.source === source &&
    d?.format === "rebost-selection" &&
    d.version === 1 &&
    d.request === request &&
    (d.cancel === true || (ID.test(d.id) && d.family === undefined))
  );
}
async function read(path, limit, signal) {
  const response = await fetch("/api/assets/v1" + path, {
    credentials: "same-origin",
    cache: "no-store",
    redirect: "error",
    signal,
  });
  if (!response.ok)
    throw new Error(response.status === 401 ? "rebostSession" : "rebostError");
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > limit) throw new Error("rebostError");
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  if (!size) throw new Error("rebostError");
  return new Blob(chunks, { type: response.headers.get("content-type") || "" });
}
export function validateCredit(c) {
  if (new Blob([JSON.stringify(c)]).size > 420 * 1024)
    throw new Error("invalid");
  if (
    !c ||
    c.format !== "llibres-rebost-credit" ||
    c.version !== 1 ||
    !ID.test(c.id) ||
    !Number.isSafeInteger(c.revision) ||
    c.revision < 1
  )
    throw new Error("invalid");
  for (const k of [
    "name",
    "source_id",
    "source_revision",
    "source_path",
    "source_repository",
    "license",
    "attribution",
    "changes",
  ])
    if (typeof c[k] !== "string" || !c[k] || c[k].length > 2000)
      throw new Error("invalid");
  if (
    typeof c.source !== "string" ||
    !c.source ||
    new Blob([c.source]).size > 256 * 1024 ||
    typeof c.licenseText !== "string" ||
    !c.licenseText ||
    new Blob([c.licenseText]).size > 128 * 1024
  )
    throw new Error("invalid");
  return c;
}
export async function fetchImage(id, lang, signal) {
  if (!ID.test(id)) throw new Error("rebostError");
  const path = "/items/" + id;
  const metadata = async () =>
    JSON.parse(await (await read(path, 32 * 1024, signal)).text());
  const item = await metadata();
  if (
    item.id !== id ||
    !["sprite", "background", "object", "illustration"].includes(item.type) ||
    !Number.isSafeInteger(item.revision) ||
    item.revision < 1
  )
    throw new Error("rebostError");
  const name = (
    item.names?.[lang === "va" ? "ca" : lang] ||
    item.name ||
    "Rebost"
  ).slice(0, 200);
  const blob = await read(path + "/content", 5 * 1024 * 1024, signal);
  if (blob.type.split(";")[0] !== "image/png") throw new Error("imageError");
  const signature = new Uint8Array(await blob.slice(0, 8).arrayBuffer());
  if (signature.join() !== "137,80,78,71,13,10,26,10")
    throw new Error("imageError");
  const origin = ["catalog", "scratch"].includes(item.collection)
    ? item
    : item.provenance;
  let credit = null;
  if (origin) {
    const source = await (
      await read(path + "/source", 256 * 1024, signal)
    ).text();
    const licenseText = await (
      await read(path + "/license", 128 * 1024, signal)
    ).text();
    credit = {
      format: "llibres-rebost-credit",
      version: 1,
      id,
      revision: item.revision,
      name,
      source,
      licenseText,
      changes:
        "Imported as normalized PNG into Llibres; placement, size and appearance may be edited.",
    };
    for (const k of [
      "source_id",
      "source_revision",
      "source_path",
      "source_repository",
      "license",
      "attribution",
    ])
      credit[k] = origin[k];
    try {
      validateCredit(credit);
    } catch {
      throw new Error("rebostError");
    }
  }
  if ((await metadata()).revision !== item.revision)
    throw new Error("rebostChanged");
  return {
    file: new File([blob], name + ".png", { type: "image/png" }),
    credit,
  };
}
