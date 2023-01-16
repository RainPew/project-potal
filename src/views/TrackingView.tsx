import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import { bps } from "../components/common/Constants";
import { SearchOrder } from "../components/tracking/SearchOrder";
import MainLayout from "../layout/MainLayout";
import Detail, { DetailRef } from "../components/tracking/Detail";

interface TrackingViewProps {
  children?: Element;
}

const TrackingView: React.FC<TrackingViewProps> = () => {
  const trackingDetailRef = useRef<DetailRef>(null);
  const [orderNumber, setOrderNumber] = useState("");

  const search = useCallback(
    (orderNumber: string) => {
      trackingDetailRef.current?.open(orderNumber);
      setOrderNumber(orderNumber);
    },
    [setOrderNumber]
  );

  return (
    <MainLayout>
      <TemplateWrapper data-testid="tracking-view">
        <SearchOrderWrapper>
          <SearchOrder setOrderNumber={search} orderNumber={orderNumber} />
        </SearchOrderWrapper>

        <MapContainer display="block">
          <Detail
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            ref={trackingDetailRef}
          />
        </MapContainer>
      </TemplateWrapper>
    </MainLayout>
  );
};

const TemplateWrapper = styled.div`
  display: block;
  @media (min-width: ${bps["xl"]}px) {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
  }
`;

const SearchOrderWrapper = styled.div`
  overflow-x: auto;
  padding: 10px;
  @media (min-width: ${bps["sm"]}px) {
    padding: 16px;
  }
  @media (min-width: ${bps["xl"]}px) {
    padding: 32px;
    min-height: 100vh;
  }
`;

const MapContainer = styled.div<{ display: string }>`
  position: relative;
  overflow-y: hidden;
  display: ${(props) => props.display};
`;

export { TrackingView };
