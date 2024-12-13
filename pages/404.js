import Link from 'next/link';
import styles from '../styles/404.module.css';
import Layout from '../components/Layout';
export default function Custom404() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
        <p className={styles.submessage}>It might have been moved or deleted.</p>
        <Link href="/" className={styles.link}>
          Return to Home Page
        </Link>
      </div>
    </Layout>
  );
}