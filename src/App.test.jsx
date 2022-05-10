import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { waitForElementToBeRemoved } from '@testing-library/react';

const fakePark = {
  data: [
    {
      fullName: 'Aidan Park',
      parkCode: 'aidan',
      designation: 'National Park',
      description: 'Aidan has a very cool park.',
      states: 'WA',
      images: [
        {
          title: 'Cool photo of Aidan Park',
          altText: 'mountains and rivers and lake',
          caption: 'pretty mountain and river and lake',
          url: 'https://www.nps.gov/common/uploads/structured_data/2595FA12-DF7A-1B6C-55D8F41ABCA2E011.jpg',
        },
      ],
      weatherInfo: 'Always good weather except when it is not',
    },
  ],
};

const server = setupServer(
  rest.get(
    `https://developer.nps.gov/api/v1/parks?&api_key=${process.env.REACT_APP_API_KEY}`,
    (req, res, ctx) => res(ctx.json(fakePark))
  )
);

beforeAll(() => server.listen());
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
});
