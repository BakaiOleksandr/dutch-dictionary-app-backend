import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(400).json({message: 'Wrong password'});
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  console.log(user.email, 'was logged in');
  res.json({token});
});

export default router;
