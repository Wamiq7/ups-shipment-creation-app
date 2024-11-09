"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarInputProps {
  label?: string;
  placeholder?: string;
  onDateChange?: (date: Date | undefined) => void;
}

export function CalendarInput({
  label = "Select Date",
  placeholder = "Pick a date",
  onDateChange,
}: CalendarInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-7 lg:h-9 w-full pl-3 text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
