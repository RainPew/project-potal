import { FunctionComponent, memo } from "react";
import styled from "@emotion/styled";
import { useTrackingDetails } from "../Detail";

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const Col = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 13px;
  line-height: 15px;
  color: #8da4be;
  margin-bottom: 4px;
`;

const Content = styled.p`
  font-size: 15px;
  line-height: 20px;
  color: #102a47;
  margin-bottom: 0;
`;

interface OverviewTabProps {}

const OverviewTab: FunctionComponent<OverviewTabProps> = () => {
  const order = useTrackingDetails()?.order || {};
  const customer = order?.Customer || {};

  return (
    <Container data-testid="tracking-detail-overview">
      <Row>
        <Col>
          <Title>Client</Title>
          <Content data-testid="tracking-detail-overview-client">
            {customer["@Name"]}
          </Content>
        </Col>
        <Col>
          <Title>Contact</Title>
          <Content data-testid="tracking-detail-overview-contact">
            {customer["@Phone"]}
          </Content>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Service</Title>
          <Content data-testid="tracking-detail-overview-service">
            {order["@AbbrService"]}
          </Content>
        </Col>
        <Col>
          <Title>Pieces</Title>
          <Content data-testid="tracking-detail-overview-pieces">
            {order["@Pieces"]}
          </Content>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Notes</Title>
          <Content data-testid="tracking-detail-overview-notes">
            {order["@Notes"]}
          </Content>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(OverviewTab);
