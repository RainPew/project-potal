import styled from "@emotion/styled";
import { isArray } from "lodash";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useGetJsonOrderMutation } from "../../generated/graphql";
import DialogTracking, { DialogTrackingRef } from "./DialogTracking";
import MapInfo, { MapInfoDefault } from "./MapInfo";

export interface DetailRef {
  open: (orderNumber: string) => void;
}

export interface TrackingType {
  order: any;
  loading: boolean;
}

export const TrackingContext = createContext<TrackingType>({
  order: null,
  loading: false,
});

export interface TrackingCustomHook {
  stops: any[];
  orderEvents: any[];
  jobStops: any[];
  timezone: string;
  timezoneETA: string;
}

export const useTrackingDetails = (): TrackingType & TrackingCustomHook => {
  const context = useContext(TrackingContext);

  const jobStops = useMemo(() => {
    let jobStops: any = [];
    if (isArray(context?.order?.Jobs?.Job)) {
      jobStops = context?.order?.Jobs?.Job?.JobStops?.JobStop || [];
      context?.order?.Jobs?.Job?.forEach((item: any) => {
        jobStops.push(...(item?.JobStops?.JobStop || []));
      });
    } else {
      jobStops = context?.order?.Jobs?.Job?.JobStops?.JobStop || [];
    }

    jobStops.sort((a: any, b: any) => {
      const timeA = new Date(a["@ScheduledDateTime"])?.getTime();
      const timeB = new Date(b["@ScheduledDateTime"])?.getTime();
      return timeA - timeB;
    });

    return jobStops.map((jobStop: any) => ({
      ...jobStop,
      JobStopPieces: {
        JobStopPiece: jobStop?.JobStopPieces?.JobStopPiece
          ? isArray(jobStop?.JobStopPieces?.JobStopPiece)
            ? jobStop?.JobStopPieces?.JobStopPiece
            : [jobStop?.JobStopPieces?.JobStopPiece]
          : [],
      },
    }));
  }, [context.order]);

  const stops = useMemo(() => {
    const mapJobStops = new Map<string, any[]>();
    jobStops.forEach((jobStop: any) => {
      const mapJobStopsItem = mapJobStops.get(jobStop["@StopID"]) || [];
      mapJobStopsItem.push(jobStop);
      mapJobStops.set(jobStop["@StopID"], mapJobStopsItem);
    });
    const stop = context?.order?.Stops?.Stop;
    const stops = isArray(stop) ? stop : stop ? [stop] : [];

    stops.sort((a: any, b: any) => {
      const timeA = new Date(a["@ScheduledDateTime"])?.getTime();
      const timeB = new Date(b["@ScheduledDateTime"])?.getTime();
      return timeA - timeB;
    });

    return stops.map((stop: any) => {
      const jobStops = mapJobStops.get(stop["@StopID"]) || [];
      return {
        ...stop,
        JobStops: jobStops,
      };
    });
  }, [context.order, jobStops]);

  const orderEvents = useMemo(() => {
    const orderEvents = context?.order?.OrderEvents?.OrderEvent || [];

    orderEvents.sort((a: any, b: any) => {
      const timeA = new Date(a["@EventDateTime"])?.getTime();
      const timeB = new Date(b["@EventDateTime"])?.getTime();
      return timeA - timeB > 0 ? 1 : -1;
    });

    return orderEvents;
  }, [context.order]);

  const tz = useMemo(() => {
    const firstStop =
      stops.find((stop: any = {}) => stop["@StopType"] === "P") || {};
    return firstStop["@ScheduledDateTimeTZ"] || "";
  }, [stops]);

  const tzETA = useMemo(() => {
    const firstStop =
      [...stops]
        .reverse()
        .find((stop: any = {}) => stop["@StopType"] === "D") || {};
    return firstStop["@ScheduledDateTimeTZ"] || "";
  }, [stops]);

  return {
    ...context,
    stops,
    orderEvents,
    jobStops,
    timezone: tz,
    timezoneETA: tzETA,
  };
};

interface DetailProps {
  orderNumber: string;
  setOrderNumber: Function;
}

const Detail = forwardRef<DetailRef, DetailProps>((props, ref) => {
  const { orderNumber, setOrderNumber } = props;
  const [getOrder, { data, loading }] = useGetJsonOrderMutation({
    fetchPolicy: "network-only",
  });
  const trackingDialogRef = useRef<DialogTrackingRef>(null);
  const fetchOrder = useCallback(
    (orderNumberInput?: string) => {
      const orderID = orderNumberInput || orderNumber;
      if (orderNumberInput === orderNumber) return;
      if (orderID) {
        getOrder({
          variables: {
            input: {
              OrderNumber: orderID,
            },
          },
        });
      }
    },
    [getOrder, orderNumber]
  );

  const open = useCallback(
    (orderNumber: string) => {
      fetchOrder(orderNumber);
      trackingDialogRef.current?.open();
    },
    [fetchOrder, trackingDialogRef]
  );

  useImperativeHandle(ref, () => ({
    open,
  }));

  return (
    <TrackingContext.Provider
      value={{ order: data?.GetJsonOrder?.Order, loading }}
    >
      {!!orderNumber ? (
        <MapWrapper height="25vh">
          <MapInfo />
        </MapWrapper>
      ) : (
        <MapWrapper height="100vh">
          <MapInfoDefault />
        </MapWrapper>
      )}
      <DialogTracking
        onClose={() => {
          setOrderNumber("");
        }}
        onRefetch={fetchOrder}
        ref={trackingDialogRef}
      />
    </TrackingContext.Provider>
  );
});

export default Detail;

const MapWrapper = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  position: relative;
  z-index: 21;
`;
