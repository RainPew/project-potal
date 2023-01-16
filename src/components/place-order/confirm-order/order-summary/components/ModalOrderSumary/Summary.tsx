import { useCallback, useState, FunctionComponent, memo } from "react";
import styled from "@emotion/styled";
import { Collapse, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Col, Row } from "antd";
import Address from "../Address";
import UnionIcon from "../../../../../../svgs/UnionIcon";
import OrderPackageDetails from "../OrderPackageDetails";
import OrderReferences from "../OrderReferences";
import OrderBillingInfomation from "../OrderBillingInfomation";
import OrderNotifications from "../OrderNotifications";
import OrderEzShip from "../OrderEzShip";
import OrderQuote from "../OrderQuote";

interface SummaryProps {
  title?: boolean;
  values?: any;
}

const Container = styled.div`
  width: 100%;
  padding-top: 26px;
  border-radius: 6px;
  box-shadow: 0 2px 1px 0 rgba(44, 58, 110, 0.06);
  border: solid 1px #cbd0df;
  background-color: #fff;
  overflow-y: auto;
`;

export const Title = styled.span`
  vertical-align: middle;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;

const Description = styled.p`
  margin-top: 8px;
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #576f8b;
`;

const SummaryItemContainer = styled.div`
  position: relative;
  border-top: solid 1px #cbd0df;
`;

const SummaryItemWrapper = styled.div`
  padding: 17px 0;
`;

const SummaryItemTitle = styled(Row)`
  padding: 0 24px;
  cursor: pointer;
`;

const SummaryItemContent = styled(Collapse)`
  padding: 0 24px;
`;

const SummaryTitle = styled.div`
  padding: 0 24px;
`;

const SummaryItemLabel = styled.p`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;

interface SummaryItemProps {
  label: string;
}

const SummaryItem: FunctionComponent<SummaryItemProps> = ({
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toogleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, [setIsOpen]);

  return (
    <SummaryItemContainer className="summary-item">
      <SummaryItemWrapper>
        <SummaryItemTitle
          justify="space-between"
          onClick={toogleOpen}
          className="summary-item-title"
          data-testid="toogle-open-modal"
        >
          <Col>
            <SummaryItemLabel>{label}</SummaryItemLabel>
          </Col>
          <Col>
            <Icon icon={isOpen ? IconNames.ChevronUp : IconNames.ChevronDown} />
          </Col>
        </SummaryItemTitle>
        <SummaryItemContent isOpen={isOpen} className="summary-item-content">
          {children}
        </SummaryItemContent>
      </SummaryItemWrapper>
    </SummaryItemContainer>
  );
};

const Summary: FunctionComponent<SummaryProps> = ({ title = true, values }) => {
  const items = values?.Order?.Stops?.Stop?.find(
    (v: any) => v["@StopType"] === "P"
  );
  const customer = values?.Order?.Customer?.CustomerBillingTypes;

  return (
    <Container className="summary" data-testid="quote-order-summary">
      {title && (
        <SummaryTitle>
          <div>
            <UnionIcon />
            <Title>Order Summary</Title>
          </div>
          <Description>An overview of your order</Description>
        </SummaryTitle>
      )}
      <SummaryItem label="Addresses" key="Addresses-collapse">
        <Address values={values?.Order} />
      </SummaryItem>
      <SummaryItem label="Package Details" key="Package-Details-collapse">
        <OrderPackageDetails values={items} />
      </SummaryItem>
      <SummaryItem label="Order References" key="Order-References-collapse">
        <OrderReferences />
      </SummaryItem>
      <SummaryItem label="Billing" key="Billing-collapse">
        <OrderBillingInfomation values={customer} />
      </SummaryItem>
      <SummaryItem label="Nofications" key="Nofication-collapse">
        <OrderNotifications />
      </SummaryItem>

      <SummaryItem label="EZ Ship" key="EZ-Ship-collapse">
        <OrderEzShip />
      </SummaryItem>
      <SummaryItem label="Quote" key="Quote-collapse">
        <OrderQuote />
      </SummaryItem>
    </Container>
  );
};

export default memo(Summary);
