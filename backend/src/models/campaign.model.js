const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    goal: Number,
    total: Number,
    isActive: Boolean,
    participates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
