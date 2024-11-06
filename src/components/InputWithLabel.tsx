import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  label: string;
  type?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithLabel({
  label,
  type = "text",
  placeholder = "",
  id,
  value,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className="flex flex-col w-full items-center gap-1.5">
      <Label className="text-c-gray-accent-head" htmlFor={id}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
