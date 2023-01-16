import styled from "@emotion/styled";
import { Col, Row } from "antd";
import { TReference } from "./index.type";

const OrderReferences = ({ value }: { value?: Array<TReference> }) => {
  return (
    <Row gutter={[4, 16]} data-testid="order-reference">
      {value &&
        value?.length > 0 &&
        value.map((reference) => (
          <Col xs={24} md={12} key={reference?.["@CustomerReferenceID"]}>
            <Title> {reference?.["@CustomerReferenceID"]}</Title>
            {/* Hard code wait for API */}
            <Title2> {reference?.["@Name"]}</Title2>
          </Col>
        ))}
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
export default OrderReferences;
