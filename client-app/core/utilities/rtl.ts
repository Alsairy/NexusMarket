const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

export function isRtlLanguage(locale: string): boolean {
  return RTL_LANGUAGES.includes(locale.split("-")[0]);
}
