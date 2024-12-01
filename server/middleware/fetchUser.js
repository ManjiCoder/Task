import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
const fetchUser = (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token, config.JWT_PRIVATE_KEY);
    req.id = verifyToken.id;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: 'Please autheticate using valid token',
    });
  }
};

export default fetchUser;
