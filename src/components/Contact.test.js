import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Contact from './Contact';
import { MemoryRouter } from 'react-router-dom';

describe('Contact Component Tests', () => {
  // Render component inside MemoryRouter to handle any potential routing
  const setup = () => render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  it('renders without crashing', () => {
    setup();
    expect(screen.getByText("Зв'яжіться з нами")).toBeInTheDocument();
  });

  it('renders the map image with correct attributes', () => {
    setup();
    const mapImage = screen.getByAltText("Office Location");
    expect(mapImage).toBeInTheDocument();
    expect(mapImage).toHaveAttribute('src');
    expect(mapImage.src).toContain('map.png'); // check if the src includes the map image file
  });

  
  it('displays correct business hours information', () => {
    setup();
    const businessHoursText = screen.getByText(/з понеділка по п'ятницю з 8:00 до 18:00/);
    expect(businessHoursText).toBeInTheDocument();
  });
});
