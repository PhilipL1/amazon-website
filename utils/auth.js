// user authenticaltion

import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secret,
    {
      expiresIn: '30d',
    }
  );
};

const secret = process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  //console.log('auth', authorization);
  // console.log('user', req.headers);
  if (authorization) {
    //Bearer tokenxx => only return the token
    //slice(start,end) -- copy array
    const token = authorization.slice(7, authorization.length); //only get the length of the token start and end
    console.log('token', token);
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode; // instaed of placing the token in the original loaction req.body.user.Instead, i placed the token in req.user. >> this is calle din order api index.js file
        console.log('decode', req.user);
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not supplied' });
  }
};

export { signToken, isAuth };
