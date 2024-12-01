import UserModel from '../models/User.js';
const isAdnin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.id);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    if (user.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({
        message: 'Access denied',
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: 'Access denied',
    });
  }
};

export default isAdnin;
