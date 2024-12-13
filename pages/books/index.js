import { useState,useContext,useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBooks, getGenres } from '../../lib/bookUtils';
import BookCard from '../../components/BookCard';
import Layout from '../../components/Layout';
import AuthContext from '../../context/AuthContext';

export default function Books({ books, genres }) {
  const router = useRouter();
  const { genre: initialGenre } = router.query;
  const [selectedGenre, setSelectedGenre] = useState(initialGenre || 'all');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }
  const filteredBooks =
    selectedGenre === 'all'
      ? books
      : books.filter((book) => book.genreId === selectedGenre);

  const handleGenreChange = (e) => {
    const newGenre = e.target.value;
    setSelectedGenre(newGenre);
    router.push(`/books?genre=${newGenre}`);
  };

  return (
    <Layout>
      <h1>Books</h1>
      <div>
        <label htmlFor="genre-select">Filter by genre: </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <BookCard {...book} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const books = await getBooks();
  const genres = await getGenres();
  return {
    props: {
      books,
      genres,
    },
  };
}