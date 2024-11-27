import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { IDataState } from "@/types/data.type";

const initialState: IDataState = {
  from: {
    senderCountry: "US",
    senderName: "ShipperName",
    senderAttention: "ShipperZs Attn Name",
    senderTaxId: "123456",
    senderPhone: "1115554758",
    senderFax: "8002222222",
    senderAddressLine: "2311 York Rd",
    senderCity: "Timonium",
    senderState: "MD",
    senderPostalCode: "21093",
    // Data not going in api but present in the form
    contactName: "dsadsadsa",
    email: "test@test.com",
    extension: " ",
    edit: false,
    add: true,
    selectedAddress: "",
  },
  to: {
    receiverName: "Happy Dog Pet Supply",
    receiverAttention: "1160b_74",
    receiverPhone: "9225377171",
    receiverAddressLine: "123 Main St",
    receiverCity: "timonium",
    receiverState: "MD",
    receiverPostalCode: "21030",
    receiverCountry: "US",
    // Data not going in api but present in the form
    contactName: "dsadsadsa",
    email: "test@test.com",
    extension: "1234567890",
    edit: false,
    add: true,
    selectedAddress: "",
  },
  packageShipmentDetails: {
    shipDate: new Date().toLocaleDateString(),
    serviceType: "03",
    packageType: "02",
    pkgeQuantity: "1",
    packageLength: "10",
    packageWidth: "30",
    packageHeight: "45",
    packageWeight: "5",
    isSignatureRequired: true,
    description: "Ship WS test",
    packageDescription: "Nails",
  },
  pickUpLocation: {
    shipFromCountry: "US",
    shipFromName: "T and T Designs",
    shipFromAddressLine: "2311 York Rd",
    shipFromPostalCode: "30005",
    shipFromCity: "Alpharetta",
    shipFromState: "GA",
    shipFromPhone: "1234567890",
    shipFromAttention: "1160b_74",
    shipFromFax: "1234567890",
    // Data not going in api but present in the form
    email: "1160b_74@gmail.com",
    contactName: "1160b_74",
    extension: "dasdas",
    pickupDate: "2023-09-22T00:00:00.000Z",
    edit: false,
    add: false,
    selectedAddress: "",
  },
  pickUpDetails: {
    // Data not going in api but present in the form
    earliest: "2023-09-22T00:00:00.000Z",
    latest: "2023-09-22T00:00:00.000Z",
    preferredPickupLocation: "1160b_74",
    pickupReference: "1160b_74",
  },
  pendingPickups: {
    pickupLocation: "",
  },
  shipmentProfile: {
    name: "Shipment Profile",
    edit: false,
    add: true,
    selectedAddress: "",
  },
};

// Helper function to update nested properties
const updateNestedState = (
  state: any,
  path: string[],
  updates: Record<string, any>
) => {
  const key = path[0];
  if (path.length === 1) {
    // Merge updates into the target object
    state[key] = { ...state[key], ...updates };
  } else {
    // Recursively navigate deeper into the object
    if (!state[key]) state[key] = {};
    updateNestedState(state[key], path.slice(1), updates);
  }
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateDataState: (
      state,
      action: PayloadAction<{
        path: string[];
        updates: Record<string, any>;
      }>
    ) => {
      const { path, updates } = action.payload;
      updateNestedState(state, path, updates);
    },
  },
});

export const { updateDataState } = dataSlice.actions;

// Selector for accessing data state
export const dataState = (state: RootState) => state.data;

export default dataSlice.reducer;
