import { FunctionComponent, memo, useCallback } from "react";
import { Button, H3, H4, H5, Icon, Intent, Tag } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { IconNames } from "@blueprintjs/icons";
import Avatar from "react-avatar";
import { format } from "date-fns";
import { getStatus, getStopColor } from "./TrackingTabs/StopsTab";
import { isEmpty } from "lodash";
import { useTrackingDetails } from "./Detail";

const Container = styled.div`
  padding: 24px;
  flex-grow: 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const Info = styled.div`
  display: flex;
`;

const OrderID = styled(H3)`
  font-size: 20px;
  line-height: 24px;
  text-align: justify;
  color: #102a47;
  margin: auto 4px auto 0px;
`;

export const StatusTag = styled(Tag)`
  background: rgba(250, 84, 94, 0.1);
  mix-blend-mode: normal;
  border-radius: 4px;
  text-transform: uppercase;
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DescriptionContent = styled.div`
  font-size: 13px;
  line-height: 15px;

  display: flex;
  align-items: center;
  text-align: right;
  color: #576f8b;
`;

const FunctionButton = styled.div``;

const FunctionButtonItem = styled(Button)`
  border: none !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #102a47;

  .bp4-heading {
    font-family: "BasierCircle";
  }
`;

const Activity = styled.div`
  background: #ffffff;
  border: 1px solid #cbd0df;
  border-radius: 6px;
  margin-top: 22px;
  padding: 16px;
`;

const ActivityTitle = styled(H4)`
  font-size: 18px;
  line-height: 20px;
  text-align: justify;
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
`;

const Piece = styled.p`
  display: inline;
  margin-right: 16px;
  color: #102a47;
`;

export const Typography = styled.p`
  font-size: 13px;
  line-height: 15px;
  color: #576f8b;
  margin-bottom: 4px;
`;

export const MessageTitle = styled(H5)`
  font-size: 13px;
  line-height: 15px;
  display: flex;
  align-items: center;
  text-align: justify;
  color: #102a47;
`;

export const MessageContent = styled.div`
  background: #f4f5f7;
  border-radius: 6px;
  padding: 8px 12px 8px 8px;
`;

export const MessageDetail = styled(H5)`
  margin-bottom: 0px;
`;

const CustomAvatar = styled(Avatar)`
  border-radius: 6px;
  margin-right: 12px;
  img {
    border-radius: 6px;
  }
`;

const getOrderStatus = (status: string) => {
  const statusObj: any = {
    N: "New",
    Q: "Sent",
    t: "Machine",
    T: "Driver",
    A: "Accepted",
    C: "Completed",
    I: "Invoiced",
    P: "Paid",
    X: "Deleted",
  };
  return statusObj[status] || "";
};

const getOrderColor = (status: string) => {
  const statusObj: any = {
    N: Intent.NONE,
    Q: Intent.SUCCESS,
    t: Intent.SUCCESS,
    T: Intent.SUCCESS,
    A: Intent.SUCCESS,
    C: Intent.SUCCESS,
    I: Intent.SUCCESS,
    P: Intent.SUCCESS,
    X: Intent.WARNING,
  };
  return statusObj[status] || "";
};

interface TrackingInfoProps {
  onClose: () => void;
  reload: () => void;
}

