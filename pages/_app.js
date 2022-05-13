import { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';

import { AuthContext } from '../state/authContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [user, setUser] = useState({ username: '', authenticated: false });

  const login = (username) => {
    setUser({
      username: username,
      authenticated: true,
    });
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CacheProvider>
    </AuthContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
