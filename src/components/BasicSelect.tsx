import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

interface DynamicSelectProps {
  value: string;
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function BasicSelect({
  value,
  options = [],
  placeholder = "Select an option",
  onChange,
}: DynamicSelectProps) {
  return (
    <Select key={value} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-7 lg:h-9 text-xs lg:text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
