import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await postData();
    if (loggedIn == 200) {
      console.log('LOGGED IN');
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
    </div>
  );
};

export default LoginPage;
