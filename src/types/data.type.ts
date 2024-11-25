interface From {
  senderName: string;
  senderAttention: string;
  senderTaxId: string;
  senderPhone: string;
  senderFax: string;
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
}

interface PackageShipmentDetails {
  shipDate: string;
  serviceType: string;
  packageType: string;
  pkgeQuantity: string;
  packageLength: string;
  packageWidth: string;
  packageHeight: string;
  packageWeight: string;
  isSignatureRequired: boolean;
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
  email: string; // New field
  contactName: string; // New field
  extension: string; // New field
  edit: boolean; // New field
  add: boolean; // New field
}

interface PickupDetails {
  earliest: string;
  latest: string;
  preferredPickupLocation: string;
  pickupReference: string;
}

interface ShipmentProfile {
  name: string;
}

export interface IDataState {
  from: From;
  to: To;
  packageShipmentDetails: PackageShipmentDetails;
  pickUpLocation: PickupLocation;
  pickUpDetails: PickupDetails;
  shipmentProfile: ShipmentProfile;
}
