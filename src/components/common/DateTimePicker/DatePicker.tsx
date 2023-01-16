import styled from "@emotion/styled";
import clsx from "clsx";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Falsey } from "../../../types/Falsey";
import { COLORS, Constants } from "../Constants";
import { FormLabel } from "../FormLabel";
import { AntDatePickerWithDateFns } from "./AntDatePickerWithDateFns";

interface DatePickerProps {
  label: string | Falsey;
  name: string;
  disabled?: boolean;
  selected: Date | null;
  onChange: (date: Date | null, dateString: string) => void;
  className?: string;
  maxDate?: Date | null;
  error: string | Falsey;
  dataTestid?: string;
  disabledDate?: (current: Date) => boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  disabled,
  selected,
  onChange,
  className,
  maxDate,
  name,
  error,
  dataTestid,
  disabledDate,
}) => {
  return (
    <div>
      {label && <FormLabel htmlFor={name} label={label} />}
      <StyledDatePicker
        // @ts-ignore: Unreachable code error
        maxDate={maxDate}
        disabled={disabled}
        className={clsx(disabled ? "bg-[#f5f5f5] " : "bg-white", className)}
        value={selected}
        onChange={onChange}
        // @ts-ignore: Unreachable code error
        dateFormat={Constants.DATE_FORMAT_DISPLAY_DATE_PICKER}
        suffixIcon={suffixIcon}
        name={name}
        id={name}
        iserror={!!error ? "true" : "false"}
        data-testid={dataTestid || name}
        allowClear={false}
        disabledDate={disabledDate}
      />
    </div>
  );
};

export { DatePicker };

const StyledDatePicker = styled(AntDatePickerWithDateFns)<{
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
      d="M12.6251 4.01284C12.7144 4.01284 12.7903 3.98093 12.8528 3.91713C12.9153 3.85333 12.9465 3.77586 12.9465 3.68471L13.0001 3.0625C13.0001 2.69792 12.8751 2.38802 12.6251 2.13281C12.3751 1.8776 12.0715 1.75 11.7144 1.75H10.4287V0.328125C10.4287 0.236979 10.3974 0.159505 10.3349 0.0957031C10.2724 0.0319012 10.1965 0 10.1072 0H9.03582C8.94653 0 8.87064 0.0319012 8.80814 0.0957031C8.74564 0.159505 8.71439 0.236979 8.71439 0.328125V1.75H5.28582V0.328125C5.28582 0.236979 5.25457 0.159505 5.19207 0.0957031C5.12957 0.0319012 5.05368 0 4.96439 0H3.89296C3.80368 0 3.72778 0.0319012 3.66528 0.0957031C3.60278 0.159505 3.57153 0.236979 3.57153 0.328125V1.75H2.28582C1.92868 1.75 1.6251 1.8776 1.3751 2.13281C1.1251 2.38802 1.0001 2.69792 1.0001 3.0625L0.946533 3.68471C0.946533 3.77586 0.977783 3.85333 1.04028 3.91713C1.10278 3.98093 1.17868 4.01284 1.26796 4.01284H12.6251ZM11.7144 14C12.0715 14 12.3751 13.8724 12.6251 13.6172C12.8751 13.362 13.0001 13.0521 13.0001 12.6875V6.3498C13.0001 6.25865 12.9689 6.18118 12.9064 6.11737C12.8439 6.05357 12.768 6.02167 12.6787 6.02167H1.32153C1.23225 6.02167 1.15635 6.05357 1.09385 6.11737C1.03135 6.18118 1.0001 6.25865 1.0001 6.3498V12.6875C1.0001 13.0521 1.1251 13.362 1.3751 13.6172C1.6251 13.8724 1.92868 14 2.28582 14H11.7144Z"
      fill="#8DA4BE"
    />
  </svg>
);
