import { useCallback, useState, FunctionComponent, memo } from "react";
import styled from "@emotion/styled";
import { Collapse, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Col, Row } from "antd";
import UnionIcon from "../../../../svgs/UnionIcon";
import SummaryAddress from "./SummaryAddress";

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
  fontsize: 16px;
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
  color: #000a44;
`;

interface SummaryItemProps {
  label: string;
}

export const SummaryItem: FunctionComponent<SummaryItemProps> = ({
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
        <SummaryAddress values={values} />
      </SummaryItem>
      <SummaryItem label="Order Details" key="Details-collapse">
        Order Details.
      </SummaryItem>
      <SummaryItem label="Billing" key="Billing-collapse">
        Billing.
      </SummaryItem>
      <SummaryItem label="Registered orders" key="Registered-collapse">
        Registered orders.
      </SummaryItem>
    </Container>
  );
};

export default memo(Summary);
