import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const postSignup = async (req, res) => {
  console.log("Signup request body:", req.body); // Debugging line
  const { fullName, username, email, password } = req.body;

  // Validate required fields
  if (!fullName || !username || !email || !password) {
    console.log("Missing required fields"); // Debugging line
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists"); // Debugging line
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully"); // Debugging line

    // Create new user
    const newUser = new User({ fullName, username, email, password: hashedPassword });
    await newUser.save();
    console.log("User created successfully"); // Debugging line

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error("Error during signup:", err); // Debugging line
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getSignup = async(req, res) => {
  res.status(200).json({ message: 'This is get from signup' });
};

// Login controller 
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account found. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error("Error during login:", err); // Debugging line
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
