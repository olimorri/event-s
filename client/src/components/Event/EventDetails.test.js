import { render, cleanup, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import EventDetails from './EventDetails';
import { events, event } from './EventMocks';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const route = `/events/604f8c49cdb45af7cd1ca267`;
history.push(route);

const user = {
  email: 'test@email.com',
  eventList: events,
  firstName: 'Bob',
  lastName: 'Bobson',
  host: true,
  password: 'test',
  photo: 'https://unsplash.com/photos/mEBOHfzuPHk',
};

afterEach(cleanup);

describe('Unit Testing', () => {
  test('rendered event name matches props name', () => {
    render(
      <Router history={history}>
        <Route
          path="/events/:id"
          render={() => <EventDetails user={user} events={events} />}
        />
      </Router>,
    );

    const eventName = screen.queryByText('Test Event 7');
    expect(eventName).toHaveTextContent('Test Event 7');
  });
});
