import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Appointment from './Appointment';

// Mock the fetch function globally
beforeAll(() => {
  global.fetch = jest.fn();
  window.alert = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('BookAppointment Component Tests', () => {
  const setup = () => render(
    <MemoryRouter>
      <Appointment />
    </MemoryRouter>
  );

  beforeEach(() => {
    fetch.mockClear();
    window.alert.mockClear();
  });

  it('fetches and displays doctors', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, first_name: 'Іван', last_name: 'Коваль', specialization: 'Кардіологія' },
        { id: 2, first_name: 'Олена', last_name: 'Петренко', specialization: 'Неврологія' },
      ],
    });

    setup();

    await waitFor(() => {
      expect(screen.getByText('Іван Коваль - Кардіологія')).toBeInTheDocument();
      expect(screen.getByText('Олена Петренко - Неврологія')).toBeInTheDocument();
    });
  });
});
