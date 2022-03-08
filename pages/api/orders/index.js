import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError,
});

handler.use(isAuth); //only auth users can have access to this api

handler.post(async (req, res) => {
  await db.connect();
  // console.log('req.body', ...req.body);
  // console.log('req.user', ...req.user);
  const newOrder = await new Order({
    ...req.body,
    user: req.user._id, // called the token which is stored in req.user from utls/auth.js after decoding it (decode)
  });
  const order = await newOrder.save();
  // console.log('neworderok', order);
  res.status(201).send(order);
});
//.satus(201)
export default handler;
