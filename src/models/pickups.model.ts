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
      required: true,
    },
  },
  { timestamps: true }
);

const Pickup =
  mongoose.models?.Pickup || mongoose.model("Pickup", pickupsSchema);

export { Pickup };
