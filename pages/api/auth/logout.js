// pages/api/auth/logout.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Logic to end the user's session
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}