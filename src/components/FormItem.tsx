import { FormGroup, FormGroupProps } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FunctionComponent, memo } from "react";

const FormItemCustom = styled(FormGroup)`
  .bp4-label {
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: justify;
    color: #394048;
  }

  [for="text-input-save-address"] {
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
`;

interface FormItemProps {
  error?: any;
}

const FormItem: FunctionComponent<FormGroupProps & FormItemProps> = ({
  children,
  error,
  ...props
}) => {
  return (
    <FormItemCustom {...props}>
      {children}
      {error && (
        <p className="mt-1 mb-0 text-xs text-red-600">{error.message}</p>
      )}
    </FormItemCustom>
  );
};

export default memo(FormItem);
