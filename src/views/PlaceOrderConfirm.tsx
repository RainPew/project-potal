import { useCallback, useEffect, useRef } from "react";
import MainLayout from "../layout/MainLayout";
import { Col, Grid, Row } from "antd";
import { Button } from "@blueprintjs/core";
import UnionIcon from "../svgs/UnionIcon";
import { SummaryDrawerRef } from "../components/place-order/quote-order/Summary/SummaryDrawer";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import OrderSummary from "../components/place-order/confirm-order/order-summary";
import PlaceOrderPrint from "../components/place-order/confirm-order/order-print";
import NewOrder from "../components/place-order/confirm-order/new-order";
import { useGetJsonOrderMutation } from "../generated/graphql";
import ModalOrderSumary from "../components/place-order/confirm-order/order-summary/components/ModalOrderSumary";
import { toastSuccess } from "../utils/toast";

const useBreakpoint = Grid.useBreakpoint;

const PlaceOrderConfirm = () => {
  const summaryRef = useRef<SummaryDrawerRef>(null);
  const { sm } = useBreakpoint();
  let { orderId } = useParams<{ orderId: string }>();
  const [getOrder, { data, loading }] = useGetJsonOrderMutation({
    fetchPolicy: "network-only",
  });
  const openSummary = useCallback(() => {
    summaryRef.current?.open();
  }, []);

  const closeSummary = useCallback(() => {
    summaryRef.current?.close();
  }, []);

  useEffect(() => {
    if (sm) closeSummary();
  }, [sm, closeSummary]);

  const fetchOrder = useCallback(() => {
    if (orderId) {
      getOrder({
        variables: {
          input: {
            OrderNumber: orderId,
          },
        },
      });

      toastSuccess(`Your order ${orderId} was placed`, "top-right", 2400);
    }
  }, [getOrder, orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <MainLayout>
      {!loading && (
        <Container data-testid="place-order-confirm-view">
          <TitleHeader>Place Order</TitleHeader>
          <Row
            gutter={[
              { xs: 0, sm: 30 },
              { xs: 0, sm: 30 },
            ]}
          >
            <Col xs={0} sm={24} lg={16} span={16}>
              <OrderSummary values={data?.GetJsonOrder} />
            </Col>
            <Col xs={24} sm={24} lg={8} span={16 / 2}>
              <FlexContainer>
                <PlaceOrderPrint />
                <NewOrder />
              </FlexContainer>
            </Col>
            <Col xs={24} sm={0}>
              <ModalOrderSumary values={data?.GetJsonOrder} ref={summaryRef} />
            </Col>
          </Row>
          <Row style={{ padding: "0px 16px 8px" }}>
            <Col xs={24} sm={0} lg={0}>
              <Button
                style={{ background: "white" }}
                onClick={openSummary}
                data-testid="open-modal"
              >
                <UnionIcon />
                <Title>Order Summary</Title>
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </MainLayout>
  );
};

const Container = styled.div`
  padding: 32px;
`;

const TitleHeader = styled.p`
  font-family: BasierCircle;
  font-size: 30px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: justify;
  color: #000;
  margin-bottom: 32px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.span`
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
export default PlaceOrderConfirm;
