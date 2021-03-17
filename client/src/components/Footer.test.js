import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

const FooterTest = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<FooterTest />);
    expect(asFragment(<FooterTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  it('should render the footer text', () => {
    render(<FooterTest />);
    const footerText = screen.getByText(/andras/i);
    expect(footerText).toBeInTheDocument();
  });
});
