import Cookies from 'cookies';
import Iron from '@hapi/iron';
import dbConnect from '../lib/dbConnect';
import Member from '../models/Member';

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
        dbConnect();
        const memberData = await Member.find(
          { username: session.username },
          {
            password: 0,
            lastname: 0,
            firstname: 0,
            _id: 0,
            username: 0,
            email: 0,
          }
        );

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
  Comp for Bookings? getServerSideProps to fetch bookings data from DB
*/
