import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, H5, H6, Icon, Intent, MaybeElement } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { IconNames } from "@blueprintjs/icons";
import { Timeline } from "antd";
import { StatusTag } from "../TrackingInfo";
import { BlueprintIcons_16Id } from "@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16";
import Avatar from "react-avatar";
import { format } from "date-fns";
import { useTrackingDetails } from "../Detail";

const Container = styled.div``;

export const SortContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Sort = styled(Button)`
  border: none !important;
  margin-left: auto;
`;

export const SortText = styled(H5)`
  font-size: 13px;
  line-height: 15px;
  color: #102a47;
  margin-bottom: 0;
`;

const StopContainer = styled.div`
  position: relative;
`;

const StopStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StopStatusTime = styled.p`
  font-size: 13px;
  line-height: 15px;
  color: #8da4be;
  margin-bottom: 0;
`;

const StopContent = styled.div`
  background: #ffffff;
  border: 1px solid #cbd0df;
  border-radius: 6px;
  padding: 12px;
  margin-top: 8px;
`;

const StopID = styled(H6)`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  color: #102a47;
  margin-bottom: 4px;
`;

const StopDescription = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #102a47;
  margin-bottom: 24px;
`;

const StopPiece = styled(StopID)``;

const StopPieceDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StopPieceDetailItem = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #102a47;
  margin-bottom: 0;
`;

const CustomAvatar = styled(Avatar)`
  position: absolute;
  right: 0;
  border-radius: 6px;
  margin-right: 12px;
  img {
    border-radius: 6px;
  }
`;

const ShowMore = styled(Button)`
  margin-top: 22px;
`;

const ShowMoreText = styled(H5)`
  margin-bottom: 0px;
  font-size: 16px;
  line-height: 20px;
  color: #102a47;
`;

