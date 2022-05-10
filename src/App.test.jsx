import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the list of parks, a detail page, and a header', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    screen.getByText(/loading/i);

    await waitForElementToBeRemoved(await screen.findByText(loading / i), {
      timeout: 2000,
    });

    await screen.findByText(/Acadia National Park/i);
    screen.debug;
  });
});