const TrackingInfo: FunctionComponent<TrackingInfoProps> = ({
  onClose,
  reload,
}) => {
  const trackingState = useTrackingDetails();
  const order = trackingState.order || {};
  const orderEvents = trackingState.orderEvents || {};
  const stops = trackingState.stops || {};

  const lastEvent = orderEvents[orderEvents.length - 1] || {};
  const lastStopActivity = stops[stops.length - 1] || { JobStops: [] };

  const address = lastStopActivity["@Address"];
  const city = lastStopActivity["@City"];
  const state = lastStopActivity["@State"];
  const zip = lastStopActivity["@Zip"];
  const tz = lastStopActivity["@ScheduledDateTimeTZ"];

  const jobStopsLastestItem =
    lastStopActivity?.JobStops[lastStopActivity?.JobStops.length - 1] || {};

  const pieces = jobStopsLastestItem?.JobStopPieces?.JobStopPiece || [];

  const type = lastStopActivity["@StopType"];
  const status = jobStopsLastestItem["@JobStopStatus"];

  const eventTitle = lastEvent["@UserName"];

  const orderTimezoneETA = trackingState.timezoneETA;

  const refetch = useCallback(() => {
    reload();
  }, [reload]);

  return (
    <Container data-testid="tracking-detail">
      <Title>
        <Info>
          <OrderID data-testid="tracking-detail-id">
            Order #{order["@OrderID"]}
          </OrderID>
          <StatusTag
            large
            minimal
            interactive
            intent={getOrderColor(order["@OrderStatus"])}
            data-testid="tracking-detail-status"
          >
            {order["@OrderStatus"] === "I" && status === "C"
              ? "Completed"
              : getOrderStatus(order["@OrderStatus"])}
          </StatusTag>
        </Info>
        <CloseIcon
          icon={IconNames.Cross}
          size={20}
          onClick={onClose}
          data-testid="close-button"
        />
      </Title>
      <Description>
        <DescriptionContent>
          <Typography className="bp4-ui-text" data-testid="tracking-detail-eta">
            ETA
            <Icon icon={IconNames.Time} style={{ margin: "0 7px" }} />
            {order["@DueDateTime"] &&
              `${format(
                new Date(order["@DueDateTime"]),
                "MMMM d, Y p "
              )}${orderTimezoneETA}`}
          </Typography>
        </DescriptionContent>
        <FunctionButton>
          <FunctionButtonItem icon={IconNames.Print} outlined onClick={refetch}>
            <MessageDetail>Print</MessageDetail>
          </FunctionButtonItem>
          <FunctionButtonItem
            icon={IconNames.Refresh}
            outlined
            onClick={refetch}
            data-testid="tracking-detail-refresh"
          >
            <MessageDetail>Refresh</MessageDetail>
          </FunctionButtonItem>
        </FunctionButton>
      </Description>
      <Activity>
        <ActivityTitle>Latest activity</ActivityTitle>
        <ActivityInfo>
          <Address>
            <CustomAvatar
              src="https://s3-alpha-sig.figma.com/img/9248/a61f/e6cb3351b6dce85eecbb6f74d558ed86?Expires=1667779200&Signature=aQBfn0w6g9l4LRI-KyhjoQWI8hDRNosQ3TvhDYsTfOijrnsTllCIA8Ye3BjKdlxPWiiZ0rDiOwNxzJ12QE-wKMwu4i~iYQ5g~Qg1o5FE2lu0HiI11pM1065Ii8u6aMLnMDGrTAU~08KEX1BXUKAxVnbGdqxHHU~8ArohlUX7y8zLFpfBdTAqit9ChY2Q1eVCkXIXc6cNa0CnOx9vOCDVpkLGjIjMHyNEGCl-K1zaS38q01N5qL-SqXSZMM4mEHGyDq-zbu072QFCq6YBVaVTagHWlN1h873Fn9518L3erjKqewUadbCsUViBU8H6kwcfI1DxedfSKkmTOQsDx4r4Ew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              size="48"
            />
            <div>
              <Piece data-testid="tracking-detail-latest-activity-address">
                {address}, {city}, {state} {zip}
              </Piece>
              <div data-testid="tracking-detail-latest-activity-pieces">
                {pieces.map((piece: any) => (
                  <Piece key={piece["@PieceID"]}>
                    <b>Piece #{piece["@PieceID"]}</b>
                  </Piece>
                ))}
                <StatusTag
                  large
                  minimal
                  interactive
                  intent={getStopColor(`${type}.${status}`)}
                  data-testid="tracking-detail-latest-activity-status"
                >
                  {getStatus(`${type}.${status || ""}`)}
                </StatusTag>
              </div>
            </div>
          </Address>
          <Typography className="bp4-ui-text">
            {lastStopActivity["@ScheduledDateTime"] &&
              `${format(
                new Date(lastStopActivity["@ScheduledDateTime"]),
                "MMMM d, p "
              )}${tz}`}
          </Typography>
        </ActivityInfo>
        <MessageTitle>Messages and events</MessageTitle>
        <MessageContent data-testid="tracking-detail-latest-activity-event">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              {lastEvent["@EventType"]}
              {!isEmpty(eventTitle) && " - "}
              {eventTitle}
            </Typography>
            <Typography>
              {lastEvent["@EventDateTime"] &&
                format(new Date(lastEvent["@EventDateTime"]), "MMMM d, p")}
            </Typography>
          </div>
          <MessageDetail>
            {lastEvent["@Note"]
              ? lastEvent["@Note"]?.replaceAll(/\{[\d\w-]+\}/g, "")?.trim()
              : ""}
          </MessageDetail>
        </MessageContent>
      </Activity>
    </Container>
  );
};

export default memo(TrackingInfo);
