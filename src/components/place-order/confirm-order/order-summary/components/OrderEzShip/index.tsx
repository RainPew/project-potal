import styled from "@emotion/styled";
import { Col, Row } from "antd";

const OrderEzShip = () => {
  return (
    <Row data-testid="order-ez-ship">
      <Col xs={24}>
        <FlexContainer>
          <img src="/images/20px_Checkbox.svg" alt="checkbox" />
          <Title> Save as EZ Ship</Title>
        </FlexContainer>
        <Title2>Pixelmatters Monthly</Title2>
      </Col>
    </Row>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
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
export default OrderEzShip;
