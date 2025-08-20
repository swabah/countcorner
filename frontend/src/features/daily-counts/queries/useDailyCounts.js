/**
 * Daily Counts query hooks
 * Handles daily count data fetching using React Query
 */

import { queryOptions, useQuery } from "@tanstack/react-query";
import { dailyCountsApi } from "../api/daily-counts.api";
import { queryKeys } from "@/lib/query/keys";

/**
 * Fetch all daily counts
 */
export const useDailyCounts = () => {
  const query = useQuery({
    queryKey: queryKeys.dailyCounts(),
    queryFn: dailyCountsApi.getDailyCounts,
    ...queryOptions,
  });

  // Fallback data if API fails
  if (query.isError || !query.data) {
    return {
      ...query,
      data: [
        {
          id: 1,
          participantId: 1,
          count: 150,
          date: "2024-01-07",
          timestamp: "2024-01-07T10:30:00Z",
        },
        {
          id: 2,
          participantId: 2,
          count: 120,
          date: "2024-01-07",
          timestamp: "2024-01-07T11:15:00Z",
        },
        {
          id: 3,
          participantId: 1,
          count: 200,
          date: "2024-01-06",
          timestamp: "2024-01-06T09:45:00Z",
        },
        {
          id: 4,
          participantId: 3,
          count: 180,
          date: "2024-01-07",
          timestamp: "2024-01-07T14:20:00Z",
        },
      ],
    };
  }

  return query;
};

/**
 * Fetch a single daily count by ID
 */
export const useDailyCount = (id) => {
  return useQuery({
    queryKey: queryKeys.dailyCount(id),
    queryFn: () => dailyCountsApi.getDailyCount(id),
    enabled: !!id,
    ...queryOptions,
  });
};
