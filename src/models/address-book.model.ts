import mongoose from "mongoose";

export const addressBookSchema = new mongoose.Schema(
  {
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
    faxNumber: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    country: {
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

const AddressBook =
  mongoose.models?.AddressBook ||
  mongoose.model("AddressBook", addressBookSchema);

export { AddressBook };
