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
                UPS@Ground
              </TableCell>
              <TableCell className="h-7 lg:h-9 text-xs lg:text-sm">
                Wednesday 11/06 by End of day
              </TableCell>
              <TableCell className="h-7 lg:h-9 text-xs lg:text-sm">0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
