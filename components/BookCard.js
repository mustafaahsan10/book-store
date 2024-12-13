import Link from 'next/link';

export default function BookCard({ id, title, authorId, description, price, genreId, rating }) {
  return (
    <div className="book-card">
      <h2>{title}</h2>
      <p><strong>Author:</strong> {authorId}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Genre:</strong> {genreId}</p>
      <p><strong>Rating:</strong> {rating}</p>
      <Link legacyBehavior href={`/books/${id}`}>
        <a>View Details</a>
      </Link>
    </div>
  );
}