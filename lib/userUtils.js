// lib/userUtils.js
import db from './db';

export function getSessionUserId(req) {
  // Extract userId from token in request headers
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'dummy-token') {
    return 1; // Example user ID
  }
  return null;
}

export function getUserHistory(userId) {
  // Fetch user search history from database
  return db.collection('userHistory').find({ userId }).toArray();
}

export function addSearchQuery(userId, query) {
  // Add search query to user's history
  return db.collection('userHistory').insertOne({ userId, query, date: new Date() });
}