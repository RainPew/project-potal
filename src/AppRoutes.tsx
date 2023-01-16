/** @jsxImportSource @emotion/react */
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Constants } from "./components/common/Constants";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";
import PlaceOrderContextProvider from "./components/place-order/PlaceOrderProvider";
import { HomeView } from "./views/HomeView";
import LoginView from "./views/LoginView";
import PlaceOrderConfirm from "./views/PlaceOrderConfirm";
import { PlaceOrderView } from "./views/PlaceOrderView";
import { QuoteOrderView } from "./views/QuoteOrderView";
import { ReportView } from "./views/ReportView";
import { TrackingView } from "./views/TrackingView";
import WhoAmIView from "./views/WhoAmIView";

const { ROUTES } = Constants;

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={"/login"}>
        <PublicLayout>
          <LoginView />
        </PublicLayout>
      </Route>
      <Route path="/*">
        <PrivateLayout>
          <Route path="/place-order">
            <PlaceOrderContextProvider>
              <Route
                exact
                path={ROUTES.placeOrder}
                component={PlaceOrderView}
              />

              <Route
                exact
                path={ROUTES.quoteOrder}
                component={QuoteOrderView}
              />
              <Route
                exact
                path={`${ROUTES.placeOrder}/confirm/:orderId`}
                component={PlaceOrderConfirm}
              />
            </PlaceOrderContextProvider>
          </Route>
          <Route exact path={ROUTES.whoami} component={WhoAmIView} />
          <Route exact path={ROUTES.tracking} component={TrackingView} />
          <Route exact path={ROUTES.report} component={ReportView} />
          <Route exact path={ROUTES.home} component={HomeView} />
        </PrivateLayout>
      </Route>
    </Switch>
  );
};

export default AppRoutes;
