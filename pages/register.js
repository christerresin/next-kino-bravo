import { useState } from 'react';
import Link from 'next/dist/client/link';

import styles from '../styles/register.module.scss';

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
    <div className={styles.user}>
      <header className={styles.user__header}>
        <h2 className={styles.user__title}>Register</h2>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            placeholder='Firstname'
            type='text'
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
        </div>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            placeholder='Lastname'
            type='text'
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </div>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            placeholder='Username'
            type='text'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            placeholder='Password'
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            placeholder='Email'
            type='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button className={styles.btn} type='submit'>
          Register
        </button>
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
