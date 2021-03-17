import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { events } from '../../components/Event/EventMocks';
import Events from './Events';

afterEach(cleanup);

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
