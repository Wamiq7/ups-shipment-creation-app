import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

export const useAddressBook = () => {
  const [loading, setLoading] = useState(false);

  const createAddressBookEntry = async (shipmentData) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.senderName,
        contactName: shipmentData.contactName,
        addressLineOne: shipmentData.senderAddressLine,
        zipCode: shipmentData.senderPostalCode,
        city: shipmentData.senderCity,
        state: shipmentData.senderState,
        email: shipmentData.email,
        phoneNumber: shipmentData.senderPhone,
        country: shipmentData.senderCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.post(
        "/api/address-book",
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    } finally {
      setLoading(false);
    }
  };

  return { createAddressBookEntry, loading };
};

export const useUpdateAddressBook = () => {
  const [loading, setLoading] = useState(false);

  const updateAddressBookEntry = async (shipmentData, selectedAddress) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.senderName,
        contactName: shipmentData.contactName,
        addressLineOne: shipmentData.senderAddressLine,
        zipCode: shipmentData.senderPostalCode,
        city: shipmentData.senderCity,
        state: shipmentData.senderState,
        email: shipmentData.email,
        phoneNumber: shipmentData.senderPhone,
        country: shipmentData.senderCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.patch(
        `/api/address-book/${selectedAddress}`,
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating address book entry:", error);
      toast.error("An error occurred while updating the address book entry.");
    }
  };

  return { updateAddressBookEntry, loading };
};

export const useToAddressBook = () => {
  const [loading, setLoading] = useState(false);

  const createAddressBookToEntry = async (shipmentData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.receiverName,
        attentionName: shipmentData.receiverAttention,
        addressLineOne: shipmentData.receiverAddressLine,
        zipCode: shipmentData.receiverPostalCode,
        city: shipmentData.receiverCity,
        state: shipmentData.receiverState,
        email: shipmentData.email,
        phoneNumber: shipmentData.receiverPhone,
        countryCode: shipmentData.receiverCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.post(
        "/api/address-book/to",
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  return { createAddressBookToEntry, loading };
};

export const useUpdateToAddressBook = () => {
  const [loading, setLoading] = useState(false);

  const updateAddressBookToEntry = async (shipmentData, selectedAddress) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        fullName: shipmentData.receiverName,
        attentionName: shipmentData.receiverAttention,
        addressLineOne: shipmentData.receiverAddressLine,
        zipCode: shipmentData.receiverPostalCode,
        city: shipmentData.receiverCity,
        state: shipmentData.receiverState,
        email: shipmentData.email,
        phoneNumber: shipmentData.receiverPhone,
        countryCode: shipmentData.receiverCountry,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.patch(
        `/api/address-book/to/${selectedAddress}`,
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating address book entry:", error);
      toast.error("An error occurred while updating the address book entry.");
    }
  };

  return { updateAddressBookToEntry, loading };
};

export const useCreatePickupLocation = () => {
  const [loading, setLoading] = useState(false);

  const createPickupLocation = async (pickupLocation) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        countryOrTerritory: pickupLocation.shipFromCountry,
        fullName: pickupLocation.shipFromName,
        contactName: pickupLocation.shipFromName,
        addressLineOne: pickupLocation.shipFromAddressLine,
        zipCode: pickupLocation.shipFromPostalCode,
        city: pickupLocation.shipFromCity,
        state: pickupLocation.shipFromState,
        email: pickupLocation.email,
        phone: pickupLocation.shipFromPhone,
        extension: pickupLocation.extension,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.post(
        "/api/address-book/pickup-location",
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred while creating the address book entry.");
    }
  };

  return { createPickupLocation, loading };
};

export const useUpdatePickupLocation = () => {
  const [loading, setLoading] = useState(false);

  const updatePickupLocation = async (pickupLocation, selectedAddress) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const addressData = {
        countryOrTerritory: pickupLocation.shipFromCountry,
        fullName: pickupLocation.shipFromName,
        contactName: pickupLocation.shipFromName,
        addressLineOne: pickupLocation.shipFromAddressLine,
        zipCode: pickupLocation.shipFromPostalCode,
        city: pickupLocation.shipFromCity,
        state: pickupLocation.shipFromState,
        email: pickupLocation.email,
        phone: pickupLocation.shipFromPhone,
        extension: pickupLocation.extension,
        profileId: localStorage.getItem("selectedShipmentProfileId"),
      };

      const response = await axios.patch(
        `/api/address-book/pickup-location/${selectedAddress}`,
        addressData,
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating address book entry:", error);
      toast.error("An error occurred while updating the address book entry.");
    }
  };

  return { updatePickupLocation, loading };
};

export const useCreateShipmentProfile = () => {
  const [loading, setLoading] = useState(false);

  const createShipmentProfile = async (name) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(
        "/api/shipment-profile",
        { name },
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred");
    }
  };

  return { createShipmentProfile, loading };
};

export const useUpdateShipmentProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateShipmentProfile = async (name, shipmentProfileId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.patch(
        `/api/shipment-profile/${shipmentProfileId}`,
        { name },
        config
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating address book entry:", error);
      toast.error("An error occurred");
    }
  };

  return { updateShipmentProfile, loading };
};

export const useCreatePackageShipment = () => {
  const [loading, setLoading] = useState(false);

  const createPackageShipment = async (data) => {
    try {
      const { shipDate, serviceType, packageType, packages } = data;

      setLoading(true); // Set loading to true when starting the API call

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      // Make the API request to create the package shipment
      const response = await axios.post(
        "/api/package-shipment-details",
        { shipDate, serviceType, packageType, packages },
        config
      );

      toast.success(response.data.message); // Show success message
    } catch (error) {
      console.error("Error creating package shipment details:", error);
      toast.error(
        "An error occurred while creating the package shipment details"
      ); // Error handling
    } finally {
      setLoading(false); // Set loading to false after the API call is completed
    }
  };

  return { createPackageShipment, loading }; // Return the function and loading state
};
