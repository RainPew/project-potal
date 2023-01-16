import { BlueprintIcons_16Id } from "@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16";
import { Constants } from "../components/common/Constants";

const {
  ROUTES: { home, tracking, placeOrder, report },
} = Constants;

interface IRoutes {
  title: string;
  path: string;
  icon?: BlueprintIcons_16Id;
  key: "Dashboard" | "Place Order" | "Track Order" | "Reports";
}

export const routes: Array<IRoutes> = [
  {
    title: "Dashboard",
    path: home,
    icon: "control",
    key: "Dashboard",
  },
  {
    title: "Place Order",
    path: placeOrder,
    icon: "cube",
    key: "Place Order",
  },
  {
    title: "Track Order",
    path: tracking,
    icon: "map-marker",
    key: "Track Order",
  },
  {
    title: "Reports",
    path: report,
    icon: "pie-chart",
    key: "Reports",
  },
];
