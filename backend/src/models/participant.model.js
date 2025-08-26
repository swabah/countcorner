const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
      index: true,
    },
    totalContributed: {
      type: Number,
      default: 0,
      min: 0,
    },
    contributions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contribution",
      },
    ],
  },
  { timestamps: true }
);

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
