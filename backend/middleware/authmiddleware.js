const authMiddleware = (req, res, next) => {
  // Check if the session exists and contains user data
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized: No active session' });
  }

  // Attach user details from session to the request object for downstream usage
  req.user = {
    id: req.session.userId,
    username: req.session.username,
    email: req.session.email,
  };

  next(); // Proceed to the next middleware or route handler
};

// Exporting using CommonJS
export default authMiddleware;

// For ES module usage, if needed:
// export default authMiddleware;
