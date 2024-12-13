// pages/api/authors/index.js
import { getAuthors } from '../../../lib/bookUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const authors = await getAuthors();
    res.status(200).json(authors);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}