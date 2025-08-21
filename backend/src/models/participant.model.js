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

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
