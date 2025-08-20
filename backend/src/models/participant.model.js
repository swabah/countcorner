const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    countTotal: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", participantSchema);
