/**
 * Campaigns API functions
 * Handles all campaign-related HTTP requests using Axios instance
 */

import axiosInstance from "@/lib/api/base";

export const campaignsApi = {
  /**
   * Get all campaigns
   * @returns {Promise} List of campaigns
   */
  getCampaigns: () => axiosInstance.get("/campaigns"),

  /**
   * Get single campaign by ID
   * @param {string|number} id - Campaign ID
   * @returns {Promise} Campaign data
   */
  getCampaign: (id) => axiosInstance.get(`/campaigns/${id}`),

  /**
   * Create new campaign
   * @param {Object} data - Campaign data
   * @returns {Promise} Created campaign
   */
  createCampaign: (data) => axiosInstance.post("/campaigns", data),

  /**
   * Update existing campaign
   * @param {string|number} id - Campaign ID
   * @param {Object} data - Updated campaign data
   * @returns {Promise} Updated campaign
   */
  updateCampaign: (id, data) => axiosInstance.put(`/campaigns/${id}`, data),

  /**
   * Delete campaign
   * @param {string|number} id - Campaign ID
   * @returns {Promise} Deletion confirmation
   */
  deleteCampaign: (id) => axiosInstance.delete(`/campaigns/${id}`),
};
