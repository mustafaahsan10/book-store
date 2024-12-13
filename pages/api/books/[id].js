// pages/api/books/[id].js
import { getBookById } from '../../../lib/bookUtils';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const book = getBookById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}