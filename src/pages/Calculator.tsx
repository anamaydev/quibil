import {useState, useEffect} from "react";
import Readings from "@/components/Readings.tsx";

const Calculator = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    console.log("StartDate", startDate);
  }, [startDate]);

  useEffect(() => {
    console.log("StartDate", endDate);
  }, [endDate]);

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
        </Readings.Body>
      </Readings>
      {/* the second card goes here */}
    </div>
  )
}
export default Calculator
