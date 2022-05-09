import { useState } from 'react';

import Layout from '../components/Layout';
import { AuthContext } from '../state/authContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}

export default MyApp;
