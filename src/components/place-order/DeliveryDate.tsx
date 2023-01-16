import styled from "@emotion/styled";
import {
  compareAsc,
  getDate,
  getHours,
  getMinutes,
  startOfToday,
} from "date-fns";
import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";
import { toastError } from "../../utils/toast";
import { DatePicker } from "../common/DateTimePicker/DatePicker";
import { TimePicker } from "../common/DateTimePicker/TimePicker";
import { IFormPlaceOrder, usePlaceOrder } from "./PlaceOrderProvider";
import { Section } from "./Section";
import { useDeliveryDateSectionConfigs } from "./useDeliveryDateSectionConfigs";

interface DeliveryDateProps {
  children?: Element;
}

const checkTimeAfterCurrent = (date: Date) => {
  const currentHour = getHours(new Date());
  const currentMinute = getMinutes(new Date());
  const selectedHour = getHours(date);
  const selectedMinute = getMinutes(date);
  if (selectedHour > currentHour) {
    return true;
  }
  if (selectedHour < currentHour) {
    return false;
  }
  if (selectedHour === currentHour && selectedMinute < currentMinute) {
    return false;
  }
  return true;
};

const DeliveryDate: React.FC<DeliveryDateProps> = () => {
  const { control, setValue } = usePlaceOrder().formState || {};
  const { data, error, loading } = useDeliveryDateSectionConfigs();

  const deliveryDate = useWatch<IFormPlaceOrder>({
    control,
    name: "delivery_date",
  });

  const deliveryTime = useWatch<IFormPlaceOrder>({
    control,
    name: "delivery_time",
  });

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current: Date) => {
    if (!current) {
      return false;
    }
    const start = startOfToday();
    return compareAsc(current, start) === -1;
  };

  const selectedCurrentDate = useMemo(() => {
    if (!deliveryDate) {
      return false;
    }
    const currentDay = getDate(new Date());
    const daySelected = getDate(deliveryDate);
    if (currentDay === daySelected) {
      return true;
    }
    return false;
  }, [deliveryDate]);

  const disabledHours = useCallback(() => {
    if (!selectedCurrentDate) {
      return [];
    }
    const hours = [];
    const currentHour = getHours(new Date());

    for (let i = 0; i < currentHour; i++) {
      hours.push(i);
    }

    return hours;
  }, [selectedCurrentDate]);

  const disabledMinutes = useCallback(
    (selectedHour: any) => {
      if (!selectedCurrentDate) {
        return [];
      }
      const minutes = [];
      const currentMinute = getMinutes(new Date());
      if (selectedHour === getHours(new Date())) {
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i);
        }
      }
      return minutes;
    },
    [selectedCurrentDate]
  );

  const disabledTime = useCallback(() => {
    return {
      disabledHours,
      disabledMinutes,
    };
  }, [disabledHours, disabledMinutes]);

  const onChangeTime = useCallback(
    ({ value, onChange }: { value: Date | null; onChange: any }) => {
      if (!selectedCurrentDate || !value) {
        onChange(value);
        return;
      }
      const isTimeAfterCurrent = checkTimeAfterCurrent(value);

      if (isTimeAfterCurrent) {
        onChange(value);
      } else {
        toastError("Please select a time after current time");
      }
    },
    [selectedCurrentDate]
  );

  useEffect(() => {
    if (!setValue) {
      return;
    }
    if (!selectedCurrentDate) {
      return;
    }
    if (!deliveryDate || !deliveryTime) {
      return;
    }
    const isTimeAfterCurrent = checkTimeAfterCurrent(deliveryTime);
    if (!isTimeAfterCurrent) {
      setValue("delivery_time", new Date());
    }
  }, [deliveryDate, deliveryTime, selectedCurrentDate, setValue]);

  useEffect(() => {
    if (!setValue) {
      return;
    }

    if (!data) {
      return;
    }

    const { ReadyTimeUnassign } = data;
    if (ReadyTimeUnassign) {
      setValue("delivery_time", null);
    }
  }, [data, setValue]);

  if (!!error || !!loading || !data) {
    return null;
  }

  return (
    <Section
      body={
        <BodySectionContainer>
          <div>
            <Controller
              name="delivery_date"
              control={control}
              rules={{
                required: { value: true, message: "This is required" },
              }}
              render={({
                field: { value, onChange, name },
                fieldState: { error },
              }) => {
                return (
                  <DatePicker
                    label="Ready by Date"
                    error={error?.message || ""}
                    name={name}
                    disabled={false}
                    selected={value}
                    onChange={(date: any) => {
                      onChange(date);
                    }}
                    disabledDate={disabledDate}
                  />
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="delivery_time"
              control={control}
              rules={{
                required: { value: true, message: "This is required" },
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => {
                return (
                  <TimePicker
                    error={error?.message || ""}
                    name={name}
                    label="Ready by Time"
                    onChange={(abc) => {
                      onChangeTime({ value: abc, onChange });
                    }}
                    value={value}
                    disabledTime={disabledTime}
                  />
                );
              }}
            />
          </div>
        </BodySectionContainer>
      }
      hasButtonCollapse
      title="Order Ready By"
    />
  );
};

export { DeliveryDate };
export const Label = styled.label`
  font-size: 15px;
  line-height: 20px;
  text-align: justify;
  color: #394048;
  display: block;
  margin-bottom: 4px;
`;

export const BodySectionContainer = styled.div<{
  custom?: string;
}>`
  display: grid;
  gap: 16px;
  width: 100%;
  ${(props) => props.custom || `grid-template-columns: 1fr 1fr;`};
`;
