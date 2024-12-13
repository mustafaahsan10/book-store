import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Layout from '../../components/Layout';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AuthorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: author, error } = useSWR(id ? `/api/authors/${id}` : null, fetcher);

  if (error) return <div>Failed to load author</div>;
  if (!author) return <div>Loading...</div>;

  return (
    <Layout>
      <div>
        <h1>{author.name}</h1>
        <p>{author.biography}</p>
        <Link href="/authors">Back to Authors</Link>
      </div>
    </Layout>
  );
}