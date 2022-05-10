import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { waitForElementToBeRemoved } from '@testing-library/react';

const fakePark = {
  data: [
    {
      fullName: 'Alchemy Park',
      parkCode: 'Alchemy',
      designation: 'National Park',
      description: 'Alchemy has a very cool park.',
      states: 'OR & WA',
      images: [
        {
          title: 'Cool photo of Alchemy Park',
          altText: 'mountains and rivers and lake',
          caption: 'pretty mountain and river and lake',
          url: 'https://www.nps.gov/common/uploads/structured_data/2595FA12-DF7A-1B6C-55D8F41ABCA2E011.jpg',
        },
      ],
      weatherInfo: 'Always good weather except when it is not',
    },
  ],
};

const fakeFunData = {
  data: [
    {
      fullName: 'Fun Park',
      parkCode: 'funn',
      designation: 'National Park',
      description: 'Fun is not a cool park.',
      states: 'OR',
      images: [
        {
          title: 'fun photo of Fun Park',
          altText: 'sand and mountains',
          caption: 'pretty sand and mountains',
          url: 'https://www.nps.gov/common/uploads/structured_data/BC4ACB4C-0A6D-0188-E9A6AA1217827461.jpg',
        },
      ],
      weatherInfo: 'Always bad weather except when it is not',
    },
  ],
};

const server = setupServer(
  rest.get(`https://developer.nps.gov/api/v1/parks`, (req, res, ctx) => {
    const fakeParams = req.url.searchParams.get('parkCode');
    if (fakeParams === 'funn') {
      return res(ctx.json(fakeFunData));
    }
    return res(ctx.json(fakePark));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('renders the list of parks, a detail page, and a header', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    screen.getByText(/loading/i);
    screen.getByText(/US Parks and Sites/i);

    await waitForElementToBeRemoved(screen.getByText(/loading/i), {
      timeout: 2000,
    });
    await screen.findByText('Welcome');
    const name = await screen.findByText(fakePark.data[0].fullName);
    expect(name).toBeInTheDocument();
    fireEvent.click(name);

    screen.getByText(/loading information/i);

    return waitFor(() => {
      const result = screen.getAllByRole('img');
      expect(result.length).toEqual(1);
      screen.getByText(fakePark.data[0].weatherInfo);
      screen.debug();
    });
  });
  it('navigating the app', async () => {
    render(
      <MemoryRouter
        initialEntries={['/', '/parks?stateCode=OR', '/park/funn', '/']}
        initialIndex={2}
      >
        <App />
      </MemoryRouter>
    );

    screen.getByText('Loading Information...');

    await waitForElementToBeRemoved(screen.getByText(/loading/i), {
      timeout: 2000,
    });

    await screen.findByText('Fun is not a cool park.');
    screen.debug();
  });
});
