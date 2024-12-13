// pages/api/user/history.js
import { getSessionUserId, getUserHistory, addSearchQuery } from '../../../lib/userUtils';

export default function handler(req, res) {
  const userId = getSessionUserId(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const history = getUserHistory(userId);
    res.status(200).json(history);
  } else if (req.method === 'POST') {
    const { query } = req.body;
    addSearchQuery(userId, query);
    res.status(201).json({ message: 'Search query added' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}