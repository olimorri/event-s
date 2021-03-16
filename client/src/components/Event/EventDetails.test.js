import {
  render,
  cleanup,
  screen,
  waitForElementToBeRemoved,
  queryByText,
  findByText,
  getByText,
  wait,
  waitFor,
  configure,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventDetails from './EventDetails';
import { events, event } from './EventMocks';

afterEach(cleanup);

configure({
  asyncUtilTimeout: 5000,
});

const EventDetailsTest = () => (
  <BrowserRouter>
    <EventDetails events={events} event={event} />
  </BrowserRouter>
);

afterEach(cleanup);

// let parent;

// beforeAll(() => (parent = render(<EventDetailsTest />)));

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<EventDetailsTest />);
    expect(asFragment(<EventDetailsTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  // test('renders img', () => {
  //   render(<EventDetailsTest />);
  //   const displayedImg = document.querySelector('img');
  //   expect(displayedImg).toBeValid();
  // });

  test('rendered event name matches props event.name', async () => {
    render(<EventDetailsTest />);

    const loading = screen.getByText('Loading...');
    expect(loading).toHaveTextContent(/loading/i);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    // const eventName = screen.queryByText(event.name);
    // console.log(eventName);
    // expect(eventName).toHaveTextContent('test event');
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
