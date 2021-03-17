import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Unattend from './Unattend';

const UnattendTest = () => (
  <BrowserRouter>
    <Unattend />
  </BrowserRouter>
);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<UnattendTest />);
    expect(asFragment(<UnattendTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  it('should render the button', () => {
    render(<UnattendTest />);
    const attendBtn = screen.getByRole('button', { name: /unattend/i });
    expect(attendBtn).toBeInTheDocument();
  });
});
