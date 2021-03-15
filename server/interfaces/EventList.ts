import { Document } from 'mongoose';
import { IUser } from '../interfaces/User';

export interface IEventList extends Document {
  name: string;
  date?: Date;
  location: string;
  geolocation?: string;
  limit?: number;
  duration?: number;
  attendees?: number;
  photo?: string;
  type: string;
  description?: string;
  owner: string;
  list?: IUser['_id'][];
}
