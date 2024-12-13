import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function InfoPage() {
  const router = useRouter();
  const { slug } = router.query;

  let content=(
        <>
          <h1>{slug}</h1>
        </>
      );
  // if (!slug || slug.length === 0) {
  //   content = <h1>General Information</h1>;
  // } else if (slug[0] === 'faqs') {
  //   content = (
  //     <>
  //       <h1>Frequently Asked Questions</h1>
  //     </>
  //   );
  // } else if (slug[0] === 'support') {
  //   content = (
  //     <>
  //       <h1>Support</h1>
  //     </>
  //   );
  // } else {
  //   content = <h1>404 - Page Not Found</h1>;
  // }

  return (
    <Layout>
      {content}
      <Link href="/info">Back to Information</Link>
    </Layout>
  );
}