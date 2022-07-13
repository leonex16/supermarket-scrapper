import type { AppProps } from 'next/app';
import { useState } from 'react';

import { StateContext } from '../src/contexts';

import '../styles/globals.scss';

function MyApp ( { Component, pageProps }: AppProps ) {
  const [ isFetchingData, setIsFetchingData ] = useState( false );

  return (
    <StateContext.Provider value={{ isFetchingData, setIsFetchingData }}>
      <Component {...pageProps} />;
    </StateContext.Provider>
  );
}

export default MyApp;
