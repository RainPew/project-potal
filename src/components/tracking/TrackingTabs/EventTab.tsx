import { FunctionComponent, memo, useCallback, useState } from "react";
import styled from "@emotion/styled";
import { IconNames } from "@blueprintjs/icons";
import { Timeline } from "antd";
import { MessageContent, MessageDetail, Typography } from "../TrackingInfo";
import { Sort, SortContainer, SortText } from "./StopsTab";
import { format } from "date-fns";
import { isEmpty } from "lodash";
import { useTrackingDetails } from "../Detail";

const Container = styled.div``;
interface EventItemProps {
  item: any;
  lastItem?: boolean;
}

const EventItem: FunctionComponent<EventItemProps> = memo(
  ({ item = {}, lastItem = false }) => {
    const TimelineItem = styled(Timeline.Item)`
      .ant-timeline-item-tail {
        ${lastItem ? "border-left: none;" : ""}
      }
      ${lastItem ? "padding-bottom: 0" : ""}
    `;

    const title = item["@UserName"];

    return (
      <TimelineItem
        color="blue"
        dot={
          <TimelineDot
            type={title && typeof title === "string" ? title?.charAt(0) : "N"}
          />
        }
        data-testid="tracking-detail-events-item"
      >
        <MessageContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              {item["@EventType"]}
              {!isEmpty(title) && " - "}
              {title}
            </Typography>
            <Typography>
              {item["@EventDateTime"] &&
                format(new Date(item["@EventDateTime"]), "MMMM d, p")}
            </Typography>
          </div>
          <MessageDetail>{item["@Note"]}</MessageDetail>
        </MessageContent>
      </TimelineItem>
    );
  }
);

const TimelineDot = memo(
  ({
    type,
    color = "blue",
    background = "#ECEDFE",
  }: {
    type: string;
    color?: string;
    background?: string;
  }) => {
    const Dot = styled.h5`
      color: ${color};
      text-transform: uppercase;
      margin: 0;
    `;

    const DotContainer = styled.div`
      background: ${background};
      border-radius: 6px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    return (
      <DotContainer>
        <Dot>{type}</Dot>
      </DotContainer>
    );
  }
);

interface EventTabProps {}

const EventTab: FunctionComponent<EventTabProps> = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orderEvents = useTrackingDetails()?.orderEvents || [];
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const toggleSort = useCallback(() => {
    setSort((sort) => (sort === "asc" ? "desc" : "asc"));
  }, [setSort]);

  const events = sort === "asc" ? [...orderEvents] : [...orderEvents].reverse();

  return (
    <Container data-testid="tracking-detail-events">
      <SortContainer>
        <Sort
          rightIcon={IconNames.CaretDown}
          outlined
          onClick={toggleSort}
          data-testid="tracking-detail-events-sort"
        >
          <SortText>Show {sort !== "asc" ? "latest" : "oldest"} first</SortText>
        </Sort>
      </SortContainer>
      <Timeline>
        {events.map((event: any = {}, index: number) => (
          <EventItem
            key={event["@OrderEventID"]}
            item={event}
            lastItem={index === events.length - 1}
          />
        ))}
      </Timeline>
    </Container>
  );
};

export default memo(EventTab);
