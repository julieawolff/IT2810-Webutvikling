import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.get('https://restcountries.com/v3.1/all', async ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams.getAll('fields');

    if (!params) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json([
      {
        name: { common: 'Norway' },
        continents: ['Europe'],
        capital: ['Oslo'],
        flags: { png: 'https://flagcdn.com/no.svg' },
        languages: { nor: 'Norwegian' },
        currencies: { NOK: { name: 'Norwegian Krone' } },
      },
      {
        name: { common: 'Sweden' },
        continents: ['Europe'],
        capital: ['Stockholm'],
        flags: { png: 'https://flagcdn.com/se.svg' },
        languages: { swe: 'Swedish' },
        currencies: { SEK: { name: 'Swedish Krona' } },
      },
      {
        name: { common: 'Bangladesh' },
        continents: ['Asia'],
        capital: ['Dhaka'],
        flags: { png: 'https://flagcdn.com/bd.svg' },
        languages: { ben: 'Bengali' },
        currencies: { BDT: { name: 'Bangladeshi taka' } },
      },
      {
        name: { common: 'Brasil' },
        continents: ['South America'],
        capital: ['Brasília'],
        flags: { png: 'https://flagcdn.com/se.svg' },
        languages: { por: 'Portuguese' },
        currencies: { BRL: { name: 'Brazilian real' } },
      },
    ]);
  }),
];

export const server = setupServer(...handlers);
