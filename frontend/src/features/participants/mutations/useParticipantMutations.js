/**
 * Participant mutation hooks
 * Handles participant data modifications using React Query
 */

import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { participantsApi } from "../api/participants.api";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query/keys";

/**
 * Create a new participant
 */
export const useParticipantMutation = () => {
  const queryClient = useQueryClient();

  const createParticipantMutation = useMutation({
    mutationFn: participantsApi.createParticipant,
    onSuccess: (newParticipant) => {
      // Update participants list cache (Axios response shape with .data)
      queryClient.setQueryData(queryKeys.participants(), (prev) => {
        if (!prev) return { data: [newParticipant] };
        return { ...prev, data: [newParticipant, ...(prev.data || [])] };
      });

      // Leaderboard typically recomputed on server; invalidate to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      toast.success("Welcome! You've successfully joined the campaign!");
    },
    onError: (err) => {
      toast.error("You have already joined this campaign.!");
    },
  });

  const updateParticipantMutation = useMutation({
    mutationFn: ({ id, data }) => participantsApi.updateParticipant(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.participants() });
      await queryClient.cancelQueries({ queryKey: queryKeys.participant(id) });

      const previousParticipants = queryClient.getQueryData(
        queryKeys.participants()
      );
      const previousParticipant = queryClient.getQueryData(
        queryKeys.participant(id)
      );

      // Optimistically update participants list (Axios response with .data)
      queryClient.setQueryData(queryKeys.participants(), (prev) => {
        if (!prev || !prev.data) return prev;
        return {
          ...prev,
          data: prev.data.map((p) => (p._id === id ? { ...p, ...data } : p)),
        };
      });

      // Optimistically update single participant cache if present
      queryClient.setQueryData(queryKeys.participant(id), (prev) =>
        prev ? { ...prev, ...data } : prev
      );

      return { previousParticipants, previousParticipant };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousParticipants) {
        queryClient.setQueryData(
          queryKeys.participants(),
          context.previousParticipants
        );
      }
      if (context?.previousParticipant) {
        queryClient.setQueryData(
          queryKeys.participant(id),
          context.previousParticipant
        );
      }
      toast.error("Failed to update participant");
    },
    onSuccess: (updated, variables) => {
      const id = variables.id;
      // Ensure caches reflect server response
      if (updated) {
        queryClient.setQueryData(queryKeys.participants(), (prev) => {
          if (!prev || !prev.data) return prev;
          return {
            ...prev,
            data: prev.data.map((p) => (p._id === id ? updated : p)),
          };
        });
        queryClient.setQueryData(queryKeys.participant(id), updated);
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      toast.success("Participant updated successfully!");
    },
  });

  const deleteParticipantMutation = useMutation({
    mutationFn: participantsApi.deleteParticipant,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.participants() });

      const previousParticipants = queryClient.getQueryData(
        queryKeys.participants()
      );

      // Optimistic remove from list
      queryClient.setQueryData(queryKeys.participants(), (prev) => {
        if (!prev || !prev.data) return prev;
        return { ...prev, data: prev.data.filter((p) => p._id !== id) };
      });

      return { previousParticipants };
    },
    onError: (_err, _id, context) => {
      if (context?.previousParticipants) {
        queryClient.setQueryData(
          queryKeys.participants(),
          context.previousParticipants
        );
      }
      toast.error("Failed to remove participant");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      toast.success("Participant removed successfully!");
    },
  });

  return {
    createParticipant: createParticipantMutation.mutate,
    createParticipantAsync: createParticipantMutation.mutateAsync,
    isCreating: createParticipantMutation.isPending,
    createError: createParticipantMutation.error,

    updateParticipant: updateParticipantMutation.mutate,
    updateParticipantAsync: updateParticipantMutation.mutateAsync,
    isUpdating: updateParticipantMutation.isPending,
    updateError: updateParticipantMutation.error,

    deleteParticipant: deleteParticipantMutation.mutate,
    deleteParticipantAsync: deleteParticipantMutation.mutateAsync,
    isDeleting: deleteParticipantMutation.isPending,
    deleteError: deleteParticipantMutation.error,
  };
};

/**
 * Update an existing participant
 */
export const useUpdateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => participantsApi.updateParticipant(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.participants() });
      await queryClient.cancelQueries({ queryKey: queryKeys.participant(id) });

      const previousParticipants = queryClient.getQueryData(
        queryKeys.participants()
      );
      const previousParticipant = queryClient.getQueryData(
        queryKeys.participant(id)
      );

      // Optimistically update participants list
      queryClient.setQueryData(queryKeys.participants(), (old) =>
        old ? old.map((p) => (p.id === id ? { ...p, ...data } : p)) : []
      );

      // Optimistically update single participant
      queryClient.setQueryData(queryKeys.participant(id), (old) =>
        old ? { ...old, ...data } : null
      );

      return { previousParticipants, previousParticipant };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.participants() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.participant(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      toast.success("Participant updated successfully!");
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        queryKeys.participants(),
        context.previousParticipants
      );
      queryClient.setQueryData(
        queryKeys.participant(variables.id),
        context.previousParticipant
      );
      toast.error(`Failed to update participant: ${error.message}`);
    },
  });
};

/**
 * Delete a participant
 */
export const useDeleteParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: participantsApi.deleteParticipant,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.participants() });

      const previousParticipants = queryClient.getQueryData(
        queryKeys.participants()
      );

      queryClient.setQueryData(queryKeys.participants(), (old) =>
        old ? old.filter((p) => p.id !== id) : []
      );

      return { previousParticipants };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.participants() });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      toast.success("Participant removed successfully!");
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(
        queryKeys.participants(),
        context.previousParticipants
      );
      toast.error(`Failed to remove participant: ${error.message}`);
    },
  });
};
