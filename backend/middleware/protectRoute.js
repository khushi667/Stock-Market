import jwt from 'jsonwebtoken';

const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer format

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default protectRoute;
