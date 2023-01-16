/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import React, { useCallback, useMemo, useState } from "react";
import { GoogleApiKey, renderIcon } from "../../contants/contants";
import MapDirectionsCompelete from "./components/MapCompleteDirection";
import MapDirectionsRenderer from "./components/MapDirectionsRenderer";
import { findLastIndex } from "lodash";

interface IMap {
  defaultCenter?: google.maps.LatLng | google.maps.LatLngLiteral;
  defaultZoom?: number;
  markers: Array<IPosition>;
  googleMapURL: string;
}
interface IPosition {
  latitude: number;
  longitude: number;
  status: string;
  stopType: string;
}

const currenLoctionIcon = `${process.env.PUBLIC_URL}/images/container.svg`;

const Map = ({ defaultCenter, markers }: IMap) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GoogleApiKey,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const [_, setMap] = useState(null);
  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(defaultCenter);
      map.fitBounds(bounds);
      map.setZoom(5);
      setMap(map);
    },
    [defaultCenter]
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const markerCompelete = useMemo(() => {
    if (markers.length > 0) {
      const index = findLastIndex(markers, (marker) => {
        return marker.status === "C";
      });
      return markers.slice(0, index + 1) as Array<IPosition>;
    }
    return [];
  }, [markers]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      data-testid="google-map-test"
      mapContainerClassName="map-info"
    >
      <>
        {markers.map((places, index) => (
          <Marker
            key={index}
            position={{
              lat: places.latitude,
              lng: places.longitude,
            }}
            icon={`${process.env.PUBLIC_URL}/${
              places.status === "C"
                ? "images/circle-done.svg"
                : "images/circle.svg"
            }`}
          >
            <InfoWindowF
              position={{
                lat: places.latitude,
                lng: places.longitude,
              }}
              options={{}}
            >
              <div>{renderIcon(places.stopType)}</div>
            </InfoWindowF>
          </Marker>
        ))}
        {markerCompelete.length > 0 && (
          <Marker
            position={{
              lat: markerCompelete[markerCompelete.length - 1].latitude,
              lng: markerCompelete[markerCompelete.length - 1].longitude,
            }}
            icon={currenLoctionIcon}
          />
        )}

        <MapDirectionsCompelete
          places={markerCompelete}
          travelMode={google.maps.TravelMode.DRIVING}
        />
        <MapDirectionsRenderer
          places={markers}
          travelMode={google.maps.TravelMode.DRIVING}
        />
      </>
    </GoogleMap>
  ) : (
    <React.Fragment />
  );
};

export default Map;
