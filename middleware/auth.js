import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({message: 'No token'});
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({message: 'No token'});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Invalid token'});
  }
};
