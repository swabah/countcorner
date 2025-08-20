/**
 * Participant query hooks
 * Handles participant data fetching using React Query
 */

import { useQuery } from "@tanstack/react-query";
import { participantsApi } from "../api/participants.api";
import { queryKeys, queryOptions } from "@/lib/query/keys";

/**
 * Fetch all participants
 */
export const useParticipants = () => {
  return useQuery({
    queryKey: queryKeys.participants(),
    queryFn: participantsApi.getParticipants,
    ...queryOptions,
  });
};

/**
 * Fetch a single participant by ID
 */
export const useParticipant = (id) => {
  return useQuery({
    queryKey: queryKeys.participant(id),
    queryFn: () => participantsApi.getParticipant(id),
    enabled: !!id,
    ...queryOptions,
  });
};

/**
 * Fetch leaderboard data
 */
export const useLeaderboard = () => {
  return useQuery({
    queryKey: queryKeys.leaderboard(),
    queryFn: participantsApi.getLeaderboard,
    ...queryOptions,
  });
};
