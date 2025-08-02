import {type ChangeEvent, type JSX} from "react";
import DatePicker from "@/components/DatePicker.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {type ReadingType} from "@/pages/Calculator";
import {onAuthStateChanged} from "firebase/auth";

type ReadingsDatePickerProps = {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

type ReadingsReadingProps = {
  children: JSX.Element[] | JSX.Element;
  index: number;
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
    <div className="flex-grow flex flex-col gap-4 p-3 bg-card rounded-b-md">
      {children}
    </div>
  )
}

Readings.DatePicker = function ReadingsDatePicker({label, date, setDate}:ReadingsDatePickerProps) {
  return (
    <DatePicker label={label} date={date} setDate={setDate}/>
  )
}

Readings.Input = function ReadingsInput({children, value, onChange}: {children: string, value: number|"", onChange: (event: ChangeEvent<HTMLInputElement>) => void}){
  return(
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label>{children}</Label>
      <Input type="number" value={value} onChange={(event)=>onChange(event)}/>
    </div>
  )
}

Readings.Reading = function ReadingsReading({children, index}: ReadingsReadingProps){
  return(
    <div className="flex flex-col gap-3">
      <h3>Tenant {index+1}</h3>
      {children}
    </div>
  )
}

Readings.ReadingInput = function ReadingsReadingInput({readingType, index, readings, onChange}:{readingType:string, index:number, readings:ReadingType[], onChange: (event:ChangeEvent<HTMLInputElement>, index: number)=> void}) {
  const readingValue = readingType === "new"
    ? readings[index].newReading
    : readings[index].oldReading;

  return(
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={`${readingType}Reading${index}`} className="px-1">{`${readingType[0].toUpperCase()+readingType.slice(1)} Reading`}</Label>
      <Input
        type="number"
        id={`${readingType}Reading${index}`}
        name={`${readingType}Reading`}
        value={readingValue ?? ""}
        onChange={(event:ChangeEvent<HTMLInputElement>) => onChange(event, index)}
      />
    </div>
  )
}