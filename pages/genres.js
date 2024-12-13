import { getGenres } from "../lib/bookUtils";
import Link from 'next/link';
import Layout from "../components/Layout";

export default function Genres({ genres }) {
    return (
        <Layout>
            <h1>Book Genres</h1>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>
                        <Link href={`/books?genre=${genre.id}`}>
                            {genre.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export async function getServerSideProps() {
    const genres = await getGenres();
    return {
        props: {
            genres,
        },
    };
}