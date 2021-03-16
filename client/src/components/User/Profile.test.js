import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Profile from './Profile';
import { user } from './UserMocks';

afterEach(cleanup);

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
    const event1 = screen.getByText(/^Test Event 1$/i);
    const event2 = screen.getByText(/^Test Event 2$/i);
    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });

  test('renders number of events in list', () => {
    render(
      <BrowserRouter>
        <Profile user={user} />
      </BrowserRouter>,
    );
    const numberOfEvents = screen.getByText(/^8$/i);
    expect(numberOfEvents).toBeInTheDocument();
  });

  test('redirects to correct event details page on event click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Profile user={user} />
      </Router>,
    );
    const myEvent = screen.getByText(/^Test Event 1$/i);
    expect(history.location).toHaveProperty('pathname', '/');
    expect(history.entries).toHaveLength(1);
    fireEvent.click(myEvent);
    expect(history.location).toHaveProperty(
      'pathname',
      '/events/604a268300da7a8522af8b23',
    );
    expect(history.entries).toHaveLength(2);
    expect(history.entries[1]).toHaveProperty(
      'pathname',
      '/events/604a268300da7a8522af8b23',
    );
  });
});
