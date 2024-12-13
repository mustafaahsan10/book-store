import useSWR from 'swr';
import Link from 'next/link';
import { useContext,useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';

import Layout from '../../components/Layout';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authors() {
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
  const { data: authors, error } = useSWR('/api/authors', fetcher);

  if (error) return <div>Failed to load authors</div>;
  if (!authors) return <div>Loading...</div>;

  return (
    <Layout>
      <div>
        <h1>Authors</h1>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <Link href={`/authors/${author.id}`}>
                {author.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}