import {type JSX} from "react";
import DatePicker from "@/components/DatePicker.tsx";

type ReadingsDatePickerProps = {
  label: string,
  date: Date | undefined,
  setDate: (date: Date | undefined) => void,
}

const Readings = ({children}: {children: JSX.Element[]}) => {
  return (
    <div className="w-full flex flex-col rounded-xl">
      {children}
    </div>
  )
}
export default Readings

Readings.Header = function ReadingsHeader({children}:{children: JSX.Element | string}) {
  return (
    <div className="p-3 bg-secondary rounded-t-md">
      <h2 className="text-2xl">{children}</h2>
    </div>
  )
}

Readings.Body = function ReadingsBody({children}:{children: JSX.Element[] | JSX.Element}) {
  return (
    <div className="flex-grow p-3 bg-card rounded-b-md">
      {children}
    </div>
  )
}

Readings.DatePicker = function ReadingsDatePicker({label, date, setDate}:ReadingsDatePickerProps) {
  return (
    <DatePicker label={label} date={date} setDate={setDate}/>
  )
}