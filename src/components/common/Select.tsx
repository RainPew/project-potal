import { CloseCircleFilled } from "@ant-design/icons";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import styled from "@emotion/styled";
import { Select as SelectLib } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import clsx from "clsx";
import React from "react";
import { equalStr } from "../../utils/generals";
import { COLORS } from "./Constants";
import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";
import cls from "./Select.module.css";

type IOption = (BaseOptionType | DefaultOptionType)[] | undefined;

interface SelectProps {
  label: string;
  placeholder: string;
  children?: Element;
  value: any;
  onChange: (e: any) => void;
  options: IOption;
  error: null | undefined | string;
  name: string;
  showSearch?: boolean;
  noborder?: boolean;
  dataTestid?: string;
}

const { Option } = SelectLib;

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  name,
  showSearch = false,
  noborder = false,
  dataTestid,
}) => {
  return (
    <div data-testid="select">
      {label && <FormLabel htmlFor={name} label={label} />}
      <StyledSelectAnt
        noborder={noborder ? "true" : "false"}
        bordered={false}
        showSearch={showSearch}
        onSelect={(m: any, n: any) => {
          onChange(m);
          console.log("aaa ", { m, n });
        }}
        className={cls.antSelectContainer}
        popupClassName={cls.antSelectPopupContainer}
        data-testid={dataTestid || name}
        id={name}
        iserror={!!error ? "true" : "false"}
        value={value || undefined}
        onChange={(a, b) => {
          console.log("aaa a, b", { a, b });
          onChange(a);
        }}
        clearIcon={<CloseCircleFilled width={20} height={20} />}
        placeholder={placeholder}
        suffixIcon={
          noborder ? null : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5956 3.1997C10.2399 2.93321 9.75098 2.93345 9.39555 3.2003L5.39966 6.2003C4.958 6.53188 4.86877 7.15873 5.20035 7.60039C5.53194 8.04206 6.15879 8.13129 6.60045 7.7997L9.99657 5.25L13.4005 7.8003C13.8424 8.13145 14.4692 8.0416 14.8004 7.59961C15.1315 7.15761 15.0417 6.53086 14.5997 6.1997L10.5956 3.1997ZM10.5956 16.8003C10.2399 17.0668 9.75098 17.0665 9.39555 16.7997L5.39966 13.7997C4.958 13.4681 4.86877 12.8413 5.20035 12.3996C5.53194 11.9579 6.15879 11.8687 6.60045 12.2003L9.99657 14.75L13.4005 12.1997C13.8424 11.8686 14.4692 11.9584 14.8004 12.4004C15.1315 12.8424 15.0417 13.4691 14.5997 13.8003L10.5956 16.8003Z"
                fill="#8DA4BE"
              />
            </svg>
          )
        }
      >
        {(options || []).map((option) => {
          return (
            <Option
              value={option.value}
              label={option.label}
              key={option.value}
            >
              <div className={cls.optionWrapper}>
                <div
                  className={clsx(
                    cls.optionContainer,
                    equalStr(option.label, "delete")
                      ? cls.optionContainerDelete
                      : ""
                  )}
                >
                  <div
                    className={clsx(
                      cls.optionLabel,
                      equalStr(option.label, "delete")
                        ? cls.optionLabelDelete
                        : ""
                    )}
                  >
                    {option.label}
                  </div>
                    <div>
                      <Icon className={cls.optionIcon} icon={IconNames.Tick} />
                    </div>
                </div>
              </div>
            </Option>
          );
        })}
      </StyledSelectAnt>
      {error && <FormError errorMessage={error} />}
    </div>
  );
};

const StyledSelectAnt = styled(SelectLib)<{
  iserror: "true" | "false";
  noborder: "true" | "false";
}>`
  appearance: none;
  transition: border 0.3s, box-shadow 0.3s;
  background: #ffffff;

  font-size: 16px;
  line-height: 20px;
  text-align: justify;
  color: ${COLORS["048"]};

  width: 100%;
  min-width: 200px;
  .ant-select-selector {
    border-radius: 6px !important;
    padding: 0px 8px !important;
    border: 1px solid
      ${(props) => {
        if (props.noborder === "true") {
          return "transparent";
        }
        return props.iserror === "true"
          ? COLORS.ErrorColor124
          : COLORS.BorderColor4DF;
      }}!important;
  }
  .ant-select-clear {
    width: 20px;
    height: 20px;
    margin-top: -10px;
    font-size: 12px;
  }
  .ant-select-selection-placeholder {
    color: ${COLORS.MediumGrey};
    font-size: 16px;
  }

  &:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${(props) => {
      if (props.noborder === "true") {
        return "transparent";
      }
      return props.iserror === "true"
        ? COLORS.ErrorColor124
        : COLORS.BorderColor4DF;
    }}!important;
  }
  &.ant-select-focused:not(.ant-select-disabled) .ant-select-selector {
    border-color: ${(props) => {
      if (props.noborder === "true") {
        return "transparent";
      }
      return props.iserror === "true"
        ? COLORS.ErrorColor124
        : COLORS.FocusBorderColor;
    }}!important;
    box-shadow: ${(props) =>
      props.iserror === "true"
        ? `0 0 0 2px ${COLORS.FocusBoxShadowErrorColor}`
        : `0 0 0 2px ${COLORS.FocusBoxShadowNormalColor}`}!important;
  }

  .ant-select-item-option-content {
    border: 1px solid red !important;
  }

  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: red;
  }
`;
