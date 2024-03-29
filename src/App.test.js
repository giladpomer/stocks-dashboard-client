import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main title', () => {
    render(<App />);
    const titleElement = screen.getByText(/stocks dashboard/i);
    expect(titleElement).toBeInTheDocument();
});
