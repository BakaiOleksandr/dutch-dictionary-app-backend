import {Router} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = Router();

// Проверка email и сброс пароля
router.post('/forgot', async (req, res) => {
  const {email, newPassword} = req.body;

  const user = await User.findOne({email});
  if (!user) return res.status(404).json({message: 'User not found'});

  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({message: 'Password must be at least 6 characters'});
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordHash = passwordHash;
  await user.save();

  res.json({message: 'Password updated successfully'});
});

export default router;
