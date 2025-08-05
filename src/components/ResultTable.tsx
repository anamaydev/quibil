import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle, CardDescription}  from "@/components/ui/card";
import type {MonthlyBillType} from "@/pages/Calculator";

const ResultTable = ({latestMonthlyBill}:{latestMonthlyBill: MonthlyBillType | null}) => {
  if(!latestMonthlyBill) return (
    <Card className="flex h-full flex-col">
      <CardHeader className="justify-center items-center pb-0">
        <CardDescription>Nothing to show here.</CardDescription>
      </CardHeader>
    </Card>
  )

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const data = latestMonthlyBill.tenantsBill;
  const processedData = data.map((entry)=>({
      ...entry,
      fullName:entry.firstName+" "+entry.lastName,
    }
  ))

  return (
    <Card className="flex flex-col w-full h-full rounded-md">
      <CardContent className="flex-1 flex flex-col gap-4 pb-0">
        <CardHeader className="items-center pb-0 px-2">
          <CardTitle>Tenant Electricity Bill Summary</CardTitle>
          <CardDescription>{`${months[latestMonthlyBill.month]} - ${months[latestMonthlyBill.month+1]} ${latestMonthlyBill.year}`}</CardDescription>
        </CardHeader>
        <div className="relative w-full border rounded-md overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">ID</TableHead>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Units Consumed (kWh)</TableHead>
                <TableHead>Electricity Bill (₹)</TableHead>
                <TableHead>Motor Bill (₹)</TableHead>
                <TableHead>Total Bill (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.map((entry, idx)=>(
                <TableRow key={idx} className="odd:bg-muted/50">
                  <TableCell className="pl-4">{idx+1}</TableCell>
                  <TableCell className="font-medium">{entry.fullName}</TableCell>
                  <TableCell>{entry.unitsConsumed}</TableCell>
                  <TableCell>{entry.totalUnitsBill}</TableCell>
                  <TableCell>{entry.finalBill-entry.totalUnitsBill}</TableCell>
                  <TableCell>{entry.finalBill}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
export default ResultTable
