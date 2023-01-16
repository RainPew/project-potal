import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Drawer, Icon } from "@blueprintjs/core";
import Summary from "./Summary";
import styled from "@emotion/styled";
import { Col, Row } from "antd";
import { IconNames } from "@blueprintjs/icons";

const DrawerCustom = styled(Drawer)`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  .summary {
    border-radius: 0;
    border: none;
  }

  .summary-item {
    &:first-of-type {
      border-top: none;
    }
  }

  .summary-item-title {
    padding: 0 15px;
  }

  .summary-item-content {
    padding: 0 15px;
  }
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
  vertical-align: middle;
`;

export const Title = styled.span`
  vertical-align: middle;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: justify;
  color: #102a47;
`;

export interface SummaryDrawerRef {
  open: () => void;
  close: () => void;
}

interface SummaryDrawerProps {
  values: any;
}

const SummaryDrawer = forwardRef<SummaryDrawerRef, SummaryDrawerProps>(
  ({ values }, ref) => {
    const [isOpenSummary, setIsOpenSummary] = useState<boolean>(false);

    const openSummary = useCallback(() => {
      setIsOpenSummary(true);
    }, [setIsOpenSummary]);

    const closeSummary = useCallback(() => {
      setIsOpenSummary(false);
    }, [setIsOpenSummary]);

    useImperativeHandle(
      ref,
      () => ({
        open: openSummary,
        close: closeSummary,
      }),
      [openSummary, closeSummary]
    );

    return (
      <DrawerCustom
        isOpen={isOpenSummary}
        onClose={closeSummary}
        position="bottom"
        size="92%"
      >
        <Row justify="space-between" style={{ padding: "20px 15px 0" }}>
          <Col>
            <Title>Order Summary</Title>
          </Col>
          <Col>
            <CloseIcon
              icon={IconNames.Cross}
              size={20}
              onClick={closeSummary}
            />
          </Col>
        </Row>
        <Summary values={values} title={false} />
      </DrawerCustom>
    );
  }
);

export { SummaryDrawer };
