import { BrowserRouter as Router } from "react-router-dom";
import ApolloConfig from "./ApolloConfig";
import App from "./App";
import ApplicationProvider from "./ApplicationProvider";
import { ConfiguredToaster } from "./components/common/ConfiguredToaster";

const AppWithRouterAccess = () => {
  return (
    <Router>
      <ApolloConfig>
        <ApplicationProvider>
          <App />
          <ConfiguredToaster />
        </ApplicationProvider>
      </ApolloConfig>
    </Router>
  );
};

export default AppWithRouterAccess;
