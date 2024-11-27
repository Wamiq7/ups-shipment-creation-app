import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarInput } from "../CalenderInput";
import { InputWithLabel } from "../InputWithLabel";
import { Checkbox } from "../ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateDataState } from "@/redux/dataSlice";
import BasicSelect from "../BasicSelect";

const packageOptions = [
  { value: "03", label: "03" },
  { value: "02", label: "02" },
  { value: "01", label: "01" },
];

const serviceTypes = [
  { value: "03", label: "Ground" },
  { value: "02", label: "2nd Day Air" },
  { value: "01", label: "Next Day Air" },
];

const PackageInput = () => {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector(
    (state) => state.data.packageShipmentDetails
  );

  const handleSignature = (checked) => {
    dispatch(
      updateDataState({
        path: ["packageShipmentDetails"],
        updates: {
          isSignatureRequired: checked,
        },
      })
    );
  };

  return (
    <div className="grid grid-cols-7 gap-3 lg:gap-8 w-full mb-3">
      <div className="flex flex-col gap-3">
        <InputWithLabel
          label="ea"
          type="number"
          placeholder="1"
          value={shipmentData.pkgeQuantity}
          onChange={(e) => {
            dispatch(
              updateDataState({
                path: ["packageShipmentDetails"],
                updates: {
                  pkgeQuantity: e.target.value,
                },
              })
            );
          }}
        />
      </div>

      {/* Package Dimensions */}
      <div className="col-span-4">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="lg:block hidden"></div>
          <div className="col-span-3 flex flex-col gap-3">
            <div className="flex gap-3 lg:gap-4">
              <InputWithLabel
                label="Length (in)"
                type="number"
                placeholder="L"
                id="packageLength"
                name="packageLength"
                value={shipmentData.packageLength || ""}
                onChange={(e) => {
                  dispatch(
                    updateDataState({
                      path: ["packageShipmentDetails"],
                      updates: {
                        packageLength: e.target.value,
                      },
                    })
                  );
                }}
              />
              <InputWithLabel
                label="Width (in)"
                type="number"
                placeholder="W"
                id="packageWidth"
                name="packageWidth"
                value={shipmentData.packageWidth || ""}
                onChange={(e) => {
                  dispatch(
                    updateDataState({
                      path: ["packageShipmentDetails"],
                      updates: {
                        packageWidth: e.target.value,
                      },
                    })
                  );
                }}
              />
              <InputWithLabel
                label="Height (in)"
                type="number"
                placeholder="H"
                id="packageHeight"
                name="packageHeight"
                value={shipmentData.packageHeight || ""}
                onChange={(e) => {
                  dispatch(
                    updateDataState({
                      path: ["packageShipmentDetails"],
                      updates: {
                        packageHeight: e.target.value,
                      },
                    })
                  );
                }}
              />
            </div>
          </div>
          <div className="lg:block hidden"></div>
        </div>
      </div>

      {/* Package Weight */}
      <div className="col-span-1 flex gap-2">
        <InputWithLabel
          label="Weight (lbs)"
          type="number"
          placeholder="Enter weight"
          id="packageWeight"
          name="packageWeight"
          value={shipmentData.packageWeight || ""}
          onChange={(e) => {
            dispatch(
              updateDataState({
                path: ["packageShipmentDetails"],
                updates: {
                  packageWeight: e.target.value,
                },
              })
            );
          }}
        />
      </div>

      {/* Terms Checkbox */}
      <div className="col-span-1 flex flex-col space-y-2 h-full justify-center items-center">
        <div className="flex flex-col gap-3 items-center">
          <Checkbox
            id="isSignatureRequired"
            name="isSignatureRequired"
            checked={shipmentData.isSignatureRequired}
            onCheckedChange={handleSignature}
          />
        </div>
      </div>
    </div>
  );
};

export default function PackageShipmentDetails() {
  const dispatch = useAppDispatch();
  const shipmentData = useAppSelector(
    (state) => state.data.packageShipmentDetails
  );

  const selectedOption = serviceTypes.find(
    (option) => option.value === shipmentData?.serviceType
  );
  const selectedLabel = selectedOption?.label || "Select an option";

  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-lg lg:text-2xl">
          Package and Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:px-6 flex flex-col items-start lg:pt-6">
        <div className="grid grid-cols-3 gap-2 lg:gap-3 w-full">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-xs">
              Ship date*
            </Label>
            <p>{shipmentData?.shipDate}</p>
            <CalendarInput
              label="Date of Birth"
              placeholder="Select date"
              onDateChange={(date) => {
                // Convert Date object to ISO string or timestamp
                const formattedDate = date?.toISOString(); // or date.getTime() for timestamp

                dispatch(
                  updateDataState({
                    path: ["packageShipmentDetails"],
                    updates: {
                      shipDate: formattedDate, // or formattedDate (timestamp)
                    },
                  })
                );
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-xs">
              Service Type*
            </Label>
            <BasicSelect
              options={serviceTypes}
              placeholder={selectedLabel}
              value={shipmentData?.serviceType}
              onChange={(value) => {
                dispatch(
                  updateDataState({
                    path: ["packageShipmentDetails"],
                    updates: {
                      serviceType: value,
                    },
                  })
                );
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-xs">
              Package Type*
            </Label>
            <BasicSelect
              value={shipmentData.packageType}
              options={packageOptions}
              placeholder=""
              onChange={(value) => {
                dispatch(
                  updateDataState({
                    path: ["packageShipmentDetails"],
                    updates: {
                      packageType: value,
                    },
                  })
                );
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-3 lg:gap-8 w-full mt-5 lg:mt-8">
          <div className="flex flex-col gap-3">
            <h5 className="lg:whitespace-nowrap text-xs lg:text-sm text-black">
              Package Qty*
            </h5>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="hidden lg:block"></div>
              <div className="col-span-3 flex flex-col items-center lg:items-start gap-3">
                <h5 className="lg:whitespace-nowrap text-xs lg:text-sm text-black">
                  Dimensions*
                </h5>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
          <div className="col-span-1 flex gap-2">
            <div className="flex flex-col gap-3">
              <h5 className="lg:whitespace-nowrap text-xs lg:text-sm text-black">
                Weight*
              </h5>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center space-y-2">
            <div className="flex flex-col gap-3 items-center">
              <h5 className="text-xs lg:text-sm text-black">
                Signature Required*
              </h5>
            </div>
          </div>
        </div>
        <PackageInput />
        <button className="text-c-blue-accent italic text-xs hover:underline">
          + Add another Package
        </button>
      </CardContent>
    </Card>
  );
}
