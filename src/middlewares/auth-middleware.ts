import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth-service';

const authService = new AuthService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request Headers:', req.headers);  // Логирование заголовков запроса

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Authorization header missing');  // Дополнительное логирование
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  const payload = authService.verifyJwt(token);

  if (!payload) {
    console.log('Invalid or expired token');  // Дополнительное логирование
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  (req as any).user = payload;
  next();
};

export default authMiddleware;
