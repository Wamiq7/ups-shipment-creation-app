import mongoose from "mongoose";

export const toSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    attentionName: {
      type: String,
      required: true,
    },
    addressLineOne: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShipmentProfile",
      required: true,
    },
  },
  { timestamps: true }
);

const To = mongoose.models?.To || mongoose.model("To", toSchema);

export { To };