const TimelineDot = memo(
  ({
    type,
    color = "blue",
    background = "#ECEDFE",
  }: {
    type: BlueprintIcons_16Id | MaybeElement;
    color?: string;
    background?: string;
  }) => {
    const Dot = styled(Icon)`
      color: ${color};
      text-transform: uppercase;
      margin: 0;
    `;

    const DotContainer = styled.div`
      background: ${background};
      border-radius: 6px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    return (
      <DotContainer>
        <Dot icon={type} />
      </DotContainer>
    );
  }
);

export const getStopColor = (status: string) => {
  let color: any = Intent.NONE;
  const statusObj: any = {
    "P.C": Intent.SUCCESS,
    "D.C": Intent.SUCCESS,
  };
  color = statusObj[status] || Intent.NONE;
  return color;
};

const getIcon = (type: string) => {
  let icon: any;
  switch (type) {
    case "L":
      icon = IconNames.MapMarker;
      break;

    case "C":
      icon = IconNames.Tick;
      break;
    default:
      icon = IconNames.Minus;
      break;
  }
  return icon;
};

export const getStatus = (type: string) => {
  let status: string = "";
  if (type?.charAt(0) === "P") status = "PICK UP";
  if (type?.charAt(0) === "D") status = "DROP OFF";
  if (type?.charAt(0) === "B") status = "BOTH";
  switch (type) {
    case "P.C":
      status = "PICKED UP";
      break;

    case "D.C":
      status = "DROPPED OFF";
      break;
    case "B.":
      status = "BOTH";
      break;
  }
  return status;
};

interface StopItemProps {
  imageSrc?: string;
  lastItem?: boolean;
  firstItem?: boolean;
  current?: boolean;
  item: any;
  showMore?: boolean;
  stopLength?: number;
  lastItemStatus?: string;
  onToogleShowMore?: () => void;
}

const StopItem: FunctionComponent<StopItemProps> = memo(
  ({
    imageSrc,
    lastItem = false,
    firstItem = false,
    current = false,
    item = {},
    showMore = false,
    stopLength = 0,
    onToogleShowMore = () => {},
    lastItemStatus = null,
  }) => {
    const jobStopsLastestItem = item?.JobStops[item?.JobStops.length - 1] || {};

    const type = item["@StopType"];
    const status = jobStopsLastestItem["@JobStopStatus"];
    const stopID = item["@StopID"];
    const address = item["@Address"];
    const city = item["@City"];
    const state = item["@State"];
    const zip = item["@Zip"];
    const tz = item["@ScheduledDateTimeTZ"];
    const timeline = status === "C" ? "solid" : "dashed";
    const timelineColor = status === "C" ? "#25A567" : "#576F8B";
    const TimelineItem = styled(Timeline.Item)`
      .ant-timeline-item-tail {
        border-left: ${lastItem ? "none" : `2px ${timeline} ${timelineColor}`};
        ${firstItem &&
        !lastItem &&
        !showMore &&
        lastItemStatus !== "C" &&
        status === "C" &&
        `
                    border-image: linear-gradient(to bottom, #25A567, #8DA4BD 65%) 1 100%;
                    &:after {
                        content: " ";
                        border-left: 2px dashed #fff;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        margin-left: -2px;
                        height: 40%;
                    }
                `}
      }
      ${lastItem ? "padding-bottom: 0" : ""}
    `;
    const pieces = item?.JobStops?.reduce((prev: any[], current: any) => {
      prev.push(...(current?.JobStopPieces?.JobStopPiece || []));
      return prev;
    }, [])?.filter((d: any) => d);

    return (
      <TimelineItem
        color="blue"
        dot={
          <TimelineDot
            type={getIcon(current ? "L" : status)}
            background={status === "C" ? "#E9F6F0" : "#F4F5F7"}
            color={status === "C" ? "#25A567" : "#576F8B"}
          />
        }
      >
        <StopContainer data-testid="tracking-detail-stops-item">
          <StopStatus>
            <StatusTag
              large
              minimal
              interactive
              intent={getStopColor(`${type}.${status}`)}
              data-testid="tracking-detail-stops-item-status"
            >
              {getStatus(`${type}.${status || ""}`)}
            </StatusTag>
            <StopStatusTime>
              {item["@ScheduledDateTime"] &&
                format(new Date(item["@ScheduledDateTime"]), "MMMM d, Y")}{" "}
              <b>
                {item["@ScheduledDateTime"] &&
                  format(new Date(item["@ScheduledDateTime"]), "p ")}
                {tz}
              </b>
            </StopStatusTime>
          </StopStatus>
          <StopContent>
            {imageSrc && <CustomAvatar src={imageSrc} size="80" />}
            <StopID>Stop #{stopID}</StopID>
            <StopDescription>
              {address}, {city}, {state} {zip}
            </StopDescription>
            {pieces.map((piece: any) => (
              <StopPiece key={piece["@PieceID"]}>
                Piece #{piece["@PieceID"]}
              </StopPiece>
            ))}
            <StopPieceDetail>
              <StopPieceDetailItem>
                <b>Due by</b>{" "}
                {jobStopsLastestItem["@ScheduledDateTime"] &&
                  `${format(
                    new Date(jobStopsLastestItem["@ScheduledDateTime"]),
                    "M/d/Y p "
                  )}${tz}`}
              </StopPieceDetailItem>
              {(type === "P" || status === "C") && (
                <StopPieceDetailItem>
                  <b>{type === "P" ? "Picked up" : "Dropped off"}</b>{" "}
                  {jobStopsLastestItem["@ArriveDateTime"] &&
                    `${format(
                      new Date(jobStopsLastestItem["@ArriveDateTime"]),
                      "M/d/Y p "
                    )}${tz}`}
                </StopPieceDetailItem>
              )}
            </StopPieceDetail>
          </StopContent>
          {firstItem && stopLength > 2 && (
            <ShowMore
              icon={showMore ? IconNames.Minus : IconNames.Plus}
              onClick={onToogleShowMore}
            >
              <ShowMoreText>
                {showMore
                  ? "Show only Pickup and Dropoff"
                  : `Show ${stopLength - 2} more stops`}
              </ShowMoreText>
            </ShowMore>
          )}
        </StopContainer>
      </TimelineItem>
    );
  }
);

interface StopsTabProps {}

const StopsTab: FunctionComponent<StopsTabProps> = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Stops = useTrackingDetails()?.stops || [];
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(!(Stops?.length > 2));
  }, [Stops, setShowMore]);

  const toggleShowMore = useCallback(() => {
    setShowMore((showMore: boolean) => !showMore);
  }, [setShowMore]);

  const toggleSort = useCallback(() => {
    setSort((sort) => (sort === "asc" ? "desc" : "asc"));
  }, [setSort]);

  const stops = Stops.sort((a: any, b: any) => {
    const timeA = new Date(a["@ScheduledDateTime"])?.getTime();
    const timeB = new Date(b["@ScheduledDateTime"])?.getTime();
    return sort === "asc" ? timeA - timeB : timeB - timeA;
  }).filter(
    (_stop: any, index: number) =>
      showMore || index === 0 || index === Stops.length - 1
  );

  const lastItem = stops[stops.length - 1] || { JobStops: [] };
  const jobStopsLastestItem =
    lastItem?.JobStops[lastItem?.JobStops.length - 1] || {};

  return (
    <Container data-testid="tracking-detail-stops">
      <SortContainer>
        <Sort rightIcon={IconNames.SORT_DESC} outlined onClick={toggleSort}>
          <SortText data-testid="tracking-detail-stops-sort">
            Show {sort !== "asc" ? "latest" : "oldest"} first
          </SortText>
        </Sort>
      </SortContainer>
      <Timeline>
        {stops.map((stop: any, index: number) => (
          <StopItem
            key={stop["@StopID"]}
            firstItem={index === 0}
            lastItem={index === stops.length - 1}
            showMore={showMore}
            stopLength={Stops.length}
            item={stop}
            current={
              (sort === "asc" && index === stops.length - 1) ||
              (sort === "desc" && index === 0)
            }
            onToogleShowMore={index === 0 ? toggleShowMore : undefined}
            lastItemStatus={jobStopsLastestItem["@JobStopStatus"]}
          />
        ))}
      </Timeline>
    </Container>
  );
};

export default memo(StopsTab);
