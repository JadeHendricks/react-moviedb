import { QueryClient } from '@tanstack/react-query';

// Defaults that match how the app behaved before Query: one retry, no refetch when the tab regains focus,
// and data counts as fresh for five minutes so going back to a page does not refetch it.
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
