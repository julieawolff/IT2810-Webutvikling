import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FilterOption from '../../components/FilterOption';
import FavoriteButton from '../../components/FavoriteButton';
import DisplayCountriesPage from '../../pages/DisplayCountriesPage';
import ListOption from '../../components/ListOption';

it('renders DisplayCountriesPage with mock data', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <DisplayCountriesPage />
    </QueryClientProvider>,
  );

  await waitFor(() => {
    expect(screen.getAllByText('Norway')[0]);
    expect(screen.getAllByText('Capital: Oslo')[0]);
    expect(screen.getAllByText('Language: Norwegian')[0]);
  });
});

describe('FavoriteButton Snapshot Tests', () => {
  it('renders correctly when not a favorite', () => {
    const { asFragment } = render(<FavoriteButton initialFavoriteStatus={false} handleFavorite={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when it is a favorite', () => {
    const { asFragment } = render(<FavoriteButton initialFavoriteStatus={true} handleFavorite={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('FilterOption Component', () => {
  it('renders with correct label and checked status', () => {
    render(<FilterOption label="Test Option" checked={false} onChange={() => {}} />);

    
    expect(screen.getByText('Test Option'));

    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkboxElement.checked).toBe(false);
  });
});

describe('ListOption Component', () => {
  it('renders with correct name', () => {
    render(<ListOption changedCountryName="Fiji" changeCountry={() => {}} />);
    expect(screen.getByText('Fiji'));
  });
});
