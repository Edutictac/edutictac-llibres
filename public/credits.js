/* Attribution data travels with images; rendering belongs to the book adapter. */
const isImage = (o) =>
  ["image", "fabricimage"].includes(String(o.type).toLowerCase());
export const sceneObjects = (objects) =>
  objects.flatMap((o) => [
    o,
    ...sceneObjects(o.getObjects?.() || o.objects || []),
  ]);
export function imageCredit(credit) {
  return {
    id: credit.id,
    text: credit.name + " · " + credit.attribution + " · " + credit.license,
  };
}
export function migrateCredits(objects) {
  objects = sceneObjects(objects);
  const legacy = objects.filter(
    (o) => o.slideMeta?.rebostCreditId && typeof o.text === "string",
  );
  for (const image of objects.filter(isImage)) {
    if (image.slideMeta?.rebostCredits?.length) continue;
    const name = image.slideAssetName?.replace(/\.png$/i, "");
    const matching = legacy.filter(
      (o) => name && o.text.startsWith(name + " · "),
    );
    if (matching.length)
      image.slideMeta = {
        ...image.slideMeta,
        rebostCredits: matching.map((o) => ({
          id: o.slideMeta.rebostCreditId,
          text: o.text,
        })),
      };
  }
}
export function collectCredits(objects, locale = "es") {
  objects = sceneObjects(objects);
  const credits = new Map();
  for (const o of objects) {
    const entries = isImage(o)
      ? o.slideMeta?.rebostCredits || []
      : o.slideMeta?.rebostCreditId
        ? [{ id: o.slideMeta.rebostCreditId, text: o.text }]
        : o.slideMeta?.rebostLegacyCredits || [];
    for (const c of entries) {
      if (
        typeof c.id === "string" &&
        /^img-[a-f0-9]{64}$/.test(c.id) &&
        typeof c.text === "string" &&
        c.text.length <= 6100
      )
        credits.set(c.id + "\n" + c.text, { id: c.id, text: c.text });
    }
  }
  return [...credits.values()].sort((a, b) =>
    a.text.localeCompare(b.text, locale),
  );
}
