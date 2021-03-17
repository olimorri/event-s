import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './Navbar';

const NavBarTest = () => (
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>
);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<NavBarTest />);
    expect(asFragment(<NavBarTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  it('should render the home button', () => {
    render(<NavBarTest />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('should render the events button', () => {
    render(<NavBarTest />);
    const homeButton = screen.getByRole('button', { name: /events/i });
    expect(homeButton).toBeInTheDocument();
  });
});
