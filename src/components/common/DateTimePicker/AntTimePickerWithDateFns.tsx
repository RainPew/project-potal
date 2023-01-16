import * as React from "react";
import { AntDatePickerWithDateFns } from "./AntDatePickerWithDateFns";
import { PickerTimeProps } from "antd/es/date-picker/generatePicker";

export interface TimePickerProps
  extends Omit<PickerTimeProps<Date>, "picker"> {}

export const AntTimePickerWithDateFns = React.forwardRef<any, TimePickerProps>(
  (props, ref) => {
    return (
      <AntDatePickerWithDateFns
        {...props}
        picker="time"
        mode={undefined}
        ref={ref}
      />
    );
  }
);

AntTimePickerWithDateFns.displayName = "TimePicker";
