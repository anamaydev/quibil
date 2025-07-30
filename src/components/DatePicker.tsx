import {useState} from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

type DatePickerType = {
  date: Date | undefined,
  setDate: (date: Date | undefined) => void,
}

const DatePicker = ({date, setDate}: DatePickerType) => {
  const [open, setOpen] = useState<boolean>(false);
  // const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="w-full flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Move-In Date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className=" justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default DatePicker
