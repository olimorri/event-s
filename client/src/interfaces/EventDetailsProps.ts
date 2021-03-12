import { User } from './User';
import { Event } from './Event';

export interface EventDetailsProps {
  events: Event[];
  signUpDown: Function;
  user: User;
}
