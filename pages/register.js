import { useState } from 'react';
import Link from 'next/dist/client/link';

const RegisterPage = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  // const [email, setEmail] = useState('');

  const initialState = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
  };

  const [user, setUser] = useState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
    setUser({ ...initialState });
  };

  const postData = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        register: true,
      }),
    });

    return response;
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type='text'
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
        </label>
        <label>
          Lastname
          <input
            type='text'
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </label>
        <label>
          Username
          <input
            type='text'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        <input type='submit' />
      </form>
      <div>
        Already a member?{' '}
        <Link href='/login'>
          <a>Login here!</a>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
