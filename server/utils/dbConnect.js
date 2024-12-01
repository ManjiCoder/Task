import mongoose from 'mongoose';
import config from './config.js';
const mongoURL = config.MONGO_URL;

const dbConnect = async () => {
  try {
    console.log('Connected to DB');
    return await mongoose.connect(mongoURL);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
