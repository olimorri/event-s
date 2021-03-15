import User from '../models/users';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const uid: string | undefined = req.session.uid;
    const user = await User.findOne({ _id: uid });
    if (!user) throw new Error();
    req.body.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;
