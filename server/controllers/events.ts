import Event from '../models/events';
import User from '../models/users';
import axios from 'axios';
import { Request, Response } from 'express';
import { IEventList } from '../interfaces/EventList';
import { Schema, ObjectId, Types } from 'mongoose';

const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const selectedEvents: IEventList[] = await Event.find();
    res.status(200);
    res.send(selectedEvents);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};
const getSingleEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const selectedEvent: IEventList[] = await Event.find({ _id: id });
    res.status(200);
    res.send(selectedEvent);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
};

const postEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id }: { _id: string } = req.body.user;

    const { location }: { location: string } = req.body;
    const getGeoLocation = await axios.get(
      `http://api.postcodes.io/postcodes/${location}`,
    );
    const geolocation = `${getGeoLocation.data.result.longitude},${getGeoLocation.data.result.latitude}`;
    const newEvent: IEventList = { ...req.body, geolocation, owner: _id };

    const createdEvent: IEventList = await Event.create(newEvent);
    await User.findByIdAndUpdate(
      //deleted const addToUser
      _id,
      { $push: { eventList: createdEvent._id } },
      { new: true },
    );
    res.status(201);
    res.send(createdEvent);
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send(err);
  }
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const selectedEvent: IEventList | null = await Event.findOne({ _id: id });
    if (selectedEvent && selectedEvent.list) {
      await Promise.all(
        selectedEvent.list.map(async (el: IEventList, i: number) => {
          if (selectedEvent.list) {
            await User.findByIdAndUpdate(
              selectedEvent.list[i],
              { $pull: { eventList: selectedEvent._id } },
              { new: true },
            );
          }
        }),
      );
      await User.findByIdAndUpdate(
        selectedEvent.owner,
        { $pull: { eventList: selectedEvent._id } },
        { new: true },
      );
    }
    await Event.deleteOne({ _id: id });
    res.status(204);
    res.send({ msg: `Deleted event ${id}` });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const selectedEvent: IEventList | null = await Event.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );
    res.send(selectedEvent);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const attendEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const _id: string = req.body.user._id;
    const addToEvent = await Event.findByIdAndUpdate(
      id,
      { $push: { list: _id }, $inc: { attendees: 1 } },
      { new: true },
    );
    await User.findByIdAndUpdate(
      _id,
      { $push: { eventList: id } },
      { new: true },
    );
    res.status(201);
    res.send(addToEvent);
  } catch (err) {
    res.status(404);
    res.send({ err, message: 'Could not assign user to event' });
  }
};
const unattendEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.body.user._id;
    const id: string = req.params.id;

    const deleteFromEvent: IEventList | null = await Event.findByIdAndUpdate(
      id,
      { $pull: { list: Types.ObjectId(_id) }, $inc: { attendees: -1 } },
      { new: true },
    );
    await User.findByIdAndUpdate(
      _id,
      { $pull: { eventList: Types.ObjectId(id) } },
      { new: true },
    );
    res.status(201);
    res.send(deleteFromEvent);
  } catch (err) {
    res.status(404).send({ err, message: 'Could not assign user to event' });
  }
};

export default {
  getEvents,
  getSingleEvent,
  postEvent,
  deleteEvent,
  updateEvent,
  attendEvent,
  unattendEvent,
};
