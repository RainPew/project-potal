import styled from "@emotion/styled";
import React from "react";
import { Falsey } from "../../../types/Falsey";
import { COLORS } from "../Constants";
import { FormLabel } from "../FormLabel";

import { AntTimePickerWithDateFns } from "./AntTimePickerWithDateFns";

interface TimePickerProps {
  name: string;
  value: Date | null | undefined;
  onChange: ((value: Date | null, dateString: string) => void) | undefined;
  error: string | Falsey;
  label: string | Falsey;
  dataTestid?: string;
  disabledTime?: any;
}

const TimePicker: React.FC<TimePickerProps> = ({
  name,
  value,
  onChange,
  error,
  dataTestid,
  label,
  disabledTime,
}) => {
  return (
    <div>
      {label && <FormLabel htmlFor={name} label={label} />}
      <StyledTimePicker
        format="HH:mm"
        id={name}
        name={name}
        data-testid={dataTestid || name}
        className="custom-ant-time-picker"
        // @ts-ignore: Unreachable code error
        popupClassName="custom-ant-time-picker-popup"
        value={value}
        onChange={onChange}
        suffixIcon={suffixIcon}
        iserror={!!error ? "true" : "false"}
        allowClear={false}
        disabledTime={disabledTime}
      />
    </div>
  );
};

export { TimePicker };

const suffixIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7.75 3C7.75 2.58579 7.41421 2.25 7 2.25C6.58579 2.25 6.25 2.58579 6.25 3V7C6.25 7.22258 6.34887 7.43367 6.51986 7.57617L9.51986 10.0762C9.83807 10.3413 10.311 10.2983 10.5762 9.98014C10.8413 9.66193 10.7983 9.18901 10.4801 8.92383L7.75 6.64872V3Z"
      fill="#8DA4BE"
    />
  </svg>
);

const StyledTimePicker = styled(AntTimePickerWithDateFns)<{
  iserror: "true" | "false";
}>`
  box-shadow: 0px 1px 1px rgba(44, 58, 110, 0.06);
  border-radius: 6px;
  height: 32px;
  color: #394048;
  font-size: 16px;
  line-height: 20px;
  padding: 6px 8px;
  width: 100%;

  &.ant-picker-focused {
    border-color: ${(props) =>
      props.iserror === "true"
        ? `${COLORS.ErrorColor124}`
        : `${COLORS.FocusBorderColor}`};
    border-right-width: 1px;
    outline: none;
    box-shadow: ${(props) =>
      props.iserror === "true"
        ? `0 0 0 2px ${COLORS.FocusBoxShadowErrorColor}`
        : `0 0 0 2px ${COLORS.FocusBoxShadowNormalColor}`};

    border: ${(props) =>
      props.iserror === "true"
        ? `1px solid ${COLORS.ErrorColor124}`
        : `1px solid ${COLORS.FocusBorderColor}`};
  }

  &:hover {
    border-color: ${(props) =>
      props.iserror === "true"
        ? `${COLORS.ErrorColor124}`
        : `${COLORS.BorderColor4DF}`};
  }
  &.ant-picker-focused:hover {
    border-color: ${(props) =>
      props.iserror === "true"
        ? `${COLORS.ErrorColor124}`
        : `${COLORS.FocusBorderColor}`};
  }
`;
