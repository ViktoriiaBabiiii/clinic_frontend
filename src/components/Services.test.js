import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Services from './Services';

// Mock the fetch function globally
beforeAll(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Services Component Tests', () => {
  const setup = () => render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches and displays services', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        services: [
          { id: 1, name: 'Загальний медичний огляд', price: 300, description: 'Комплексний загальний огляд організму для визначення стану здоров\'я.' },
          { id: 2, name: 'Огляд зору', price: 150, description: 'Детальний огляд здоров\'я очей.' },
        ],
      }),
    });

    setup();

    await waitFor(() => {
      expect(screen.getByText('Загальний медичний огляд')).toBeInTheDocument();
      expect(screen.getByText('Огляд зору')).toBeInTheDocument();
    });
  });

  it('filters services based on search term', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        services: [
          { id: 1, name: 'Загальний медичний огляд', price: 300, description: 'Комплексний загальний огляд організму для визначення стану здоров\'я.' },
          { id: 2, name: 'Огляд зору', price: 150, description: 'Детальний огляд здоров\'я очей.' },
        ],
      }),
    });

    setup();

    await waitFor(() => {
      expect(screen.getByText('Загальний медичний огляд')).toBeInTheDocument();
      expect(screen.getByText('Огляд зору')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search services...'), {
      target: { value: 'Загальний' },
    });

    expect(screen.getByText('Загальний медичний огляд')).toBeInTheDocument();
    expect(screen.queryByText('Огляд зору')).not.toBeInTheDocument();
  });

});
