import './globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // Component は現在のページコンポーネント、pageProps はそのページに渡されるプロパティ
  return <Component {...pageProps} />;
}

export default MyApp;

