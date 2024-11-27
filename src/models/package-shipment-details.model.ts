import mongoose from "mongoose";

const packageDetailsSchema = new mongoose.Schema(
  {
    packageQuantity: {
      type: Number,
      required: true,
    },
    dimensions: {
      type: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    signatureRequired: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

export const packageShipmentDetailsSchema = new mongoose.Schema(
  {
    shipDate: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    packageType: {
      type: String,
      required: true,
    },
    packages: {
      type: [packageDetailsSchema],
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

const PackageShipmentDetails =
  mongoose.models?.PackageShipmentDetails ||
  mongoose.model("PackageShipmentDetails", packageShipmentDetailsSchema);

export { PackageShipmentDetails };
