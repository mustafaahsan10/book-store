// import fs from "fs";
// import path from "path";

// export function getFeaturedBooks() {
//   const filePath = path.join(process.cwd(),"public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.books;
// }
// export function getBookById(id) {
//   const filePath = path.join(process.cwd(),"public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.books.find((book) => book.id === id);
// }
// export function getAuthorName(id) {
//   const filePath = path.join(process.cwd(),"public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.authors.find((author) => author.id === id).name;
// }
// export function getAuthor(id) {
//   const filePath = path.join(process.cwd(),"public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.authors.find((author) => author.id === id);
// }
// export function getGenres() {
//   const filePath = path.join(process.cwd(), "public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.genres;
//   }
// export function getAuthors() {
//   const filePath = path.join(process.cwd(), "public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.authors;
// }
// export function getBooks() {
//   const filePath = path.join(process.cwd(), "public", "data", "books.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const data = JSON.parse(fileData);
//   return data.books;
//   }

// lib/bookUtils.js
import dbPromise from './db';

export async function getBooks() {
  const db = await dbPromise;
  const booksCollection = await db.collection('books').find().toArray();

  if (booksCollection.length > 0) {
    const books = booksCollection[0].books;
    return books;
  } else {
    return [];
  }
}

export async function getBookById(id) {
  const books = await getBooks();
  const book = books.find((book) => book.id === id);
  return book || null;
}

export async function getGenres() {
  const db = await dbPromise;
  const booksCollection = await db.collection('books').find().toArray();

  if (booksCollection.length > 0) {
    const genres = booksCollection[0].genres;
    return genres;
  } else {
    return [];
  }
}

export async function getAuthors() {
  const db = await dbPromise;
  const booksCollection = await db.collection('books').find().toArray();

  if (booksCollection.length > 0) {
    const authors = booksCollection[0].authors;
    return authors;
  } else {
    return [];
  }
}

export async function getAuthorById(id) {
  const authors = await getAuthors();
  const author = authors.find((author) => author.id === id);
  return author || null;
}

export async function getBooksByGenre(genreId) {
  const books = await getBooks();
  return books.filter((book) => book.genreId === genreId);
}

export async function getFeaturedBooks() {
  const books = await getBooks();
  return books.filter((book) => book.rating >= 4.5);
}