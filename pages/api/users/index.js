import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        /* find all the data in our database */
        const members = await Member.find({});
        res.status(200).json({ success: true, data: members });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case 'POST':
      const saltRounds = 10;
      const isMember = await getMember(req.body.username);

      if (isMember.length === 0) {
        try {
          /* create a new model in the database */
          const member = await Member.create({
            userId: uuidv4(),
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltRounds),
          });
          res.status(201).json({ success: true, data: member });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      }

      // if username is registered and entered password is correct, try to log the user in
      const logingIn = bcrypt.compareSync(
        req.body.password,
        isMember[0].password
      );

      if (logingIn) {
        res.status(200).json({ success: false, message: 'Login route' });
      } else {
        res
          .status(400)
          .json({ success: false, message: 'Username unavailable' });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

const getMember = async (username) => {
  const member = await Member.find({ username: username });
  return member;
};

/*
  Login route with POST?
    - find member
    - compare passwords
    - create COOKIE
  Nested IF in CASE? Better practice
  getMember to return OBJ instead of Arr
*/