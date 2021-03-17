import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './SearchBar';

const SearchTest = () => (
  <BrowserRouter>
    <SearchBar />
  </BrowserRouter>
);

describe('Snapshot', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<SearchTest />);
    expect(asFragment(<SearchTest />)).toMatchSnapshot();
  });
});

describe('Unit Testing', () => {
  it('should render the input', () => {
    render(<SearchTest />);
    const SearchInput = screen.getByPlaceholderText(/Search for events/i);
    expect(SearchInput).toBeInTheDocument();
  });
});
