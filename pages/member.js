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
          props: {
            username: session.username,
          },
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  return {
    notFound: true,
  };
};

const MemberPage = (props) => {
  return (
    <div>
      <h3>Welcome, {props.username}</h3>
    </div>
  );
};

export default MemberPage;

/*
  Comp for Bookings? getServerSideProps to fetch bookings data from bookings DB
*/
