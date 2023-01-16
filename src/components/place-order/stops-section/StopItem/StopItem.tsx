import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { Timeline } from "antd";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { StopItemEdit, StopItemView } from "./StopItemDetail";

const Container = styled.div``;

interface StopItemProps {
  id: any;
  index: number;
  field: any;
  lastItem: boolean;
  onAddStop: (index: number) => void;
  onRemoveStop: (index: number) => void;
  onResetStop: (index: number) => void;
  onUpdateValue: (index: number, value: any) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const ItemTypes = {
  CARD: "card",
};

const StopItem: FunctionComponent<StopItemProps> = ({
  id,
  index,
  field,
  moveCard,
  onAddStop,
  onRemoveStop,
  onResetStop,
  onUpdateValue,
  lastItem = false,
}) => {
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  useEffect(() => {
    setEdit(field?.edit || false);
  }, [field?.edit]);

  const addUnderStop = useCallback(() => {
    onAddStop(index);
  }, [index, onAddStop]);

  const removeStop = useCallback(() => {
    onRemoveStop(index);
  }, [onRemoveStop, index]);

  const resetStop = useCallback(() => {
    onResetStop(index);
  }, [onResetStop, index]);

  const Content = useMemo(() => (edit ? StopItemEdit : StopItemView), [edit]);

  drop(ref);

  const TimelineItem = styled(Timeline.Item)`
    .ant-timeline-item-tail {
      ${lastItem ? "display: none;" : ""}
      border-left: 2px solid #8da4be;
      top: 10px;
      left: 5px;
      height: calc(100% - 20px);
    }
    .ant-timeline-item-head {
      color: #102a47;
    }
  `;

  return (
    <Container
      data-testid="place-order-stops-item"
      style={{ opacity }}
      ref={ref}
      data-handler-id={handlerId}
    >
      <TimelineItem dot={<Icon icon={IconNames.MapMarker} />}>
        <Content
          id={id}
          index={index}
          field={field}
          dragElement={drag}
          onAddStop={addUnderStop}
          onRemoveStop={removeStop}
          onResetStop={resetStop}
          onToogleEdit={() => onUpdateValue(index, { edit: !field?.edit })}
        />
      </TimelineItem>
    </Container>
  );
};

export default memo(StopItem);
