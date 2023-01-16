import React, { useCallback, useEffect, useRef, useState } from "react";
import Quote from "../components/place-order/quote-order/Quote";
import MainLayout from "../layout/MainLayout";
import PlaceOrderLayOut from "../layout/PlaceOrderLayout";
import { Col, Grid, Row } from "antd";
import Summary from "../components/place-order/quote-order/Summary/Summary";
import { Button } from "@blueprintjs/core";
import UnionIcon from "../svgs/UnionIcon";
import {
  SummaryDrawer,
  SummaryDrawerRef,
} from "../components/place-order/quote-order/Summary/SummaryDrawer";
import styled from "@emotion/styled";
import { usePlaceOrder } from "../components/place-order/PlaceOrderProvider";

export const Title = styled.span`
  vertical-align: middle;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: justify;
  color: #102a47;
`;

interface QuoteOrderViewProps {
  children?: Element;
}

const useBreakpoint = Grid.useBreakpoint;

const QuoteOrderView: React.FC<QuoteOrderViewProps> = () => {
  const summaryRef = useRef<SummaryDrawerRef>(null);
  const { sm } = useBreakpoint();
  const { getValues } = usePlaceOrder().formState || {};
  const [values, setValues] = useState<any | null>(null);

  const openSummary = useCallback(() => {
    summaryRef.current?.open();
  }, []);

  const closeSummary = useCallback(() => {
    summaryRef.current?.close();
  }, []);

  useEffect(() => {
    if (sm) closeSummary();
  }, [sm, closeSummary]);

  useEffect(() => {
    const values = getValues();
    setValues(values);
  }, [getValues, setValues]);

  return (
    <MainLayout>
      <PlaceOrderLayOut>
        <Row style={{ padding: "0px 16px 8px" }} data-testid="quote-order-view">
          <Col xs={24} sm={0} lg={0}>
            <Button style={{ background: "white" }} onClick={openSummary}>
              <UnionIcon />
              <Title>Order Summary</Title>
            </Button>
          </Col>
        </Row>
        <Row
          gutter={[
            { xs: 0, sm: 0, lg: 30 },
            { xs: 0, sm: 30 },
          ]}
        >
          <Col xs={24} sm={24} lg={16} span={16}>
            <Quote values={values} />
          </Col>
          <Col xs={0} sm={24} lg={8} span={16 / 2}>
            <Summary values={values} />
          </Col>
          <Col xs={24} sm={0}>
            <SummaryDrawer values={values} ref={summaryRef} />
          </Col>
        </Row>
      </PlaceOrderLayOut>
    </MainLayout>
  );
};

export { QuoteOrderView };
