import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', async (req, res) => {
  try {
    const {email, password} = req.body;

    // validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({message: 'Invalid email'});
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
      });
    }

    const candidate = await User.findOne({email});
    if (candidate) {
      return res.status(400).json({message: 'User already exists'});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({email, passwordHash});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({token});
    console.log(user.email, 'was registered');
  } catch (err) {
    res.status(500).json({message: 'Registration failed'});
  }
});

export default router;
