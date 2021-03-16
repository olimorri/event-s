import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import EventDetails from '../Event/EventDetails';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

afterEach(cleanup);

const event1 = {
  attendees: 1,
  date: '2021-03-23T00:00:00.000Z',
  description: 'This is a test event',
  duration: 1,
  geolocation: '0.261773,51.116312',
  limit: 1,
  list: ['604a36891b95d669d99ebe2e'],
  location: 'tn25hs',
  name: 'test event 1',
  owner: '604b5c00ca29f24f751f492c',
  photo: 'https://source.unsplash.com/random/300x300',
  type: 'Food',
  _id: '604b5c00ca29f24f751f492c',
};

const event2 = {
  attendees: 2,
  date: '2021-03-24T00:00:00.000Z',
  description: 'This is also a test event',
  duration: 2,
  geolocation: '0.261773,51.116312',
  limit: 2,
  list: ['604a36891b95d669d99ebe2f'],
  location: 'tn25hd',
  name: 'test event 2',
  owner: '604b5c00ca29f24f751f492c',
  photo: 'https://source.unsplash.com/random/300x300',
  type: 'Other',
  _id: '604b5c00ca29f24f751f492c',
};

const user = {
  email: 'test@email.com',
  eventList: [event1, event2],
  firstName: 'Bob',
  lastName: 'Bobson',
  host: true,
  password: 'test',
  photo: 'https://unsplash.com/photos/mEBOHfzuPHk',
};

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  test('renders first name', () => {
    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    const firstName = screen.getByText(/bob/i);
    expect(firstName).toBeInTheDocument();
  });

  test('renders last name', () => {
    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    const lastName = screen.getByText(/bobson/i);
    expect(lastName).toBeInTheDocument();
  });

  test('renders user type', () => {
    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    const userType = screen.getByText(/host/i);
    expect(userType).toBeInTheDocument();
  });

  test('renders event list', () => {
    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    const event1 = screen.getByText(/^test event 1$/i);
    const event2 = screen.getByText(/^test event 2$/i);
    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });

  test('renders number of events in list', () => {
    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    const numberOfEvents = screen.getByText(/^2$/i);
    expect(numberOfEvents).toBeInTheDocument();
  });

  test('redirects to correct event details page on event click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Profile user={user} />
      </Router>,
    );
    const myEvent = screen.getByText(/^test event 1$/i);
    expect(history.location).toHaveProperty('pathname', '/');
    expect(history.entries).toHaveLength(1);
    fireEvent.click(myEvent);
    expect(history.location).toHaveProperty(
      'pathname',
      '/events/604b5c00ca29f24f751f492c',
    );
    expect(history.entries).toHaveLength(2);
    expect(history.entries[1]).toHaveProperty(
      'pathname',
      '/events/604b5c00ca29f24f751f492c',
    );
  });
});
