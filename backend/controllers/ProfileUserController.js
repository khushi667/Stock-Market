import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Fetch user profile (JWT-based)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update user profile (JWT-based)
export const updateProfile = async (req, res) => {
  const { name, bio, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Delete user account (JWT-based)
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account' });
  }
};

// Login Controller (Session-based)
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Store user details in session
    req.session.userId = user._id;
    req.session.username = user.name; // Updated to match "name" from signup
    req.session.email = user.email;

    res.status(200).json({
      message: 'Login successful',
      user: { username: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch Profile (Session-based)
export const getSessionProfile = (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({
    username: req.session.username,
    email: req.session.email,
  });
};

// Logout User (Session-based)
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
