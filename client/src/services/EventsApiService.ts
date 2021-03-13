import { Event } from '../interfaces/Event';
import { User } from '../interfaces/User';

/* eslint-disable import/no-anonymous-default-export */
const URL = 'http://localhost:4000';

function getEvents(): Promise<Event[]> {
  return fetchRequest('/events');
}
function getSingleEvent(id: string): Promise<Event> {
  return fetchRequest('/events/' + id);
}
function createEvent(body: Event): Promise<Event> {
  return fetchRequest('/events', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function signUp(id: string): Promise<User> {
  return fetch(`${URL}/events/${id}/up`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
function signDown(id: string): Promise<User> {
  return fetch(`${URL}/events/${id}/down`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function fetchRequest(path: string, options?: RequestInit | undefined) {
  return fetch(URL + path, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((response) => (response.status === 204 ? response : response.json()))
    .catch((err) => {
      console.log(`Error fetching ${path}: `, err);
    });
}

export default { getEvents, getSingleEvent, createEvent, signUp, signDown };
