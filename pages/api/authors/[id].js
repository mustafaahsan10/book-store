// pages/api/authors/[id].js
import { getAuthorById } from '../../../lib/bookUtils';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const author = getAuthorById(id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}