/** Splits a slide-deck body into individual slide markdown chunks, separated by a `---` line. */
export function splitSlides(body: string): string[] {
  return body
    .split(/\n-{3}\n/g)
    .map((slide) => slide.trim())
    .filter(Boolean);
}
