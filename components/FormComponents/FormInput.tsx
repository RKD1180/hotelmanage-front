import { FC } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  style?: any;
  disabled?: boolean;
  remark?: true | false;
  min?: any;
  max?: any;
  minlength?: any;
  maxlength?: any;
  pattern?: any;
  inputmode?: any;
  step?: number | string;
  onChange?: any;
  value?: any;
  icon?: React.ReactNode;
  inputclass?: string;
  labelclass?: string;
}

type FormInputProps = {
  name: string;
} & InputFieldProps;

const FormInput: FC<FormInputProps> = ({ name, icon, type, ...otherProps }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-between items-start w-full space-y-1 m-0 p-0">
          {otherProps.label && (
            <Label className="flex items-center basis-2/4">
              <div className={`text-menuhover ${otherProps?.labelclass}`}>
                {otherProps.label}
                <span className="text-red-500 pl-1">
                  {otherProps?.remark && "*"}
                </span>
              </div>
            </Label>
          )}
          <div className={`${otherProps.label} relative w-full`}>
            <div
              className={`${
                icon && "flex items-center gap-2 bg-gray-200 rounded px-2"
              }`}
            >
              {icon && icon}
              <FormControl className="m-0 p-0">
                <Input
                  {...field}
                  {...otherProps}
                  type={type}
                  className={`px-2 ${
                    !otherProps.label && "pl-10 w-full mt-2"
                  } ${otherProps.inputclass}`}
                  value={field.value ?? ""} // Ensure the input is always controlled
                  onChange={(e) => {
                    const value =
                      type === "number" && e.target.value !== ""
                        ? +e.target.value // Convert to number
                        : e.target.value.toString();
                    field.onChange(value);
                  }}
                />
              </FormControl>
            </div>
            <FormMessage className="text-sm font-medium text-destructive" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
