import { Schema, model } from 'mongoose';
import { IEventList } from '../interfaces/EventList';

const eventSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  geolocation: {
    type: String,
  },
  limit: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 1,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
  },
  list: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
});

// export default model<IEventList>('Events', eventSchema);

const Event = model<IEventList>('Events', eventSchema);

export default Event;
