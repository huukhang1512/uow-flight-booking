import type { AppProps } from 'next/app';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { NavigationBar } from '@/components/NavigationBar';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>FlyDream Airline</title>
        <meta
          name="description"
          content="FlyDreamAir is an affordable and trustworthy Airline"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <div className={styles.main}>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
