// const router = require('express').Router();
import express from 'express';
import Events from './controllers/events';
import Users from './controllers/users';
import authMiddleware from './middlewares/auth';

const router = express.Router();

router.get('/events', Events.getEvents);
router.get('/events/:id', Events.getSingleEvent);
router.post('/events', authMiddleware, Events.postEvent);
router.delete('/events/:id', Events.deleteEvent);
router.put('/events/:id', Events.updateEvent);
router.post('/events/:id/up', authMiddleware, Events.attendEvent);
router.post('/events/:id/down', authMiddleware, Events.unattendEvent);

router.post('/register', Users.create);
router.post('/login', Users.login);
router.get('/me', authMiddleware, Users.profile);
router.post('/logout', authMiddleware, Users.logout);

//DEV
router.get('/users', Users.getUsers);
router.get('/users/:id', Users.getHostDetails);
router.delete('/users/:id', Users.deleteUser);

module.exports = router;
