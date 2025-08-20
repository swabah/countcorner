import { QueryClient } from '@tanstack/react-query';

/**
 * @type {import('@tanstack/react-query').QueryClient}
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Global error handling
queryClient.setDefaultOptions({
  queries: {
    throwOnError: (error) => {
      // Handle global query errors here
      console.error('Query error:', error);
      return false; // Don't throw the error
    },
  },
  mutations: {
    throwOnError: (error) => {
      // Handle global mutation errors here
      console.error('Mutation error:', error);
      return false; // Don't throw the error
    },
  },
});
