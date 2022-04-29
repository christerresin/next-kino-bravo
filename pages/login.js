import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'cookies';
import Iron from '@hapi/iron';

import styles from '../styles/Login.module.scss';

export const getServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const sessionStr = cookies.get('session');

  if (sessionStr) {
    try {
      const session = await Iron.unseal(
        sessionStr,
        process.env.ENC_KEY,
        Iron.defaults
      );
      if (session.loggedin) {
        return {
          redirect: {
            permanent: false,
            destination: '/member',
          },
          props: {},
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  return {
    props: {
      notloggedin: true,
    },
  };
};

const LoginPage = ({ notloggedin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await postData();
    if (loggedIn == 200) {
      router.reload();
    }
  };

  const postData = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        login: true,
      }),
    });

    return response.status;
  };

  if (notloggedin) {
    return (
      <div className={styles.user}>
        <header className={styles.user__header}>
          <h2 className={styles.user__title}>Log in</h2>
        </header>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__group}>
            <input
              placeholder='Username'
              className={styles.form__input}
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.form__group}>
            <input
              placeholder='Password'
              className={styles.form__input}
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.btn} type='submit'>
            Sign In
          </button>
        </form>
        <div>
          Not a member?{' '}
          <Link href='/register'>
            <a>Register Here</a>
          </Link>
        </div>
      </div>
    );
  }
};

export default LoginPage;
