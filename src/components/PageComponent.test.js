import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageComponent from './PageComponent';

describe('PageComponent Tests', () => {
  // Render component inside MemoryRouter to handle any potential routing
  const setup = (title, children) => render(
    <MemoryRouter>
      <PageComponent title={title}>{children}</PageComponent>
    </MemoryRouter>
  );

  it('renders the header with correct title', () => {
    const title = 'Test Title';
    setup(title, null);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the navigation bar with correct links', () => {
    setup('Test Title', null);
    expect(screen.getByText('Головна')).toBeInTheDocument();
    expect(screen.getByText('Про нас')).toBeInTheDocument();
    expect(screen.getByText('Послуги')).toBeInTheDocument();
    expect(screen.getByText('Лікарі')).toBeInTheDocument();
    expect(screen.getByText('Контакти')).toBeInTheDocument();
    expect(screen.getByText('Записатися на прийом')).toBeInTheDocument();
  });

  it('renders children content correctly', () => {
    const childrenContent = 'Test Content';
    setup('Test Title', <div>{childrenContent}</div>);
    expect(screen.getByText(childrenContent)).toBeInTheDocument();
  });

  it('renders the footer with correct text', () => {
    setup('Test Title', null);
    expect(screen.getByText('© 2024 Наша Клініка. Всі права захищені.')).toBeInTheDocument();
  });

  it('contains correct link hrefs', () => {
    setup('Test Title', null);
    expect(screen.getByText('Головна').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Про нас').closest('a')).toHaveAttribute('href', '/about-us');
    expect(screen.getByText('Послуги').closest('a')).toHaveAttribute('href', '/services');
    expect(screen.getByText('Лікарі').closest('a')).toHaveAttribute('href', '/doctors');
    expect(screen.getByText('Контакти').closest('a')).toHaveAttribute('href', '/contact');
    expect(screen.getByText('Записатися на прийом').closest('a')).toHaveAttribute('href', '/appointment');
  });
});
