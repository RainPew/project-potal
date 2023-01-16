import styled from "@emotion/styled";
import { Col, Row } from "antd";

const OrderNotifications = () => {
  return (
    <Row gutter={[4, 16]} data-testid="order-notificaiton">
      <Col xs={24} md={12}>
        <Title> E-mail</Title>
        {/* mock value */}
        <Title2>{"jessica@pixelmatters.com"}</Title2>
        <Title2>{"When shipment is delivered"}</Title2>
      </Col>
      <Col xs={24} md={12}>
        <Title> Text message</Title>
        {/* mock value */}
        <Title2> 281-812-3762</Title2>
        <Title2> When shipment is delivered</Title2>
      </Col>
    </Row>
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
`;
export default OrderNotifications;
