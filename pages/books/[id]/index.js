import { getBookById } from '../../../lib/bookUtils';
import Layout from '../../../components/Layout';
import BookCard from '../../../components/BookCard';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../../context/AuthContext';
export default function BookDetails({ book }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  if (!book) {
    return (
      <Layout>
        <h1>Book Not Found</h1>
        <p>The book you are looking for does not exist.</p>
      </Layout>
    );
  }

  return (
    <Layout>

      <BookCard {...book} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const book = await getBookById(id);

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
}