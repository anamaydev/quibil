import {useState, useEffect, type ChangeEvent} from "react";
import Readings from "@/components/Readings.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTenantContext} from "@/context/Tenant/useTenantContext.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Plus} from "lucide-react";

type ReadingType = {
  oldReading: number | "";
  newReading: number | "";
  tenantId: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

type TenantBillType = {
  oldReading: number
  newReading: number;
  tenantId: string;
  firstName: string;
  lastName: string;
  elecUnitsConsumed: number;
  elecUnitsBill: number;
}


const Calculator = () => {
  const {tenants} = useTenantContext();
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

  useEffect(() => {
    console.log("startDate", startDate);
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

  function handleSubmit(){
    const combined = readings.map((reading) => {
      if(reading.tenantId === "" || reading.newReading === "" || reading.oldReading === "" || reading.firstName === "" || reading.lastName === "") {
        /*TODO: throw error and show in the ui*/
        console.log("please enter all fields");
        return;
      }
      const elecUnitsConsumed = reading.newReading - reading.oldReading;
      const elecUnitsBill = elecUnitsConsumed * 12;
      const tenantBill = {...reading, elecUnitsConsumed, elecUnitsBill};
      console.log("tenantBill: ", tenantBill);
      return tenantBill;
    })

    console.log("combined: ", combined);
  }

  return (
    <div className="flex-grow flex w-full">
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
                    <Select onValueChange={(value)=>handleSelectTenant(index, value)}>
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
    </div>
  )
}
export default Calculator
