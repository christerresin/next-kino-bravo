import dbConnect from '../../lib/dbConnect';
import Member from '../../models/Member';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const members = await Member.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: members });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      const saltRounds = 10;

      // check password
      // let isCorrect = bcrypt.compareSync(req.body.password, hashedPassword);

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
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
