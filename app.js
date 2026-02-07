import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import meRoute from './routes/me.js';
import loginRoute from './routes/login.js';
import registerRoute from './routes/registration.js';
import forgotPasswordRoute from './routes/forgotPassword.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', meRoute);
app.use('/auth', forgotPasswordRoute);

// routes
app.use('/auth', loginRoute);
app.use('/auth', registerRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
