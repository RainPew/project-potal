import { FunctionComponent, memo } from "react";
import { H5, Tab, Tabs } from "@blueprintjs/core";
import styled from "@emotion/styled";
import StopsTab from "./StopsTab";
import EventTab from "./EventTab";
import DocumentsTab from "./DocumentsTab";
import OverviewTab from "./OverviewTab";

const Container = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const TabsContainer = styled(Tabs)`
  height: 100%;

  .bp4-tab-list {
    padding: 0 24px;
    box-shadow: 0 1px 0 rgb(17 20 24 / 15%);
  }
  .bp4-tab {
    font-size: 16px;
    // line-height: 20px;
    color: #576f8b;
    padding-bottom: 2px;
  }
  .bp4-tab-panel {
    padding: 0 24px;
    margin-top: 10px;
    height: calc(100% - 41px);
    overflow: auto;
  }
  .bp4-tab-indicator-wrapper .bp4-tab-indicator {
    background-color: #e30613;
  }
  .bp4-tab[aria-selected="true"] {
    h5 {
      color: #102a47;
    }
  }
`;

const Title = styled(H5)`
  font-size: 16px;
  line-height: 20px;
  color: #576f8b;
`;

interface TrackingTabsProps {}

const TrackingTabs: FunctionComponent<TrackingTabsProps> = () => {
  return (
    <Container data-testid="tracking-detail-tabs">
      <TabsContainer defaultSelectedTabId="stops">
        <Tab
          id="stops"
          title={<Title>Stops</Title>}
          panel={<StopsTab />}
          data-testid="tracking-detail-tab-stops"
        />
        <Tab
          id="events"
          title={<Title>Events</Title>}
          panel={<EventTab />}
          data-testid="tracking-detail-tab-events"
        />
        <Tab
          id="documents"
          title={<Title>Documents</Title>}
          panel={<DocumentsTab />}
          data-testid="tracking-detail-tab-documents"
        />
        <Tab
          id="overview"
          title={<Title>Overview</Title>}
          panel={<OverviewTab />}
          data-testid="tracking-detail-tab-overview"
        />
      </TabsContainer>
    </Container>
  );
};

export default memo(TrackingTabs);
