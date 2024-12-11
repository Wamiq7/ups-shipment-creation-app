import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";

const serviceTypes = [
  { value: "03", label: "Ground" },
  { value: "02", label: "2nd Day Air" },
  { value: "01", label: "Next Day Air" },
];

export default function OtherOptionRate() {
  const shipmentData = useAppSelector((state) => state.data);
  const [rate, setRate] = useState<any>();

  console.log("shipmentData", shipmentData.packageShipmentDetails.serviceType);

  const handleRatings = async (payload: any) => {
    try {
      const response = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipment: payload,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRate(data?.RateResponse);
      } else {
        const errorData = await response.json();
        console.error("Error in Ratings:", errorData);
        alert("An error occurred while fetching ratings");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while fetching ratings");
    }
  };

  useEffect(() => {
    handleRatings(shipmentData);
  }, [shipmentData]);

  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-lg lg:text-2xl">
          Other Option Rate & ETA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:px-6 flex gap-2 items-center lg:pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-7 lg:h-9">UPS@Ground</TableHead>
              <TableHead className="h-7 lg:h-9">ETA</TableHead>
              <TableHead className="h-7 lg:h-9">Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="h-7 lg:h-9 text-xs lg:text-sm">
                {
                  serviceTypes.find(
                    (item) => item.value === rate?.RatedShipment?.Service?.Code
                  )?.label
                }
              </TableCell>
              <TableCell className="h-7 lg:h-9 text-xs lg:text-sm">
                Wednesday 11/06 by End of day
              </TableCell>
              <TableCell className="h-7 lg:h-9 text-xs lg:text-sm">
                {rate?.RatedShipment?.TotalCharges?.MonetaryValue}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
