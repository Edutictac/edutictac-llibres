/* Conector Rebost de Llibres: mismo origen, solo lectura. La lógica común vive en @edutictac/rebost-client
   (copia en ./rebost-client, ver scripts/sync-rebost-client.sh). Aquí solo queda lo propio de Llibres. */
import { RebostClient, RebostError, ITEM_ID as ID, fetchSelection } from "./rebost-client/index.js";
import { parseSelection } from "./rebost-client/selection.js";

const client = new RebostClient();
const TYPES = ["sprite", "background", "object", "illustration"];

export function selection(event, source, request) {
  const parsed = parseSelection(event, { source, request });
  return !!parsed && (parsed.cancel === true || parsed.family === false);
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
  const timeout = new Promise((_, reject) =>
    signal?.addEventListener("abort", () => reject(new Error("rebostError")), { once: true }),
  );
  try {
    if (!ID.test(id)) throw new Error("rebostError");
    const { name, blob, credit } = await Promise.race([
      fetchSelection(client, id, {
        types: TYPES,
        locale: lang,
        changes:
          "Imported as normalized PNG into Llibres; placement, size and appearance may be edited.",
      }),
      timeout,
    ]);
    let full = null;
    if (credit) {
      full = { format: "llibres-rebost-credit", version: 1, ...credit };
      try {
        validateCredit(full);
      } catch {
        throw new Error("rebostError");
      }
    }
    return { file: new File([blob], name + ".png", { type: "image/png" }), credit: full };
  } catch (error) {
    if (!(error instanceof RebostError)) throw error;
    throw new Error(
      error.code === "session" ? "rebostSession" : error.code === "conflict" ? "rebostChanged" : "rebostError",
    );
  }
}
