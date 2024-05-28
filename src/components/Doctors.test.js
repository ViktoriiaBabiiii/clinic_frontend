import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Doctors from './Doctors';

// Helper function to setup the fetch mock
function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        ok: true,
        json: () => Promise.resolve(data)
      });
    });
  }
}

describe('Doctors Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(setupFetchStub([
      { id: 1, first_name: 'Іван', last_name: 'Коваль', specialization: 'Кардіологія' },
      { id: 2, first_name: 'Олена', last_name: 'Петренко', specialization: 'Неврологія' }
    ]));
  });

  it('initially displays a loading state', async () => {
    render(
      <MemoryRouter>
        <Doctors />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull()); // Wait until loading disappears
  });


  it('shows all doctors when no filter is applied', async () => {
    render(
      <MemoryRouter>
        <Doctors />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Іван Коваль')).toBeInTheDocument());
    expect(screen.getByText('Олена Петренко')).toBeInTheDocument(); // Verify both doctors are displayed
  });

  it('filters doctors based on search input', async () => {
    render(
      <MemoryRouter>
        <Doctors />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('Іван Коваль')); // Ensure data is loaded
    fireEvent.change(screen.getByPlaceholderText('Search by specialization...'), {
      target: { value: 'невро' }
    });
    expect(screen.getByText('Олена Петренко')).toBeInTheDocument();
    expect(screen.queryByText('Іван Коваль')).toBeNull(); // Ensure Ivan is not found
  });

  it('displays an error message when fetch fails', async () => {
    // Ensure fetch is mocked to reject once simulating a network failure
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));
    
    render(
      <MemoryRouter>
        <Doctors />
      </MemoryRouter>
    );
  
    // Wait for the component to show an error message
    const errorMessage = await screen.findByText(/Error: Failed to fetch/);
    expect(errorMessage).toBeInTheDocument();
  });
  

});
