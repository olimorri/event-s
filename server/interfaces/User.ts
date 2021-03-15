import { Document } from 'mongoose';
import { IEventList } from '../interfaces/EventList';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  host: boolean;
  photo?: string;
  about?: string;
  location?: string;
  eventList?: IEventList['_id'][];
}
