import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Register from './Register';

afterEach(cleanup);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<Register />);

    expect(asFragment(<Register />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  test('renders Register component', () => {
    render(<Register />);
    const registerTitle = screen.getByText(/create new account/i);
    expect(registerTitle).toBeInTheDocument();
  });

  test('renders first name input', () => {
    render(<Register />);
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    expect(firstNameInput).toBeInTheDocument();
  });

  test('renders last name input', () => {
    render(<Register />);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    expect(lastNameInput).toBeInTheDocument();
  });

  test('renders email input component', () => {
    render(<Register />);
    const emailInput = screen.getByPlaceholderText(/name@email.com/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('renders password input component', () => {
    render(<Register />);
    const passwordInput = screen.getByPlaceholderText(/Choose a password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders photo input component', () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText(/Photo/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders type of user input component', () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText(/Hosting or Attending?/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders user input options', () => {
    render(<Register />);
    const guestOption = screen.getByRole('option', { name: /^Guest$/i });
    const hostOption = screen.getByRole('option', { name: /^Host$/i });
    expect(guestOption && hostOption).toBeInTheDocument();
  });

  test('renders sign up button component', () => {
    render(<Register />);
    const signUp = screen.getByRole('button', { name: /sign up/i });
    expect(signUp).toBeInTheDocument();
  });
});

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles
