export const supportedLanguages = ["es", "ca", "va", "en"];
export function preferredLocale(savedOnly = false) {
  const shared = savedOnly ? window.commonsLanguage?.stored() : window.commonsLanguage?.read();
  if (supportedLanguages.includes(shared)) return shared;
  try {
    const stored = localStorage.getItem("llibres-language");
    if (supportedLanguages.includes(stored)) return stored;
  } catch {}
  for (const language of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    const tag = String(language || "").toLowerCase().replaceAll("_", "-");
    if (tag === "va" || (tag.startsWith("ca-") && tag.split("-").includes("valencia"))) return "va";
    const base = tag.split("-")[0];
    if (supportedLanguages.includes(base)) return base;
  }
  return "es";
}

