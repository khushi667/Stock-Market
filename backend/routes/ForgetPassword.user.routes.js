import express from 'express';
import User from '../models/User.js'; 
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const router = express.Router();

// Forgot Password Endpoint
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Configure your email transport
    const transporter = nodemailer.createTransport({
      // Transport configuration
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    });

    res.send({ success: true, message: 'Reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error sending email' });
  }
});

// Reset Password Endpoint
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token has expired
    });

    if (!user) {
      return res.status(400).send({ success: false, message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; // Save the hashed password
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiration
    await user.save();

    res.send({ success: true, message: 'Password has been updated' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error resetting password' });
  }
});

export default router;
