// pages/api/genres/index.js
import { getGenres } from '../../../lib/bookUtils';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const genres = getGenres();
    res.status(200).json(genres);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}