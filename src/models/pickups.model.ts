import mongoose from "mongoose";

export const pickupsSchema = new mongoose.Schema(
  {
    refNo: {
      type: String,
      required: true,
    },
    pickUpLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PickupLocation",
      required: false,
    },
  },
  { timestamps: true }
);

const Pickup =
  mongoose.models?.Pickup || mongoose.model("Pickup", pickupsSchema);

export { Pickup };
