import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DateTimePickerProps } from "@/lib/types";
import { isValidDate } from "@/lib/utils";

export default function DateTimePicker({
  value,
  onChange,
  mode = "date",
}: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("18:00");

  // ✅ SAFE SYNC
  useEffect(() => {
    if (value && isValidDate(value)) {
      setDate(value);
      setTime(format(value, "HH:mm"));
    }
  }, [value]);

  const handleDateSelect = (selected: Date | undefined) => {
    if (!selected) return;

    let final = new Date(selected);

    if (mode === "datetime") {
      const [h, m] = time.split(":");

      if (!isNaN(Number(h)) && !isNaN(Number(m))) {
        final.setHours(Number(h));
        final.setMinutes(Number(m));
      }
    }

    if (!isValidDate(final)) return;

    setDate(final);
    onChange(final);
  };

  const handleTimeChange = (t: string) => {
    setTime(t);

    if (!date || !isValidDate(date)) return;

    const [h, m] = t.split(":");

    const updated = new Date(date);

    if (!isNaN(Number(h)) && !isNaN(Number(m))) {
      updated.setHours(Number(h));
      updated.setMinutes(Number(m));
    }

    if (!isValidDate(updated)) return;

    onChange(updated);
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date && isValidDate(date) ? format(date, "PPP") : "Pick date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
        </PopoverContent>
      </Popover>

      {mode === "datetime" && (
        <Input
          type="time"
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="w-[120px]"
        />
      )}
    </div>
  );
}
