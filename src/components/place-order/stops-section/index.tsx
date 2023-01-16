import { memo, useCallback } from "react";
import styled from "@emotion/styled";
import StopItem from "./StopItem/StopItem";
import { Timeline } from "antd";
import { useFieldArray } from "react-hook-form";
import { usePlaceOrder } from "../PlaceOrderProvider";

const Container = styled.div`
  left: 270px;
  top: 313px;

  background: #ffffff;
  border: 1px solid #cbd0df;
  box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.06);
  border-radius: 6px;
  padding: 20px;
`;

const StopsSection = () => {
  const { control, getValues } = usePlaceOrder().formState || {};
  const { fields, remove, swap, insert, update } = useFieldArray({
    control,
    name: "stops",
    rules: {
      minLength: {
        value: 2,
        message: "This is required minimum 2 stops",
      },
    },
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      swap(dragIndex, hoverIndex);
    },
    [swap]
  );

  const addStop = useCallback(
    (index: number = 0) => {
      insert(index + 1, {
        StopType: "P",
        edit: true,
      });
    },
    [insert]
  );

  const removeStop = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const resetField = useCallback(
    (index: number) => {
      remove(index);
      insert(index, { edit: true, StopType: "P" });
    },
    [insert, remove]
  );

  const updateField = useCallback(
    (index: number, value: any) => {
      const stops = getValues()?.stops || [];
      const currentVaue = stops[index];
      update(index, { ...currentVaue, ...value });
    },
    [update, getValues]
  );

  return (
    <Container data-testid="place-order-stops-section">
      <Timeline>
        {fields.map((field, index) => (
          <StopItem
            key={field.id}
            id={field.id}
            index={index}
            moveCard={moveCard}
            onAddStop={addStop}
            onRemoveStop={removeStop}
            onResetStop={resetField}
            onUpdateValue={updateField}
            field={field}
            lastItem={index + 1 === fields.length}
          />
        ))}
      </Timeline>
    </Container>
  );
};

export default memo(StopsSection);
