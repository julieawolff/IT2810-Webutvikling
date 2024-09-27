import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayCountriesPage from '../../pages/DisplayCountriesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


it('Clicking a country moves the carousel', async () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <DisplayCountriesPage />
        </QueryClientProvider>
        );

    await waitFor(() => {
        const country = screen.getAllByText('Brasil')[0];
        userEvent.click(country); // Clicking brasil in the list of available countries

        const numberOfTimesMentioned = screen.getAllByText('Brasil').length;
        expect(numberOfTimesMentioned).toBe(2); // Expecting Brasil to be mentioned twice on the page
    });
});

it('Filters countries by continent', async () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <DisplayCountriesPage />
        </QueryClientProvider>
        );

    // Simulate filtering by continent 'Europe'
    await waitFor(() => {
        const option = screen.getAllByText('Europe')[0];
        userEvent.click(option);

        const country = screen.getAllByText('Norway')[0]; // Assuming Norway is in the dataset
        expect(country.textContent).toBe('Norway');

        const notCountry = screen.queryAllByText('Bangladesh')[0]; // Assuming Bangladesh is not in the dataset
        expect(notCountry).toBe(undefined);
    });
});