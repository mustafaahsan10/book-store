import { useState,useContext,useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Layout.module.css';   
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';

export default function Layout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
  
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };
  
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
          router.push(`/search?q=${searchTerm.trim()}`);
        }
    };
  
    return (
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/genres">Genres</Link>
          <Link href="/books">All Books</Link>
          <Link href="/authors">Authors</Link>
          <Link href="/info">Info</Link>
          {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
            />
            <button type="submit">Search</button>
          </form>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
        <main className={styles.main}>{children}</main>
      </div>
    );
  }