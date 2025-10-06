import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

export interface SelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  register: any;
  errors?: any;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, label, options, register, errors, placeholder, required = false, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="relative">
          <select
            ref={ref}
            {...register(name)}
            className={cn(
              "flex h-10 w-full rounded-full border border-gray-300 bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500 appearance-none cursor-pointer"
            )}
          >
            <option value="">{placeholder || "Select option"}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {errors && errors[name] && (
          <span className="text-sm text-red-500">{errors[name].message}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };