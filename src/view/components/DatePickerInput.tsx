import { useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";

import { cn } from "../../utils/cn";
import { formatDate } from "../../utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  onChange?(date: Date): void;
  value?: Date;
  className?: string;
  error?: string;
}

export function DatePickerInput({ onChange, value, className, error } : DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date);

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>

        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white text-gray-800 text-left w-full px-3 pt-4 h-[52px] border border-gray-500 rounded-lg focus:border-gray-800 outline-none transition-all relative",
              error && "!border-red-900",
              className,
            )}
          >

            <span className="absolute text-xs text-gray-700 left-[13px] top-2">
              Data
            </span>

            <span className="text-sm">
              { formatDate(selectedDate) }
            </span>

          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleSelectDate} />
        </Popover.Content>

      </Popover.Root>

      { error && (
        <div className="flex gap-2 mt-2 text-red-900 pointer-events-none">
          <CrossCircledIcon/>
          <span className="text-xs">{ error }</span>
        </div>
      ) }
    </div>
  )
}