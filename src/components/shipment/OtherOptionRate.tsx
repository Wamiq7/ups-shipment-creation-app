import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OtherOptionRate() {
  return (
    <Card>
      <CardHeader className="bg-c-gray-accent-head rounded-t-xl px-6 py-2 text-white">
        <CardTitle className="text-center font-bold text-2xl">
          Other Option Rate & ETA
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 items-center pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">UPS@Ground</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">UPS@Ground</TableCell>
              <TableCell>Wednesday 11/06 by End of day</TableCell>
              <TableCell>$15.49</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
