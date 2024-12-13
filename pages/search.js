import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';

export default function Search({ initialSearchResults, initialQuery }) {
    const router = useRouter();
    const { q } = router.query;
    const [searchResults, setSearchResults] = useState(initialSearchResults);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        if (q && !history.includes(q)) {
            const updatedHistory = [q, ...history.slice(0, 4)];
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            setRecentSearches(updatedHistory);
        } else {
            setRecentSearches(history);
        }

        if (q !== initialQuery) {
            const filteredBooks = searchResults.filter(book =>
              book.title.toLowerCase().includes(q.toLowerCase())
            );
            setSearchResults(filteredBooks);
        }
    }, [q, initialQuery]);

    const handleRecentSearch = (search) => {
        router.push(`/search?q=${encodeURIComponent(search)}`);
    };

    return (
        <Layout>
            <h1>Search Results for {q || initialQuery}</h1>
            {recentSearches.length > 0 && (
                <div>
                    <h2>Recent Searches</h2>
                    <ul>
                        {recentSearches.map((search, index) => (
                            <li key={index}>
                                <button onClick={() => handleRecentSearch(search)}>{search}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map(book => (
                        <li key={book.id}>
                            <BookCard {...book} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found for {q || initialQuery}. Please try a different search term.</p>
            )}
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { q } = context.query;
    const { getBooks } = require('../lib/bookUtils');
    const allBooks =await getBooks();
  
    const filteredBooks = q
      ? allBooks.filter(book =>
          book.title.toLowerCase().includes(q.toLowerCase())
        )
      : [];
  
    return {
      props: {
        initialSearchResults: filteredBooks,
        initialQuery: q || '',
      },
    };
  }