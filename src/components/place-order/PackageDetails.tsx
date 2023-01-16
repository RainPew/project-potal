import React from "react";
import { Controller } from "react-hook-form";
import { fromEnumToOptions } from "../../utils/generals";
import { bps } from "../common/Constants";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { BodySectionContainer } from "./DeliveryDate";
import { usePlaceOrder } from "./PlaceOrderProvider";
import { Section } from "./Section";
import { SwitchCustom } from "./stops-section/StopItem/StopItemDetail";

interface PackageDetailsProps {}

enum EDeliveryServiceType {
  "SAME_DAY" = "Same-day delivery",
}

enum EPackageType {
  "BOX SMALL" = "Box (Small)",
  "BOX BIG" = "Box (Big)",
}

enum EVehicle {
  "Motocycle" = "Motocycle",
  "Bicycle" = "Bicycle",
}

const PackageDetails: React.FC<PackageDetailsProps> = () => {
  const { control } = usePlaceOrder().formState || {};

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

          .description-container, .address-books-container {
            grid-column: 1 / span 2;
          }
        }
        @media (min-width: ${bps["xl"]}px) {

        }
        @media (min-width: ${bps["2xl"]}px) {

        }
      `}
        >
          <Controller
            name="deliveryServiceType"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <Select
                  label="Delivery Service type"
                  name="deliveryServiceType"
                  error={error?.message || ""}
                  placeholder="Select service type"
                  options={fromEnumToOptions(EDeliveryServiceType)}
                  value={value}
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                />
              </div>
            )}
          />
          <Controller
            name="packageType"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <Select
                  label="Package type (optional)"
                  name="packageType"
                  error={error?.message || ""}
                  placeholder="Select package type"
                  options={fromEnumToOptions(EPackageType)}
                  value={value}
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                />
              </div>
            )}
          />
          <Controller
            name="pieces"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <Input
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="e.g. 3"
                  label="Pieces (<a href='#'>Detail</a>)"
                  error={error?.message || ""}
                  name="input-pieces"
                />
              </div>
            )}
          />
          <Controller
            name="weight"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <Input
                  value={value}
                  readonly
                  name="input-weight"
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="e.g. 5lbs"
                  label="Weight"
                  error={error?.message || ""}
                />
              </div>
            )}
          />
          <Controller
            name="vehicle"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <Select
                  name="vehicle"
                  label="Vehicle"
                  error={error?.message || ""}
                  placeholder="Select vehicle"
                  options={fromEnumToOptions(EVehicle)}
                  value={value}
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                />
              </div>
            )}
          />
          <Controller
            name="declaredvalue"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <Input
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="e.g. 50"
                  label="Declared value"
                  error={error?.message || ""}
                  name="input-declaredvalue"
                />
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="description-container">
                <Input
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Add a description"
                  label="Description (optional)"
                  error={error?.message || ""}
                  name="input-description"
                />
              </div>
            )}
          />
          <Controller
            name="cashondelivery"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="address-books-container">
                <SwitchCustom
                  label="Cash on delivery"
                  large
                  checked={value}
                  onChange={(value) => {
                    onChange(value.currentTarget.checked);
                  }}
                  data-testid="switch-cashondelivery"
                />
              </div>
            )}
          />
        </BodySectionContainer>
      }
      hasButtonCollapse
      title="Package Details"
    />
  );
};

export { PackageDetails, EDeliveryServiceType, EPackageType, EVehicle };
