import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import config from '../utils/config.js';
import db from '../utils/dbmySQL.js';
const router = Router();

// Route:1 Sign-up route
router.post('/sign-up', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing Data' });
  }
  try {
    const { name, email, password, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    // mysqlDB
    let [isUser] = await db.query(
      `SELECT email FROM users WHERE email = '${email}';`
    );
    isUser = isUser[0]
    console.log(isUser)

    // mongoDB
    // const isUser = await UserModel.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // MongoDB Query to create user
    // const newUser = await UserModel.create({
    //   name,
    //   email,
    //   password: hashPass,
    //   role,
    // });

    // mysqlDB Query to create user
    let newUser = await db.query(
      `INSERT INTO users (name, email, password) VALUE('${name}','${email}','${password}');`
    );
    [newUser] = await db.query(
      'SELECT * FROM users WHERE _id = last_insert_id()'
    );
    newUser = newUser[0]
    const payload = {
      id: newUser._id,
    };
    const authToken = jwt.sign(payload, config.JWT_PRIVATE_KEY);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      authToken,
    });
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});

// Route:2 Login route
router.post('/login', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing Data' });
  }
  try {
    const { email, password } = req.body;

    // MongoDB Query to create find user email
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "User doesn't exists, signup" });
    }

    // verifying password
    const comparePass = bcrypt.compareSync(password, isUser.password);
    if (!comparePass) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const payload = {
      id: isUser._id,
    };
    const authToken = jwt.sign(payload, config.JWT_PRIVATE_KEY);

    res.status(200).json({
      message: 'User login successfully',
      user: isUser,
      authToken,
    });
  } catch (error) {
    const { message } = error;
    res
      .status(message ? 400 : 500)
      .json({ message: message || 'Internal Server Error' });
  }
});

const authRoute = router;
export default authRoute;
