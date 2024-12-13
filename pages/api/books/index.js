// pages/api/books/index.js
import { getBooks } from '../../../lib/bookUtils';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const books = getBooks();
    res.status(200).json(books);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}