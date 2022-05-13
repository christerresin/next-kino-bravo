import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../state/authContext';
import styles from '../styles/Nav.module.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className={styles.Nav}>
      <div className='login'>
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </div>
      <div className={styles.NavLogo}>
        <h1>Kino On Mars</h1>
      </div>
      <div className='links'>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Link href='/movies'>
          <a>Movies</a>
        </Link>
        <a>Tickets</a>
        <Link href='/AboutUs'>
          <a>About</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
