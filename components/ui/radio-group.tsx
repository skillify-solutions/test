import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface RadioGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  register: any;
  errors?: any;
  required?: boolean;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, label, options, register, errors, required = false, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
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

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
