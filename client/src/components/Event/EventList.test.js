import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { events } from '../Event/EventMocks';
import EventList from './EventList';

afterEach(cleanup);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <EventList events={events} />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  test('renders an event from the list', () => {
    render(
      <BrowserRouter>
        <EventList events={events} />
      </BrowserRouter>,
    );
    const event = screen.getByText(/test event 2/i);
    expect(event).toBeInTheDocument();
  });

  test('does not render a past event', () => {
    render(
      <BrowserRouter>
        <EventList events={events} />
      </BrowserRouter>,
    );
    const event = screen.queryByText(/test event 1/i);
    expect(event).not.toBeInTheDocument();
  });

  test('renders all present/future events', () => {
    render(
      <BrowserRouter>
        <EventList events={events} />
      </BrowserRouter>,
    );
    const allEvents = screen.queryAllByText(/test event/i);
    expect(allEvents).toHaveLength(7);
  });

  test('redirects to correct event details page on event click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <EventList events={events} />
      </Router>,
    );
    const myEvent = screen.getByText(/^Test Event 2$/i);
    expect(history.location).toHaveProperty('pathname', '/');
    expect(history.entries).toHaveLength(1);
    fireEvent.click(myEvent);
    expect(history.location).toHaveProperty(
      'pathname',
      '/events/604ce151b61ff67613b5b6d9',
    );
    expect(history.entries).toHaveLength(2);
    expect(history.entries[1]).toHaveProperty(
      'pathname',
      '/events/604ce151b61ff67613b5b6d9',
    );
  });
});
