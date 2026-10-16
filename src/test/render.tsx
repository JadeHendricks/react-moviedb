import React, { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router';
import { createQueryClient } from '../api/queryClient';
import UiState from '../context/ui/UiState';
import ModalState from '../context/modal/ModalState';
import { routes } from '../routes';

/** Renders under the same providers as the app, with a fresh query cache and retries off. */
export const renderWithProviders = (ui: ReactElement, { route = '/' }: { route?: string } = {}) => {
  const queryClient = createQueryClient();
  queryClient.setDefaultOptions({ queries: { retry: false, gcTime: Infinity } });
  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <UiState>
          <ModalState>
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
          </ModalState>
        </UiState>
      </QueryClientProvider>,
    ),
  };
};

/** Renders the whole app (side and top navigation plus the routes) at `route`. */
export const renderApp = (route: string) => {
  const queryClient = createQueryClient();
  queryClient.setDefaultOptions({ queries: { retry: false, gcTime: Infinity } });
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  return {
    queryClient,
    router,
    ...render(
      <QueryClientProvider client={queryClient}>
        <UiState>
          <ModalState>
            <RouterProvider router={router} />
          </ModalState>
        </UiState>
      </QueryClientProvider>,
    ),
  };
};

/** Routes fetch() by URL substring; the first matching key wins. Unmatched URLs fail the test loudly. */
export const mockTmdb = (routes: Record<string, unknown>) => {
  const calls: string[] = [];
  const fetchMock = (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    const key = Object.keys(routes).find((k) => url.includes(k));
    if (!key) return Promise.resolve(new Response(JSON.stringify({}), { status: 404 }));
    return Promise.resolve(new Response(JSON.stringify(routes[key]), { status: 200 }));
  };
  return { calls, fetchMock };
};
