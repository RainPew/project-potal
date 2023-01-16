import styled from "@emotion/styled";
import { FunctionComponent, memo } from "react";
import { Timeline } from "antd";

import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  StopAddressContact,
  StopAddressText,
} from "../../../../stops-section/StopItem/StopItemDetail";

interface SummaryItemProps {
  item: any;
  lastItem?: boolean;
}

const SummaryAddressItem: FunctionComponent<SummaryItemProps> = ({
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
  `;

  const address = [
    item?.["@Name"],
    item?.["@Building"],
    item?.["@Address"],
    item?.["@Zip"],
    item?.["@Country"],
  ]
    ?.filter((d) => d)
    ?.join(", ");
  return (
    <SummaryItemContainer
      dot={<Icon icon={IconNames.MapMarker} />}
      data-testid="order-summary-address-item"
      key={item}
    >
      <Address>{address}</Address>
      <Contact style={{ width: "100%" }}>
        {item?.Phone}
        <br />
        {item?.Email}
      </Contact>
      <Contact>{item?.Notes}</Contact>
    </SummaryItemContainer>
  );
};

const SummaryAddress: FunctionComponent<SummaryAddressProps> = ({
  values = {},
}) => {
  const stops = values?.Stops?.Stop || [];
  return (
    <Container className="summary" data-testid="order-summary-address">
      <Timeline key={"timeline"}>
        {stops.map((stopItem: any, index: number) => (
          <SummaryAddressItem
            item={stopItem}
            key={index}
            lastItem={index + 1 === stops.length}
          />
        ))}
      </Timeline>
    </Container>
  );
};

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
export default memo(SummaryAddress);
