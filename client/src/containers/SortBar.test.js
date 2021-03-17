import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SortBar from './SortBar';

const SortBarTest = () => (
  <BrowserRouter>
    <SortBar />
  </BrowserRouter>
);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<SortBarTest />);
    expect(asFragment(<SortBarTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  it('should render the filter button', () => {
    render(<SortBarTest />);
    const attendBtn = screen.getByRole('button', {
      name: /filter/i,
    });
    expect(attendBtn).toBeInTheDocument();
  });
});
