import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import generateSlug from '../../../utils/slugify';

export default async function handler(req, res) {
  await dbConnect();
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findOne({ slug });
    return post
      ? res.status(200).json(post)
      : res.status(404).json({ error: 'Not found' });
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const newSlug = generateSlug(title);
    const post = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: newSlug },
      { new: true }
    );
    return post
      ? res.status(200).json(post)
      : res.status(404).json({ error: 'Not found' });
  }

  if (req.method === 'DELETE') {
    const post = await Post.findOneAndDelete({ slug });
    return post
      ? res.status(204).end()
      : res.status(404).json({ error: 'Not found' });
  }

  res.status(405).end();
}