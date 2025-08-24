const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contribution = mongoose.model("Contribution", contributionSchema);

module.exports = Contribution;
