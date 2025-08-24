/**
 * Participants API functions
 * Handles all participant-related HTTP requests using Axios instance
 */

import axiosInstance from "@/lib/api/base";

export const participantsApi = {
  /**
   * Get all participants
   * @returns {Promise} List of participants
   */
  getParticipants: () => axiosInstance.get("/participants"),

  /**
   * Get single participant by ID
   * @param {string|number} id - Participant ID
   * @returns {Promise} Participant data
   */
  getParticipant: (id) => axiosInstance.get(`/participants/${id}`),

  /**
   * Create new participant
   * @param {Object} data - Participant data
   * @returns {Promise} Created participant
   */
  createParticipant: async (data) => {
    const response = await axiosInstance.post("/participants", data);
    return response.data;
  },

  /**
   * Update existing participant
   * @param {string|number} id - Participant ID
   * @param {Object} data - Updated participant data
   * @returns {Promise} Updated participant
   */
  updateParticipant: (id, data) => {
    // console.log("update participant", id, ",", data);
    axiosInstance.put(`/participants/${id}`, data);
  },

  /**
   * Delete participant
   * @param {string|number} id - Participant ID
   * @returns {Promise} Deletion confirmation
   */
  deleteParticipant: (id) => axiosInstance.delete(`/participants/${id}`),

  /**
   * Get leaderboard data
   * @returns {Promise} Leaderboard with participant rankings
   */
  getLeaderboard: () => axiosInstance.get("/participants/leaderboard"),
};
