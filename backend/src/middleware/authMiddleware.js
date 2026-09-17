import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fcc_secret_key_default_2026'
      );

      if (mongoose.connection.readyState === 1) {
        req.admin = await Admin.findById(decoded.id).select('-password');
      }

      if (!req.admin) {
        // Fallback for verified default admin token
        req.admin = {
          _id: decoded.id,
          username: 'admin',
          email: 'admin@fahrenheitcc.com',
          role: 'admin',
        };
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed or expired',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no bearer token provided',
    });
  }
};
