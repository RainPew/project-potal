import Map from "..";
import ReactDOM from "react-dom";
import { CENTER, URL_GOOGLE_KEY } from "../../../contants/contants";

const div = document.createElement("map");
describe("map-render", () => {
  it("should render props uncorrectly", async () => {
    await renderComponent();
  });
});

const renderComponent = () => {
  return ReactDOM.render(
    <Map googleMapURL={URL_GOOGLE_KEY} markers={[]} defaultCenter={CENTER} />,
    div
  );
};
