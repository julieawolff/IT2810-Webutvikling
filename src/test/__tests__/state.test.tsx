import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FavoriteButton from '../../components/FavoriteButton';
import DisplayCountriesPage from '../../pages/DisplayCountriesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('FavoriteButton Component', () => {
  it('should render correctly according to the initialState', () => {
    render(<FavoriteButton initialFavoriteStatus={false} handleFavorite={vi.fn()} />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('\u2661');
  });
  it('should toggle favorite status and call handleFavorite on click', () => {
    const mockHandleFavorite = vi.fn();
    render(<FavoriteButton initialFavoriteStatus={false} handleFavorite={mockHandleFavorite} />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('\u2661');

    fireEvent.click(button);

    expect(button.textContent).toBe('\u2665');
    expect(mockHandleFavorite).toHaveBeenCalledTimes(1);
  });
});

describe('DisplayCountriesPage Component', () => {
  it('should save the selectedOptions (selected filters) to sessionStorage ', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DisplayCountriesPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(sessionStorage.getItem('selectedOptions')).toBeNull();

      const europeButton = screen.getByText('Europe');
      const asiaButton = screen.getByText('Asia');

      fireEvent.click(europeButton);
      fireEvent.click(asiaButton);

      expect(sessionStorage.getItem('selectedOptions')).toContain('Europe');
      expect(sessionStorage.getItem('selectedOptions')).toContain('Asia');

      fireEvent.click(asiaButton);

      expect(sessionStorage.getItem('selectedOptions')).toContain('Europe');
      expect(sessionStorage.getItem('selectedOptions')).not.toContain('Asia');
    });
  });

  it('should make sure country is stored in localStorage after made favorite', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DisplayCountriesPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(localStorage.getItem('favoriteCountries')).toBeNull();
      const europeButton = screen.getByText('Europe');
      fireEvent.click(europeButton);

      const favoriteButton = screen.getByText('\u2661');
      fireEvent.click(favoriteButton);

      expect(localStorage.getItem('favoriteCountries')).toContain('Norway');
    });
  });
});
