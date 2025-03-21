import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Efímera title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Efímera/i);
  expect(titleElement).toBeInTheDocument();
});