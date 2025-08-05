import {useState, useEffect, type ChangeEvent} from "react";
import Readings from "@/components/Readings";
import ResultChart from "@/components/ResultChart";
import ResultTable from "@/components/ResultTable";
import {Button} from "@/components/ui/button";
import {useTenantContext} from "@/context/Tenant/useTenantContext";
import {useAuthContext} from "@/context/Auth/useAuthContext";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Plus} from "lucide-react";

type ReadingType = {
  oldReading: number | "";
  newReading: number | "";
  tenantId: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

type BeforeMotorBillSplitType = {
  oldReading: number;
  newReading: number;
  tenantId: string;
  firstName: string;
  lastName: string;
  unitsConsumed: number;
  totalUnitsBill: number;
}

export type AfterMotorBillSplitType = BeforeMotorBillSplitType & {
  finalBill: number;
}

export type MonthlyBillType = {
  ownerId: string;
  month: number;
  year: number;
  startDate: string;
  endDate: string;
  totalMonthBill: number;
  ownerBillSplit: number;
  tenantsBill: AfterMotorBillSplitType[];
}


const Calculator = () => {
  const {tenants, addMonthlyBill, monthlyBills, monthlyBillsLoading, fetchMonthlyBills} = useTenantContext();
  const {user} = useAuthContext();
  const [currentMonthBill, setCurrentMonthBill] = useState<number | "">("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [readings, setReadings] = useState<ReadingType[]>([{
    oldReading: "",
    newReading: "",
    tenantId: "",
    firstName: "",
    lastName: ""
  }]);
  const [latestMonthlyBill, setLatestMonthlyBill] = useState<MonthlyBillType | null>(null);
  const [pieChartData, setPieChartData] = useState<AfterMotorBillSplitType[] | []>([]);

  /* getting the latest monthly bil*/
  useEffect(() => {
    if(monthlyBills.length === 0) return
    setLatestMonthlyBill(monthlyBills[0]);
    setPieChartData(monthlyBills[0].tenantsBill);
  }, [monthlyBills]);

  useEffect(() => {
    console.log("latestMonthlyBill", latestMonthlyBill);
  }, [latestMonthlyBill]);

  useEffect(() => {
    console.log("pieChartData", pieChartData);
  }, [pieChartData]);

  useEffect(() => {
    console.log("startDate", startDate);
    console.log("Month", startDate?.getMonth());
    console.log("Year", startDate?.getFullYear());
  }, [startDate]);

  useEffect(() => {
    console.log("endDate", endDate);
  }, [endDate]);

  useEffect(() => {
    console.log("readings: ", readings);
  }, [readings]);

  useEffect(() => {
    console.log("currentMonthBill: ", currentMonthBill);
  }, [currentMonthBill]);

  function handleAddNewReading(){
    setReadings(prevReadings => [
      ...prevReadings,
      {oldReading: "", newReading: "", tenantId: "", firstName: "", lastName: ""}
    ]);
  }

  function handleCurrentMonthBill(event: ChangeEvent<HTMLInputElement>) {
    setCurrentMonthBill(Number(event.target.value));
  }

  function handleSelectTenant(index:number, value:string){
    const selectedTenant = tenants.find(tenant=> tenant.id === value);
    setReadings(prevReadings => {
      const tempReadings = [...prevReadings];
      tempReadings[index].tenantId = value;
      tempReadings[index].firstName = selectedTenant?.firstName;
      tempReadings[index].lastName = selectedTenant?.lastName;
      return tempReadings;
    })
  }

  function handleReadingInputChange(event: ChangeEvent<HTMLInputElement>, index:number){
    const {name, value} = event.target;
    if (!/^\d*$/.test(value)) {
      /* TODO: throw error and show in the ui (characters in number field)*/
      return;
    }
    setReadings(prevReadings => {
      const tempReadings = [...prevReadings];
      tempReadings[index] = {
        ...tempReadings[index],
        [name]: value === "" ? "" : Number(value),
      }
      return tempReadings;
    })
  }

  function handleResetFields(){
    setReadings([{oldReading: "", newReading: "", tenantId: "", firstName: "", lastName: ""}])
    setStartDate(undefined);
    setEndDate(undefined);
    setCurrentMonthBill("");
  }

  async function handleSubmit(){

    /* validating fields */
    let hasEmptyFields = false;

    /* validating tenants fields */
    hasEmptyFields = readings.some((reading)=>(
      reading.tenantId === "" ||
      reading.newReading === "" ||
      reading.oldReading === "" ||
      reading.firstName === "" ||
      reading.lastName === ""
    ))

    /* validating user | dates field | currentMonthlyBill */
    if(!user || startDate === undefined || endDate === undefined || currentMonthBill === "" || hasEmptyFields){
      /* TODO: throw error and display on UI */
      console.log("has empty fields!");
      return;
    }
    /* narrow down types */
    let totalUnitsConsumed = 0;
    const uid = user.uid;
    const start = startDate;
    const end= endDate;

    const beforeMotorBillSplit: BeforeMotorBillSplitType[] = readings.map((reading) => {
      const unitsConsumed = Number(reading.newReading) - Number(reading.oldReading);
      totalUnitsConsumed += unitsConsumed;
      const totalUnitsBill = unitsConsumed * 12;
      const tenantBill = {...reading as Omit<BeforeMotorBillSplitType, "unitsConsumed" | "totalUnitsBill">, unitsConsumed, totalUnitsBill};
      console.log("tenantBill: ", tenantBill);
      return tenantBill;
    })

    const remainingBill = Number(currentMonthBill) - (totalUnitsConsumed * 12) ;
    const motorBillPerTenant = remainingBill / (beforeMotorBillSplit.length + 1);
    const afterMotorBillSplit = beforeMotorBillSplit.map((reading) => {
      return {...reading, finalBill: reading.totalUnitsBill + motorBillPerTenant};
    })

    console.log("beforeMotorBillSplit: ", beforeMotorBillSplit);
    console.log("afterMotorBillSplit: ", afterMotorBillSplit);

    const monthlyBill = {
      ownerId: uid,
      month: start.getMonth(),
      year: start.getFullYear(),
      startDate: start.toLocaleDateString(),
      endDate: end.toLocaleDateString(),
      totalMonthBill: Number(currentMonthBill),
      ownerBillSplit: motorBillPerTenant,
      tenantsBill: [...afterMotorBillSplit],
    }

    try{
      /* add data to firestore */
      await addMonthlyBill(monthlyBill);
      /* get latest data from firestore */
      await fetchMonthlyBills();
      handleResetFields();
    }catch(error){
      console.error(error);
    }
  }

  return (
    // <div className="flex-grow flex flex-col sm:flex-row w-full gap-4">
    <div className="flex-grow grid md:grid-cols-[minmax(19rem,21rem)_2fr] w-full gap-4">
      {/* first card*/}
      <Readings>
        <Readings.Header>Calculator</Readings.Header>
        <Readings.Body>
          <div className="grid grid-cols-2 gap-3">
            <Readings.DatePicker label={"Start Date"} date={startDate} setDate={setStartDate}/>
            <Readings.DatePicker label={"End Date"} date={endDate} setDate={setEndDate}/>
          </div>

          <Readings.Input value={currentMonthBill} onChange={handleCurrentMonthBill}>Current month bill</Readings.Input>

          <div className="flex flex-col gap-4">
            {readings.map((_, index) => {
                return (
                  <Readings.Reading key={index} index={index}>
                    <Select value={readings[index].tenantId} onValueChange={(value)=>handleSelectTenant(index, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tenant name" />
                      </SelectTrigger>
                      <SelectContent>
                        {tenants.map((tenant, tenantIndex) => (
                            <SelectItem key={tenantIndex} value={`${tenant.id}`}>{`${tenant.firstName} ${tenant.lastName}`}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-3">
                      <Readings.ReadingInput readingType="old" index={index} readings={readings} onChange={handleReadingInputChange}/>
                      <Readings.ReadingInput readingType="new" index={index} readings={readings} onChange={handleReadingInputChange}/>
                    </div>
                  </Readings.Reading>
                )
            })}
          </div>

          {/* add new reading button */}
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" className="bg-card flex gap-1 cursor-pointer p-0" onClick={handleAddNewReading}><Plus/> New reading</Button>
          </div>
          <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
        </Readings.Body>
      </Readings>

      {/* the second card goes here */}
      <div className="flex flex-col w-full gap-4 min-w-0">
        {/* pie chart */}
        <>
          {monthlyBillsLoading && <h1>loading...</h1>}
          <ResultChart latestMonthlyBill={latestMonthlyBill}/>
        </>
        {/* table goes here */}
        <ResultTable latestMonthlyBill={latestMonthlyBill}/>
      </div>
    </div>
  )
}
export default Calculator

/*
* TODO:
*  [] create table
*  [] write re-fetch + re-cache logic
*
*  [x] create pie chart
* */