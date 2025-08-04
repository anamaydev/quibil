import { Pie, PieChart, LabelList } from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart";
import {type ChartConfig} from "@/components/ui/chart";
import type {AfterMotorBillSplitType, MonthlyBillType} from "@/pages/Calculator";

const ResultChartOld = ({latestMonthlyBill}:{latestMonthlyBill: MonthlyBillType | null}) => {
  if(!latestMonthlyBill) return (
    <Card className="flex flex-col">
      <CardHeader className="min-h-[250px] aspect-square items-center pb-0">
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

  const data: AfterMotorBillSplitType[] = latestMonthlyBill.tenantsBill;

  /* add full name and fill */
  const processedData = data.map((entry)=>({
      ...entry,
      fullName:entry.firstName+" "+entry.lastName,
      fill: `var(--color-${entry.firstName}-${entry.lastName})`
    }
  ))

  /* chart config for pie chart */
  const chartConfig = {
    unitsConsumed: { label: "Units" },
    ...Object.fromEntries(
      processedData.map((entry, index) => [
        `${entry.firstName}-${entry.lastName}`,
        { label: entry.fullName, color: `var(--chart-${index+1})` }
      ])
    )
  } satisfies ChartConfig;


  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Units Consumed</CardTitle>
          <CardDescription>{`${months[latestMonthlyBill.month]} - ${months[latestMonthlyBill.month+1]} ${latestMonthlyBill.year}`}</CardDescription>
        </CardHeader>
        <ChartContainer
          config={chartConfig}
          // className="mx-auto aspect-square max-h-[250px]"
          // className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          className="[&_.recharts-pie-label-text]:fill-white mx-auto max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="unitsConsumed" hideLabel />}
            />
            <Pie data={processedData} dataKey="unitsConsumed" label nameKey="fullName">
              <LabelList
                dataKey="fullName"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

      </CardContent>
    </Card>
  )
}
export default ResultChartOld
