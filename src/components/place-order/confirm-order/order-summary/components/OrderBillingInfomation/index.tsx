import styled from "@emotion/styled";
import { Col, Row } from "antd";
const OrderBillingInfomation = ({ values }: { values?: any }) => {
  return (
    <Row gutter={[4, 16]} data-testid="order-billing-infomations">
      <Col xs={24}>
        <Title> Payment options</Title>
        <Title2>{values?.BillingType?.["@PaymentTypeDescription"]}</Title2>
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

export default OrderBillingInfomation;
