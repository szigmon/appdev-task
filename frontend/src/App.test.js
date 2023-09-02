import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Event Planner header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Event Planner/i);
  expect(linkElement).toBeInTheDocument();
});
