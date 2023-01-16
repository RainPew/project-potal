import styled from "@emotion/styled";
import { Col, Row } from "antd";

const OrderQuote = () => {
  // Mock data
  return (
    <div className="mt-7" data-testid="order-qoute">
      <Row>
        <Col xs={24} md={12}>
          <Title> Deliver by</Title>
          <Title2> Novermber 28, 2020 - 6:00PM</Title2>
        </Col>
        <Col xs={24} md={12}>
          <Title> Service</Title>
          <Title2> Regular</Title2>
        </Col>
        <Col xs={24} md={12}>
          <Title> Rate</Title>
          {/* AmountQuote */}
          <Title2> $60.45</Title2>
        </Col>
        <Col xs={24} md={12}>
          {/* CarrierTypeID */}
          <Title> Carrier</Title>
          <Title2> CTT</Title2>
        </Col>
      </Row>
    </div>
  );
};

const Title = styled.p`
  font-family: BasierCircle;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
  margin-bottom: 4px;
`;
const Title2 = styled.p`
  font-family: BasierCircle;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
  margin-top: 8px;
`;
export default OrderQuote;
