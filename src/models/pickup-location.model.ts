import mongoose from "mongoose";

export const pickupLocationSchema = new mongoose.Schema(
  {
    countryOrTerritory: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    contactName: {
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    extension: {
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

const PickupLocation =
  mongoose.models?.PickupLocation ||
  mongoose.model("PickupLocation", pickupLocationSchema);

export { PickupLocation };
