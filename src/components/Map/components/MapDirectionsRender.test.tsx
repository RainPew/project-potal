import ReactDOM from "react-dom";
import MapDirectionsRenderer from "./MapDirectionsRenderer";

enum TravelMode {
  BICYCLING = "BICYCLING",
  DRIVING = "DRIVING",
  TRANSIT = "TRANSIT",
  WALKING = "WALKING",
}
const places = [
  { latitude: 39.942699, longitude: -75.156864, status: "C" },
  { latitude: 39.97683, longitude: -75.183762, status: "C" },
];

const div = document.createElement("map-direction");
describe("direction-render", () => {
  it("should render props uncorrectly", async () => {
    await renderComponent();
  });
});

const renderComponent = () => {
  return ReactDOM.render(
    <MapDirectionsRenderer
      places={places}
      travelMode={"DRIVING" as TravelMode}
    />,
    div
  );
};
