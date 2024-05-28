import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Component Tests', () => {
  // Render component inside MemoryRouter to handle any potential routing
  const setup = () => render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  it('displays the hero section with correct text', () => {
    setup();
    expect(screen.getByText("Догляд, якому Ви можете довіряти")).toBeInTheDocument();
  });

  it('displays the content section with correct information', () => {
    setup();
    expect(screen.getByText(/Наша клініка пропонує висококваліфіковані послуги/)).toBeInTheDocument();
  });

  it('displays the stats section with correct information', () => {
    setup();
    expect(screen.getByText("Понад 20,000 задоволених пацієнтів")).toBeInTheDocument();
    expect(screen.getByText("100+ висококваліфікованих лікарів")).toBeInTheDocument();
    expect(screen.getByText("50+ спеціалізованих відділень")).toBeInTheDocument();
  });
});
