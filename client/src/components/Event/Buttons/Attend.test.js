import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Attend from './Attend';

const AttendTest = () => (
  <BrowserRouter>
    <Attend />
  </BrowserRouter>
);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<AttendTest />);
    expect(asFragment(<AttendTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  it('should render the button', () => {
    render(<AttendTest />);
    const attendBtn = screen.getByRole('button', { name: /attend/i });
    expect(attendBtn).toBeInTheDocument();
  });
});
