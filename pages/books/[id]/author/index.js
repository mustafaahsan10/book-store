import { getFeaturedBooks, getAuthor } from "../../../../lib/bookUtils";
import Layout from "../../../../components/Layout";
import Link from "next/link";

export default function AuthorDetails(props) {
  return (
    <Layout>
      <h1>{props.author.name}</h1>
      <p>{props.author.biography}</p>
      <Link href={`/books/${props.bookId}`}>Back to Book</Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const books = getFeaturedBooks();
  return { paths: books.map((book) => ({ params: { id: book.id } })), fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const author = getAuthor(id);
  
  return { props: { author, bookId: id } };
}