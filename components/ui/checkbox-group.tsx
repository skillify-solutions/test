import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface CheckboxGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  register: any;
  errors?: any;
  required?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ name, label, options, register, errors, required = false, className, columns = 3, ...props }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3"
    };

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className={cn("grid gap-3", gridCols[columns])}>
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={option.value}
                {...register(name)}
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {errors && errors[name] && (
          <span className="text-sm text-red-500">{errors[name].message}</span>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
