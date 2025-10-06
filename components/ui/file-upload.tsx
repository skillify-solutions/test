import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

export interface FileUploadProps {
  name: string;
  label: string;
  register: any;
  errors?: any;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ name, label, register, errors, placeholder, required = false, accept, multiple = false, className, ...props }, ref) => {
    const [files, setFiles] = React.useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      setFiles(selectedFiles);
    };

    const removeFile = (index: number) => {
      if (files) {
        const newFiles = Array.from(files);
        newFiles.splice(index, 1);
        const dt = new DataTransfer();
        newFiles.forEach(file => dt.items.add(file));
        setFiles(dt.files);
      }
    };

    return (
      <div className={cn("space-y-2", className)} {...props}>
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-amber-500 transition-colors">
          <input
            ref={ref}
            type="file"
            {...register(name)}
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
            className="hidden"
            id={`file-upload-${name}`}
          />
          <label
            htmlFor={`file-upload-${name}`}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {placeholder || "Click to upload or drag and drop"}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {accept ? `Accepted formats: ${accept}` : "Any file type"}
            </span>
          </label>
        </div>

        {files && files.length > 0 && (
          <div className="space-y-2">
            {Array.from(files).map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {errors && errors[name] && (
          <span className="text-sm text-red-500">{errors[name].message}</span>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
