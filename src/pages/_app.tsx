import '@/styles/globals.css'
import { Fragment } from 'react';

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';

import Window from '@/containers/Window';
import Navbar from '@/components/Navbar';


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main 
        style={{ background: "linear-gradient(to bottom right, black, indigo, black)" }}
        className='w-full min-h-screen flex flex-col justify-around items-center'>
        <Window>
          <Fragment>
            <Navbar />
            <Component {...pageProps} />
          </Fragment>
        </Window>
      </main>
    </SessionProvider>
  );

}
