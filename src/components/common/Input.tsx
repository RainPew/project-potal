import styled from "@emotion/styled";
import clsx from "clsx";
import React, { forwardRef, useMemo, useState } from "react";
import { Falsey } from "../../types/Falsey";
import { COLORS } from "./Constants";
import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";

type InputProps = {
  children?: Element;
  error?: string | Falsey;
  label?: string | Falsey;
  placeholder?: string | Falsey;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  prompt?: string;
  searchIcon?: boolean;
  disabled?: boolean;
  className?: string;
  rightElement?: any;
  type?: "text" | "password" | "email";
  inputRef?: React.RefObject<HTMLInputElement>;
  dataTestid?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly?: boolean;
} & React.ComponentProps<"input">;
// & React.InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<any, InputProps>(
  (
    {
      error,
      placeholder,
      value,
      onChange,
      name,
      label,
      required = false,
      prompt,
      searchIcon = false,
      disabled = false,
      className,
      rightElement,
      type = "text",
      inputRef,
      dataTestid,
      onBlur,
      readonly = false,
      ...rest
    },
    _ref
  ) => {
    const [isDirty, setIsDirty] = useState(false);
    const errorRequired = useMemo(() => {
      return required && !value && isDirty ? "Required" : "";
    }, [required, value, isDirty]);

    const computedError: string = useMemo(() => {
      return error || errorRequired;
    }, [error, errorRequired]);

    return (
      <div className={className} data-testid="input">
        {label && <FormLabel htmlFor={name} label={label} />}
        {prompt && <Prompt>{prompt}</Prompt>}
        <div className="relative">
          {searchIcon && (
            <SearchIcon
              className={clsx(
                `absolute left-2 top-[6px]`,
                value ? " fill-[#102a47] " : " fill-[#8da4be]"
              )}
            />
          )}
          <StyledInput
            data-testid={dataTestid || name}
            {...rest}
            readOnly={readonly}
            ref={inputRef}
            disabled={disabled}
            name={name}
            id={name}
            iserror={!!computedError ? "true" : "false"}
            padding={searchIcon ? "5px 9px 5px 31px" : "5px 9px"}
            autoComplete="off"
            value={value}
            onChange={(e) => {
              setIsDirty(true);
              onChange && onChange(e);
            }}
            onBlur={onBlur}
            placeholder={placeholder || ""}
            type={type}
          />
          {rightElement && (
            <div className="absolute right-2 top-2">{rightElement}</div>
          )}
        </div>

        {computedError && <FormError errorMessage={computedError} />}
      </div>
    );
  }
);

export { Input };

const StyledInput = styled.input<{
  iserror: "true" | "false";
  padding: string;
}>`
  transition: border 0.3s, box-shadow 0.3s;
  background: #ffffff;
  border: ${(props) =>
    props.iserror === "true"
      ? `1px solid ${COLORS.ErrorColor124}`
      : `1px solid ${COLORS.BorderColor4DF}`};

  box-shadow: 0px 1px 1px 0 rgba(44, 58, 110, 0.06);
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.25;
  text-align: justify;
  color: ${COLORS.DarkestGreyA47};
  padding: ${(props) => props.padding};
  &::placeholder {
    color: ${COLORS.PlaceholderColor4BEMediumGrey};
  }
  width: 100%;
  &:focus {
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

  &[disabled] {
    background: #f4f5f7;
  }
`;

const Prompt = styled.div`
  background-color: #99ee11;
  padding: 2px 6px;
`;

const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 2C12.0899 2 15 4.91015 15 8.5C15 9.89763 14.5589 11.1922 13.8083 12.2522L16.6038 15.0477C17.0453 15.4892 17.0353 16.215 16.5815 16.6689C16.1276 17.1227 15.4018 17.1327 14.9603 16.6912L12.149 13.8799C11.1087 14.5869 9.85259 15 8.5 15C4.91015 15 2 12.0899 2 8.5C2 4.91015 4.91015 2 8.5 2ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z"
      />
    </svg>
  );
};
