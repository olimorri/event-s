import { User } from '../interfaces/User';
import { UserRequestError } from '../interfaces/UserRequestError';

const BASE_URL = 'http://localhost:4000';
/* eslint-disable import/no-anonymous-default-export */
const register = (user: {}): Promise<User | UserRequestError> => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const login = (user: {}): Promise<User | UserRequestError> => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const profile = (): Promise<User> => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const logout = (): Promise<void> => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const getHostDetails = (id: string): Promise<User> => {
  return fetch(`${BASE_URL}/users/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default { register, login, profile, logout, getHostDetails };
