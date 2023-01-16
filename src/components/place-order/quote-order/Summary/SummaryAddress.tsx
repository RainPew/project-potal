import styled from "@emotion/styled";
import { FunctionComponent, memo } from "react";
import { Timeline } from "antd";
import {
  StopAddressContact,
  StopAddressText,
} from "../../stops-section/StopItem/StopItemDetail";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

interface SummaryAddressProps {
  values?: any;
}

const Container = styled.div`
  width: 100%;
  padding-top: 17px;
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

const Address = styled(StopAddressText)`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;

const Contact = styled(StopAddressContact)`
  margin-bottom: 8px;
`;

interface SummaryItemProps {
  item: any;
  lastItem?: boolean;
}

export const SummaryAddressItem: FunctionComponent<SummaryItemProps> = ({
  item,
  lastItem = false,
}) => {
  const SummaryItemContainer = styled(Timeline.Item)`
    .ant-timeline-item-tail {
      ${lastItem ? "display: none;" : ""}
      border-left: 2px solid #8da4be;
    }
    .ant-timeline-item-head {
      color: #102a47;
    }
    &:last-child {
      padding-bottom: 0;
      .contact {
        margin-bottom: 0px;
      }
    }
  `;

  const address = [
    item?.Address,
    item?.Zip,
    `${item.City} ${item.State}`,
    "USA",
    item?.Building,
  ]
    ?.filter((d) => d)
    ?.join(", ");
  return (
    <SummaryItemContainer
      dot={<Icon icon={IconNames.MapMarker} />}
      data-testid="quote-order-summary-address-item"
    >
      <Address>{address}</Address>
      <Contact style={{ width: "100%" }}>
        {item?.Phone}
        <br />
        {item?.Email}
      </Contact>
      <Contact className="contact">{item?.Notes}</Contact>
    </SummaryItemContainer>
  );
};

const SummaryAddress: FunctionComponent<SummaryAddressProps> = ({
  values = {},
}) => {
  const stops = values?.stops || [];

  return (
    <Container className="summary" data-testid="quote-order-summary-address">
      <Timeline key={"timeline"}>
        {stops.map((stop: any, index: number) => (
          <SummaryAddressItem
            item={stop}
            key={index}
            lastItem={index + 1 === stops.length}
          />
        ))}
      </Timeline>
    </Container>
  );
};

export default memo(SummaryAddress);
