import db from '../utils/dbmySQL.js';
const isAdnin = async (req, res, next) => {
  try {
    // mysql to find user
    await db.query(`CREATE TABLE IF NOT EXISTS employees (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL NOT NULL,
      department VARCHAR(50) NOT NULL,
      doj VARCHAR(20) NOT NULL,
      address VARCHAR(300) NOT NULL,
      gender VARCHAR(19) NOT NULL,
      hobbies VARCHAR(500) DEFAULT '[]'
    );`);
    let [user] = await db.query(`SELECT * FROM users WHERE _id = ${req.id}`);
    user = user[0];
    // mongoDB to find user
    // const user = await UserModel.findById(req.id);
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
