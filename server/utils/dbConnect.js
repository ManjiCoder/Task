import mongoose from 'mongoose';
import config from './config.js';
const mongoURL = config.MONGO_URL;

const dbConnect = async () => {
  return await mongoose.connect(mongoURL);
};

export default dbConnect;
