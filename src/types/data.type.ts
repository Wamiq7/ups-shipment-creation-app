export interface IShipmentFrom {
  senderName: string;
  senderAttention: string;
  senderTaxId: string;
  senderPhone: string;
  // senderFax: string;
  senderAddressLine: string;
  senderCity: string;
  senderState: string;
  senderPostalCode: string;
  senderCountry: string;
  contactName: string;
  email: string;
  extension: string;
  edit: boolean;
  add: boolean;
  selectedAddress: string;
}

interface To {
  receiverName: string;
  receiverAttention: string;
  receiverPhone: string;
  receiverAddressLine: string;
  receiverCity: string;
  receiverState: string;
  receiverPostalCode: string;
  receiverCountry: string;
  contactName: string;
  email: string;
  extension: string;
  edit: boolean;
  add: boolean;
  selectedAddress: string;
}

interface Package {
  pkgeQuantity: string;
  dimensions: {
    packageLength: string;
    packageWidth: string;
    packageHeight: string;
  };
  packageWeight: string;
  isSignatureRequired: boolean;
}

export interface PackageShipmentDetails {
  shipDate: string;
  serviceType: string;
  packageType: string;
  packages: Package[];
  description: string;
  packageDescription: string;
}

interface PickupLocation {
  pickupDate: string; // ISO date string
  shipFromName: string;
  shipFromAttention: string;
  shipFromPhone: string;
  shipFromFax: string;
  shipFromAddressLine: string;
  shipFromCity: string;
  shipFromState: string;
  shipFromPostalCode: string;
  shipFromCountry: string;
  email: string;
  contactName: string;
  extension: string;
  edit: boolean;
  add: boolean;
  selectedAddress: string;
}

interface PickupDetails {
  earliest: string;
  latest: string;
  preferredPickupLocation: string;
  pickupReference: string;
}

interface ShipmentProfile {
  name: string;
  edit: boolean;
  add: boolean;
  selectedAddress: string;
}

interface pendingPickups {
  pickupLocation: string;
}

export interface IDataState {
  from: IShipmentFrom;
  to: To;
  packageShipmentDetails: PackageShipmentDetails;
  pickUpLocation: PickupLocation;
  pickUpDetails: PickupDetails;
  pendingPickups: pendingPickups;
  shipmentProfile: ShipmentProfile;
  setPickup: {
    type: string;
  };
}
