/* Public samples use the workshop's reader, without importing into IndexedDB. */
export const exampleSlugs = ['la-papallona', 'la-granota'];
export async function loadExample(slug) {
  if (!exampleSlugs.includes(slug)) throw new Error('invalid');
  const response = await fetch('/examples/'+slug+'/slides.json', {credentials:'omit', redirect:'error'});
  if (!response.ok) throw new Error('invalid');
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength > 8 * 1024 * 1024) throw new Error('invalid');
  const value = JSON.parse(new TextDecoder().decode(bytes));
  if (value.format !== 'llibres-example' || value.version !== 1 ||
      typeof value.title !== 'string' || value.title.length > 200 ||
      !Array.isArray(value.slides) || !value.slides.length || value.slides.length > 51 ||
      value.slides.some(p=>typeof p.title !== 'string' || typeof p.svg !== 'string' || p.svg.length > 5 * 1024 * 1024))
    throw new Error('invalid');
  return value;
}
