import type { AppProps } from 'next/app';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { NavigationBar } from '@/components/NavigationBar';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.main}>
      <NavigationBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
