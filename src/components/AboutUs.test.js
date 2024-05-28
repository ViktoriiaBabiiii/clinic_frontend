import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs';
import { BrowserRouter as Router } from 'react-router-dom';

describe('AboutUs component', () => {
  it('renders the mission, history, and values sections correctly', () => {
    render(
      <Router>
        <AboutUs />
      </Router>
    );

    // Check for mission section
    expect(screen.getByText('Наша місія')).toBeInTheDocument();
    expect(screen.getByText('Наша місія полягає у наданні всебічних, інноваційних медичних послуг у турботливому, професійному середовищі, яке сприяє здоров\'ю і благополуччю кожного пацієнта.')).toBeInTheDocument();
    expect(screen.getByAltText('Our Mission')).toBeInTheDocument();

    // Check for history section
    expect(screen.getByText('Наша історія')).toBeInTheDocument();
    expect(screen.getByText('Заснована у 2010 році, наша клініка починалася як невелика амбулаторія і виросла у повноцінний медичний центр з передовими технологіями та фахівцями світового рівня.')).toBeInTheDocument();
    expect(screen.getByAltText('Our History')).toBeInTheDocument();

    // Check for values section
    expect(screen.getByText('Наші цінності')).toBeInTheDocument();
    expect(screen.getByText('Ми дотримуємося цінностей чесності, співчуття та відмінності у всіх наших взаємодіях і лікуваннях, забезпечуючи найвищий стандарт догляду.')).toBeInTheDocument();
    expect(screen.getByAltText('Our Values')).toBeInTheDocument();
  });
});