import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { bps } from "../components/common/Constants";
import BillingInfomation from "../components/place-order/billing-infomation";
import { Billing } from "../components/place-order/billing-infomation/index.type";
import { DeliveryDate } from "../components/place-order/DeliveryDate";
import Notifications from "../components/place-order/notifications";
import { Notification } from "../components/place-order/notifications/index.type";
import { OrderReferences } from "../components/place-order/OrderReferences";
import { PackageDetails } from "../components/place-order/PackageDetails";
import SaveEzShip from "../components/place-order/save-ez-ship";
import StopsSection from "../components/place-order/stops-section";
import { useWindowSize } from "../hooks/useWindowSize";
import MainLayout from "../layout/MainLayout";
import PlaceOrderLayOut from "../layout/PlaceOrderLayout";

interface PlaceOrderViewProps {
  children?: Element;
}

const PlaceOrderView: React.FC<PlaceOrderViewProps> = () => {
  const { width } = useWindowSize();
  const { register } = useForm<Billing>();
  const { register: registerNotification } = useForm<Notification>();

  const isMobile = useMemo(() => {
    if (!width) return true;
    return width < bps.xl;
  }, [width]);
  return (
    <MainLayout>
      <PlaceOrderLayOut>
        {isMobile ? (
          <div
            className={css`
              display: grid;
              grid-gap: 16px;
            `}
          >
            <DeliveryDate />
            <StopsSection />
            <PackageDetails />
            <OrderReferences />
            <BillingInfomation register={register} />
            <Notifications register={registerNotification} />
            <SaveEzShip />
          </div>
        ) : (
          <div
            className={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              > * {
                overflow: auto;
              }
              @media (min-width: ${bps["sm"]}px) {
              }
              @media (min-width: ${bps["md"]}px) {
              }
              @media (min-width: ${bps["lg"]}px) {
              }
              @media (min-width: ${bps["xl"]}px) {
                column-gap: 24px;
              }
              @media (min-width: ${bps["mac"]}px) {
                column-gap: 32px;
              }
              @media (min-width: ${bps["2xl"]}px) {
              }
            `}
          >
            <div className={css``}>
              <DeliveryDate />
              <VerticalSpacer height={24} />
              <StopsSection />
            </div>

            <div className={css``}>
              <PackageDetails />
              <VerticalSpacer height={24} />
              <OrderReferences />
              <VerticalSpacer height={24} />
              <BillingInfomation register={register} />
              <VerticalSpacer height={24} />
              <Notifications register={registerNotification} />
              <VerticalSpacer height={24} />
              <SaveEzShip />
            </div>
          </div>
        )}
      </PlaceOrderLayOut>
    </MainLayout>
  );
};

export { PlaceOrderView };

const VerticalSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  width: 100%;
`;
