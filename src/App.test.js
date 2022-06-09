import { render, screen } from '@testing-library/react';
import App from './App';

test('its has Router Dom component', () => {
  render(<App />);
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
});
