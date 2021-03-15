import bcrypt from 'bcrypt';
import User from '../models/users';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';

declare module 'express-session' {
  export interface SessionData {
    uid: string;
  }
}

const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: IUser[] = await User.find({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      ...req.body,
      password: hash,
    });
    const user: IUser = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email: email });
    //used default here
    if (user) {
      const validatedPass = await bcrypt.compare(password, user.password);
      if (!validatedPass) throw new Error();
      req.session.uid = user._id;
      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const profile = async (req: any, res: Response) => {
  try {
    const populatedUser: IUser | null = await User.findOne({
      _id: req.body.user._id,
    }).populate(
      //used DEFAULT HERE
      'eventList',
    );
    if (populatedUser) {
      const {
        _id,
        firstName,
        lastName,
        host,
        photo,
        about,
        location,
        eventList,
      } = populatedUser;
      const user = {
        _id,
        firstName,
        lastName,
        host,
        photo,
        about,
        location,
        eventList,
      };
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};

const getHostDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const populatedUser: IUser | null = await User.findOne({
      _id: id,
    }).populate('eventList');
    if (populatedUser) {
      const {
        _id,
        firstName,
        lastName,
        host,
        photo,
        about,
        location,
        eventList,
      } = populatedUser;
      const user = {
        _id,
        firstName,
        lastName,
        host,
        photo,
        about,
        location,
        eventList,
      };
      res.status(200);
      res.send(user);
    }
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

// Dev only
const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200);
    res.send(users);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(204);
    res.send({ msg: `Deleted user ${id}` });
  } catch (err) {
    console.error('DELETE USER: ', err);
    res.status(500);
    res.send(err);
  }
};

export default {
  create,
  login,
  profile,
  logout,
  getUsers,
  deleteUser,
  getHostDetails,
};
