import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { bps } from "../common/Constants";
import { Input } from "../common/Input";
import { BodySectionContainer } from "./DeliveryDate";
import { usePlaceOrder } from "./PlaceOrderProvider";
import { Section } from "./Section";

interface OrderReferencesProps {
  children?: Element;
}

const OrderReferences: React.FC<OrderReferencesProps> = () => {
  const { control } = usePlaceOrder().formState || {};
  const { fields } = useFieldArray({
    control,
    name: "references",
    rules: {
      minLength: {
        value: 1,
        message: "This is required",
      },
    },
  });

  const checkValidFormat = (value: string, format: string): any => {
    if (!format || !value) {
      return true;
    }
    let strRegx = format
      .split("")
      .map((o) => {
        return o
          .replaceAll("a", "[a-zA-Z]")
          .replaceAll("n", `[0-9]`)
          .replaceAll("u", "[A-Z]")
          .replaceAll("l", "[a-z]")
          .replaceAll("?", ".");
      })
      .join("");
    strRegx = `^${strRegx}$`;
    const regx = new RegExp(strRegx);
    if (regx.test(value)) {
      return true;
    }
    return (
      <div>
        <p>Not match the format: {format}</p>
        <p>
          a = alpha; n = numeric; u = Uppercase; l = lowercase; ? = Any text
        </p>
      </div>
    );
  };

  return (
    <Section
      body={
        <BodySectionContainer
          custom={`
          grid-template-columns: 1fr;
          @media (min-width: ${bps["sm"]}px) {

          }
          @media (min-width: ${bps["md"]}px) {

          }
          @media (min-width: ${bps["lg"]}px) {
            grid-template-columns: 1fr 1fr;
          }
          @media (min-width: ${bps["xl"]}px) {

          }
          @media (min-width: ${bps["2xl"]}px) {

          }
        `}
        >
          {fields.map((field, index) => {
            return (
              <Controller
                key={field.id}
                control={control}
                name={`references.${index}.reference`}
                rules={{
                  required: { value: true, message: "This is required" },
                  validate: (value) => checkValidFormat(value, field.format),
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div key={field.id}>
                    <Input
                      placeholder="Reference detail"
                      error={error?.message || ""}
                      label={`Reference ${index + 1}`}
                      name={`input-order-reference-${index}`}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  </div>
                )}
              />
            );
          })}
        </BodySectionContainer>
      }
      hasButtonCollapse
      title="Order References"
    />
  );
};

export { OrderReferences };
