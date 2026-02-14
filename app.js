import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import meRoute from './routes/me.js';
import loginRoute from './routes/login.js';
import registerRoute from './routes/registration.js';
import forgotPasswordRoute from './routes/forgotPassword.js';
import folderRoutes from './routes/folders.js';
import wordRoutes from './routes/words.js';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', meRoute);
app.use('/auth', forgotPasswordRoute);
app.use('/folders', folderRoutes);
app.use('/words', wordRoutes);

// routes
app.use('/auth', loginRoute);
app.use('/auth', registerRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
