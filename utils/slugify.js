import slugify from 'slugify';
export default function generateSlug(text) {
  return slugify(text, { lower: true, strict: true });
}