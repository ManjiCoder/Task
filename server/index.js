import cors from 'cors';
import express from 'express';
import authRoute from './routes/auth.js';
import employeeRoute from './routes/employee.js';
import config from './utils/config.js';
import dbConnect from './utils/dbConnect.js';

const port = config.PORT;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// connection to db
dbConnect();

// Available Routes
app.use('/auth', authRoute);
app.use('/employee', employeeRoute);

app.listen(port, () => {
  console.log(`Server listing on port htpp://localhost:${port}`);
});
