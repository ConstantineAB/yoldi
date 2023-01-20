import Header from '@/components/Header';
import styles from '@/styles/pages/Home.module.scss';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => (
  <div className={`${styles.wrapper} ${inter.className}`}>
    <Header />
    <Component {...pageProps} />
  </div>
);

export default App;
