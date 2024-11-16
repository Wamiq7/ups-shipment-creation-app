import mongoose from "mongoose";

export const shipmentProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ShipmentProfile =
  mongoose.models?.ShipmentProfile ||
  mongoose.model("ShipmentProfile", shipmentProfileSchema);

export { ShipmentProfile };
