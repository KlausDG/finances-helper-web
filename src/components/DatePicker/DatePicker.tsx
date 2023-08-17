import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

export const DatePicker = React.forwardRef<
  ReactDatePicker,
  ReactDatePickerProps
>((props: ReactDatePickerProps, ref) => {
  return (
    <ReactDatePicker
      ref={ref}
      {...props}
      className="border rounded-md py-2 pl-4 min-w-full"
    />
  );
});
