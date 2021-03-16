import { render, screen } from '@testing-library/react';
import Login from './Login';

// afterEach(cleanup);

// describe('Snapshot', () => {
// });

// it('should take a snapshot', () => {
//   const { asFragment } = render(<Login />);

//   expect(asFragment(<Login />)).toMatchSnapshot();
// });

test('renders Register component', () => {
  render(<Login />);
  const registerTitle = screen.getByText(/Sign in to your account/i);
  expect(registerTitle).toBeInTheDocument();
});
