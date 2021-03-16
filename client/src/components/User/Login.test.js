import { render, screen, cleanup } from '@testing-library/react';
import Login from './Login';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createMemoryHistory();

const LoginTest = () => (
  <Router history={history}>
    <Login />
  </Router>
);

afterEach(cleanup);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<LoginTest />);

    expect(asFragment(<LoginTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  test('renders Sign in component', () => {
    render(<LoginTest />);
    const registerTitle = screen.getByText(/Sign in to your account/i);
    expect(registerTitle).toBeInTheDocument();
  });

  test('renders email address input', () => {
    render(<LoginTest />);
    const emailInput = screen.getByLabelText(/Email address/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('renders password input', () => {
    render(<LoginTest />);
    const emailInput = screen.getByLabelText(/Password/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('renders sign in button', () => {
    render(<LoginTest />);
    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    expect(signInBtn).toBeInTheDocument();
  });
});
