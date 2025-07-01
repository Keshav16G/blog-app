import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import generateSlug from '../../../utils/slugify';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: 'Title and content required' });
    const slug = generateSlug(title);
    try {
      const post = await Post.create({ title, content, slug });
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  }

  res.status(405).end();
}