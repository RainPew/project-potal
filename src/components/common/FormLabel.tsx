import React from "react";

interface FormLabelProps {
  label: string;
  htmlFor: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ label, htmlFor }) => {
  if (!label) {
    return null;
  }
  return (
    <label
      className="text-[15px] leading-[133%] text-048 mb-1 block"
      htmlFor={htmlFor}
      data-testid="form-label"
      dangerouslySetInnerHTML={{__html: label}}
    >
    </label>
  );
};

export { FormLabel };
