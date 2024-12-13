import { getFeaturedBooks } from '../lib/bookUtils';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Home({ books }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleViewGenres = () => {
    router.push('/genres');
  };

  return (
    <Layout>
      <h1>Featured Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <BookCard {...book} />
          </li>
        ))}
      </ul>
      <button onClick={handleViewGenres}>View Genres</button>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const books = await getFeaturedBooks();

    if (!books || books.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        books,
      },
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      notFound: true,
    };
  }
}