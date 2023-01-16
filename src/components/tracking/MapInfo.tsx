import { memo, useMemo } from "react";
import { CENTER, DEFAULT_ZOOOM, URL_GOOGLE_KEY } from "../../contants/contants";
import MapComponent from "../Map/index";
import { useTrackingDetails } from "./Detail";

const MapInfo = () => {
  const { jobStops } = useTrackingDetails();
  const places = useMemo(() => {
    const place = jobStops.map((v) => ({
      latitude: parseFloat(v["@ZLatitude"]) || 0,
      longitude: parseFloat(v["@ZLongitude"]) || 0,
      status: v["@JobStopStatus"],
      stopType: v["@StopType"],
    }));
    return place;
  }, [jobStops]);

  return (
    <MapComponent
      googleMapURL={URL_GOOGLE_KEY}
      markers={places}
      defaultCenter={CENTER}
      defaultZoom={DEFAULT_ZOOOM}
    />
  );
};

export const MapInfoDefault = () => {
  return (
    <MapComponent
      googleMapURL={URL_GOOGLE_KEY}
      markers={[]}
      defaultCenter={CENTER}
      defaultZoom={DEFAULT_ZOOOM}
    />
  );
};

export default memo(MapInfo);
