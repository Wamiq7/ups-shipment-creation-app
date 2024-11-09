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
  options: Option[];
  placeholder?: string;
}

export default function BasicSelect({
  options = [],
  placeholder = "Select an option",
}: DynamicSelectProps) {
  return (
    <Select>
      <SelectTrigger className="w-full text-xs lg:text-lg h-7 lg:h-9">
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
