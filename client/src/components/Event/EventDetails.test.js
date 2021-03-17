import {
  render,
  cleanup,
  screen,
  waitFor,
  configure,
} from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import EventDetails from './EventDetails';
import { events, event } from './EventMocks';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const route = `/events/604f8c49cdb45af7cd1ca267`;
history.push(route);
// render(
//   <BrowserRouter history={history}>
//     <EventDetails events={events} />
//   </BrowserRouter>,
// );

// const EventDetailsTest = () => (
//   <BrowserRouter history={history}>
//    <EventDetails events={events} />
//   </BrowserRouter>
// );

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

// let parent;

// beforeAll(() => (parent = render(<EventDetailsTest />)));

// describe('Snapshot', () => {
//   it('should take a snapshot', () => {
//     const { asFragment } = render(<EventDetails />);
//     expect(asFragment(<EventDetails />)).toMatchSnapshot();
//   });
// });

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

    // const loading = screen.getByText('Loading...');
    // expect(loading).toHaveTextContent(/loading/i);

    // await waitFor(() => {
    //   expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    // });
    const eventName = screen.queryByText('Test Event 7');
    console.log(eventName);
    expect(eventName).toHaveTextContent('Test Event 7');
  });

  // test('rendered event postcode matches props event.location', () => {
  //   render(<EventDetailsTest />);
  //   const eventPostcode = screen.getByText(event.location);
  //   expect(eventPostcode).toBeInTheDocument();
  // });

  // test('rendered event date matches props event.date', () => {
  //   render(<EventDetailsTest />);
  //   const eventDate = screen.getByText(/Mar 23rd 21/i);
  //   expect(eventDate).toBeInTheDocument();
  // });
});
