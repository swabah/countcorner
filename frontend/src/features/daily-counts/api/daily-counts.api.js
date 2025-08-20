/**
 * Daily Counts API functions
 * Handles all daily count-related HTTP requests using Axios instance
 */

import axiosInstance from "@/lib/api/base";

export const dailyCountsApi = {
  /**
   * Get all daily counts
   * @returns {Promise} List of daily counts
   */
  getDailyCounts: () => axiosInstance.get("/daily-counts"),

  /**
   * Get single daily count by ID
   * @param {string|number} id - Daily count ID
   * @returns {Promise} Daily count data
   */
  getDailyCount: (id) => axiosInstance.get(`/daily-counts/${id}`),

  /**
   * Create new daily count
   * @param {Object} data - Daily count data
   * @returns {Promise} Created daily count
   */
  createDailyCount: (data) => axiosInstance.post("/daily-counts", data),

  /**
   * Update existing daily count
   * @param {string|number} id - Daily count ID
   * @param {Object} data - Updated daily count data
   * @returns {Promise} Updated daily count
   */
  updateDailyCount: (id, data) =>
    axiosInstance.put(`/daily-counts/${id}`, data),

  /**
   * Delete daily count
   * @param {string|number} id - Daily count ID
   * @returns {Promise} Deletion confirmation
   */
  deleteDailyCount: (id) => axiosInstance.delete(`/daily-counts/${id}`),
};
