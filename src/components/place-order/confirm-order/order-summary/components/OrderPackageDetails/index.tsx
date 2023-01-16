import styled from "@emotion/styled";
import { Col, Row } from "antd";

const OrderPackageDetails = ({ values }: { values?: any }) => {
  return (
    <Row gutter={[4, 16]} data-testid="order-package-details">
      <Col xs={24} md={12}>
        {/* VehicleType */}
        <Title> Service type</Title>
        {/* Hard code wait for API */}
        {/* Service */}
        <Title2>{values?.["@Service"]}</Title2>
      </Col>
      <Col xs={24} md={12}>
        <Title> Package type</Title>
        {/* Hard code wait for API */}
        <Title2> {values?.["@PackageType"]}</Title2>
      </Col>

      <Col xs={24} md={12}>
        <Title> Pieces</Title>
        <Title2>{values?.["@Pieces"]}</Title2>
      </Col>
      <Col xs={24} md={12}>
        <Title> Weight</Title>
        <Title2> {values?.["@Weight"]}</Title2>
      </Col>

      <Col xs={24} md={12}>
        <Title> Vehicle</Title>
        {/* Worng Data  */}
        <Title2>{values?.["@VehicleType"]}</Title2>
      </Col>
      <Col xs={24} md={12}>
        <Title> DLC value</Title>
        <Title2> {values?.["@Weight"]}</Title2>
      </Col>

      <Col xs={24}>
        <FlexContainer>
          <img src="/images/20px_Checkbox.svg" alt="checkbox" />

          <Title> Cash on delivery</Title>
        </FlexContainer>
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
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
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
export default OrderPackageDetails;
