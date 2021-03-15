import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  host: {
    type: Boolean,
    required: true,
  },
  photo: {
    type: String,
  },
  about: {
    type: String,
  },
  location: {
    type: String,
  },
  eventList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Events',
    },
  ],
});

const User = model<IUser>('User', userSchema);

module.exports = User;

// export default model<IUser>('User', userSchema);
