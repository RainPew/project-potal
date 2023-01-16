import { Icon } from "@blueprintjs/core";

export const DEFAULT_ZOOOM = 8;
export const CENTER = {
  lat: 29.7609,
  lng: -95.3625,
};
export const EmailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const GoogleApiKey = "AIzaSyD6cEM1i3rSdP9CrHADl5giN8WOriKR13U";
export const URL_GOOGLE_KEY = `https://maps.googleapis.com/maps/api/js?key=${GoogleApiKey}&v=3.exp&libraries=geometry,drawing,places`;
export const fakeData = [{ id: "16348" }, { id: "16347" }, { id: "16347" }];

export const renderIcon = (status: string) => {
  switch (status) {
    case "P":
      return <Icon icon="arrow-up" />;
    case "D":
      return <Icon icon="arrow-down" />;
    default:
      return <Icon icon="swap-vertical" />;
  }
};
