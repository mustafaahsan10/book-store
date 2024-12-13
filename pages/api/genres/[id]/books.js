// pages/api/genres/[id]/books.js
import { getBooksByGenre } from '../../../../lib/bookUtils';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const books = getBooksByGenre(id);
    res.status(200).json(books);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}