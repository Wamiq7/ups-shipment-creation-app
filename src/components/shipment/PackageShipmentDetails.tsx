import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarInput } from "../CalenderInput";
import { InputWithLabel } from "../InputWithLabel";
import { Checkbox } from "../ui/checkbox";
import BasicSelect from "../BasicSelect";
import { Label } from "../ui/label";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const serviceTypes = [
  { value: "03", label: "Ground" },
  { value: "02", label: "2nd Day Air" },
  { value: "01", label: "Next Day Air" },
];

const PackageInput = ({ shipmentData, setShipmentData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-7 gap-3 lg:gap-8 w-full mb-3">
      <div className="flex flex-col gap-3">
        <InputWithLabel
          label="ea"
          type="email"
          placeholder=""
          id="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="col-span-4">
        <div className="grid grid-col-3 lg:grid-cols-5 gap-4">
          <div className="lg:block hidden"></div>
          <div className="col-span-3 flex flex-col gap-3">
            <div className="flex gap-3 lg:gap-4">
              <InputWithLabel
                label="inch"
                type="number"
                placeholder="L"
                value={shipmentData.packageLength}
                onChange={handleChange}
              />
              <InputWithLabel
                label="inch"
                type="number"
                placeholder="W"
                value={shipmentData.packageWidth}
                onChange={handleChange}
              />
              <InputWithLabel
                label="inch"
                type="number"
                placeholder="H"
                value={shipmentData.packageHeight}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="lg:block hidden"></div>
        </div>
      </div>
      <div className="col-span-1 flex gap-2">
        <InputWithLabel
          label="lbs"
          type="number"
          placeholder=""
          value={shipmentData.packageWeight}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1 flex flex-col space-y-2 h-full justify-center items-center">
        <div className="flex flex-col gap-3 items-center">
          <Checkbox id="terms" />
        </div>
      </div>
    </div>
  );
};

export default function PackageShipmentDetails({
  shipmentData,
  setShipmentData,
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
  };

  const handleServiceTypeChange = (value: string) => {
    setShipmentData({
      ...shipmentData,
      serviceType: value,
    });
  };

  const selectedOption = serviceTypes.find(
    (option) => option.value === shipmentData?.serviceType
  );
  const selectedLabel = selectedOption?.label || "Select an option";

  console.log("shipmentData", selectedLabel);

  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-lg lg:text-2xl">
          Package and Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:px-6 flex flex-col items-start lg:pt-6">
        <div className="grid grid-cols-3 gap-2 lg:gap-3 w-full">
          {/* <div className="grid w-full max-w-sm items-center gap-1.5"> */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-xs">
              Ship date*
            </Label>
            <CalendarInput
              label="Date of Birth"
              placeholder="Select date"
              onDateChange={(date) => console.log("Selected date:", date)}
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
              onChange={handleServiceTypeChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-xs">
              Package Type*
            </Label>
            <BasicSelect value={""} options={themeOptions} placeholder="" />
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
        <PackageInput
          shipmentData={shipmentData}
          setShipmentData={setShipmentData}
        />
        <button className="text-c-blue-accent italic text-xs hover:underline">
          + Add another Package
        </button>
        <h1 className="text-c-orange text-base lg:text-2xl mt-2">
          Add another Package to add more row
        </h1>
        <div className="border border-c-orange border-dotted py-2">
          <PackageInput
            shipmentData={shipmentData}
            setShipmentData={setShipmentData}
          />
        </div>
      </CardContent>
    </Card>
  );
}
