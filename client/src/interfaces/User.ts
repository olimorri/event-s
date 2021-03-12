import { Event } from './Event';

export interface User {
  email: string;
  eventList: Event[];
  firstName: string;
  lastName: string;
  host: boolean;
  password: string;
  photo: string;
  __v?: number;
  _id?: string;
}
