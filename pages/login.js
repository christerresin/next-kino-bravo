import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Cookies from 'cookies';
import Iron from '@hapi/iron';

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
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input type='submit' />
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
