// pages/api/auth/login.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Simple hardcoded authentication
    if (email === 'user@example.com' && password === 'password123') {
      // Generate a token (for demonstration purposes)
      const token = 'dummy-token';

      res.status(200).json({ token, userId: 1, email });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}