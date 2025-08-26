/**
 * Query key factory for organizing and managing query keys
 * @type {Object}
 */
export const queryKeys = {
  campaigns: () => ["campaigns"],
  campaign: (id) => ["campaign", id],
  participants: () => ["participants"],
  participant: (id) => ["participant", id],
  leaderboard: () => ["leaderboard"],
};

// Common query options
export const queryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
};

/**
 * Example usage:
 *
 * // In your query hook:
 * const useUser = (id) => {
 *   return useQuery({
 *     queryKey: queryKeys.users.detail(id),
 *     queryFn: () => fetchUser(id)
 *   });
 * };
 */
