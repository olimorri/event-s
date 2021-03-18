import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { events } from '../../components/Event/EventMocks';
import Events from './Events';

afterEach(cleanup);

jest.mock('mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Events events={events} />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
