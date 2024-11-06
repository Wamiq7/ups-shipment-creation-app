import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarInput } from "../CalenderInput";
import { InputWithLabel } from "../InputWithLabel";
import { Checkbox } from "../ui/checkbox";
import BasicSelect from "../BasicSelect";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const PackageInput = () => {
  return (
    <div className="grid grid-cols-7 gap-8 w-full mb-3">
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
        <div className="grid grid-cols-5 gap-4">
          <div></div>
          <div className="col-span-3 flex flex-col gap-3">
            <div className="flex gap-4">
              <InputWithLabel
                label="inch"
                type="email"
                placeholder="L"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <InputWithLabel
                label="inch"
                type="email"
                placeholder="W"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <InputWithLabel
                label="inch"
                type="email"
                placeholder="H"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />{" "}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="col-span-1 flex gap-2">
        <InputWithLabel
          label="lbs"
          type="email"
          placeholder=""
          id="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
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

export default function PackageShipmentDetails() {
  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-2xl">
          Package and Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start px-3 pt-7 pb-10">
        <div className="grid grid-cols-3 gap-3 w-full">
          <CalendarInput
            label="Date of Birth"
            placeholder="Select date"
            onDateChange={(date) => console.log("Selected date:", date)}
          />
          <BasicSelect options={themeOptions} placeholder="Theme" />
          <BasicSelect options={themeOptions} placeholder="Theme" />
        </div>
        <div className="grid grid-cols-7 gap-8 w-full mt-8">
          <div className="flex flex-col gap-3">
            <h5 className="whitespace-nowrap text-sm text-black">
              Package Qty*
            </h5>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-5 gap-4">
              <div></div>
              <div className="col-span-3 flex flex-col gap-3">
                <h5 className="whitespace-nowrap text-sm text-black">
                  Dimensions*
                </h5>
              </div>
              <div></div>
            </div>
          </div>
          <div className="col-span-1 flex gap-2">
            <div className="flex flex-col gap-3">
              <h5 className="whitespace-nowrap text-sm text-black">Weight*</h5>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center space-y-2">
            <div className="flex flex-col gap-3 items-center">
              <h5 className="text-sm text-black">Signature Required*</h5>
            </div>
          </div>
        </div>
        <PackageInput />
        <button className="text-c-blue-accent italic text-xs hover:underline">
          + Add another Package
        </button>
        <h1 className="text-c-orange text-2xl mt-2">
          Add another Package to add more row
        </h1>
        <div className="border border-c-orange border-dotted py-2">
          <PackageInput />
        </div>
      </CardContent>
    </Card>
  );
}
