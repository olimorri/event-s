import { render, cleanup, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventCard from './EventCard';

afterEach(cleanup);

const event = {
  attendees: 1,
  date: '2021-03-23T00:00:00.000Z',
  description: 'This is a test event',
  duration: 2,
  geolocation: '0.261773,51.116312',
  limit: 2,
  list: ['604a36891b95d669d99ebe2e'],
  location: 'tn25hs',
  name: 'test event',
  owner: '604b5c00ca29f24f751f492c',
  photo: 'https://source.unsplash.com/random/300x300',
  type: 'Food',
};

const EventCardTest = () => (
  <BrowserRouter>
    <EventCard event={event} />
  </BrowserRouter>
);

afterEach(cleanup);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<EventCardTest />);
    expect(asFragment(<EventCardTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  test('renders img', () => {
    render(<EventCardTest />);
    const displayedImg = document.querySelector('img');
    expect(displayedImg).toBeValid();
  });

  test('rendered event name matches props event.name', () => {
    render(<EventCardTest />);
    const eventName = screen.getByText(event.name);
    expect(eventName).toBeInTheDocument();
  });

  test('rendered event postcode matches props event.location', () => {
    render(<EventCardTest />);
    const eventPostcode = screen.getByText(event.location);
    expect(eventPostcode).toBeInTheDocument();
  });

  test('rendered event date matches props event.date', () => {
    render(<EventCardTest />);
    const eventDate = screen.getByText(/Mar 23rd 21/i);
    expect(eventDate).toBeInTheDocument();
  });
});
