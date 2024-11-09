import BasicSelect from "../BasicSelect";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ShipmentProfile() {
  return (
    <Card>
      <CardContent className="p-3 lg:px-6 flex gap-2 items-center lg:pt-6">
        {/* <BasicDropdown label="Menu" menuData={menuData} /> */}
        <div className="w-full space-y-2">
          <CardTitle className="flex flex-col lg:flex-row lg:items-center gap-2">
            Shipment Profile{" "}
            <CardDescription className="italic font-normal text-[12px] lg:text-sm">
              * My shipment profile(formerly Fast Ship)
            </CardDescription>
          </CardTitle>
          <BasicSelect options={themeOptions} placeholder="Theme" />
        </div>
        <div className="bg-c-orange px-2 items-center text-white border flex gap-2 border-black rounded-md max-w-fit">
          <p className="text-[14px] lg:text-[24px] font-bold">Rates:</p>
          <h1 className="text-[20px] lg:text-[64px]">$15.49</h1>
        </div>
      </CardContent>
    </Card>
  );
}
