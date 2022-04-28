import Cookies from 'cookies';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import Iron from '@hapi/iron';

import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      /* find all the data in our database */
      const members = await Member.find(
        {},
        { password: 0, lastname: 0, firstname: 0, _id: 0 }
      );

      res.status(200).json({ success: true, data: members });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  if (req.method === 'POST') {
    const saltRounds = 10;
    const isMember = await getMember(req.body.username);
    const newMember = req.body.register;

    if (isMember.length === 0 && newMember) {
      try {
        /* create a new model in the database */
        const member = await Member.create({
          userId: uuidv4(),
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, saltRounds),
          email: req.body.email,
        });
        res.status(201).json({ success: true, data: member });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: 'Something went wrong' });
      }
    }

    if (req.body.login === true && isMember.length > 0) {
      // if username is registered and entered password is correct, try to log the user in
      const logingIn = bcrypt.compareSync(
        req.body.password,
        isMember[0].password
      );

      if (logingIn) {
        try {
          const cookies = new Cookies(req, res);
          cookies.set(
            'session',
            await Iron.seal(
              {
                username: isMember[0].username,
                loggedin: true,
              },
              process.env.ENC_KEY,
              Iron.defaults
            )
          );
          res.status(200).json({ success: true, message: 'Login route' });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        res
          .status(400)
          .json({ success: false, message: 'Username unavailable' });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Wrong username or password' });
    }
  }
}

const getMember = async (username) => {
  const member = await Member.find({ username: username });
  return member;
};

/*
  Login route with POST?
    - create COOKIE
  Nested IF in CASE? Better practise
  getMember to return OBJ instead of Arr
*/
