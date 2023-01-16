/* eslint-disable */
import { FunctionComponent, memo, useState } from "react";
import GoogleMapReact from "google-map-react";

const GoogleApiKey = "AIzaSyD6cEM1i3rSdP9CrHADl5giN8WOriKR13U";

type Cords = {
  lat: number;
  lng: number;
};

const MapComponent: FunctionComponent = () => {
  const [center] = useState<Cords | undefined>(undefined);
  const [layers] = useState<string[]>([]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: GoogleApiKey }}
      defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
      defaultZoom={5}
      center={center}
      yesIWantToUseGoogleMapApiInternals
      layerTypes={layers}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: true,
      }}
    ></GoogleMapReact>
  );
};

export default memo(MapComponent);
