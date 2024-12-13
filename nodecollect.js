const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'bookstoredb';

async function fetchCollection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const booksCollection = await db.collection('books').find().toArray();

    if (booksCollection.length > 0) {
      const { books, genres, authors, reviews, users } = booksCollection[0];

      console.log('Books Collection:', books);
      console.log('Genres Collection:', genres);
      console.log('Authors Collection:', authors);
      console.log('Reviews Collection:', reviews);
      console.log('Users Collection:', users);
    } else {
      console.log('No data found in books collection');
    }
  } catch (error) {
    console.error('Error fetching collection:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

fetchCollection();