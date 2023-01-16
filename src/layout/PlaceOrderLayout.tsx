import { Button, Divider, Icon, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import styled from "@emotion/styled";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  bps,
  Constants,
  breakpointToggleSidebar,
} from "../components/common/Constants";
import { usePlaceOrder } from "../components/place-order/PlaceOrderProvider";
import { fakeData } from "../contants/contants";
import { useSaveOrdersMutation } from "../generated/graphql";
import * as variable from "../utils/variable";
import FillWithEZ from "./components/FillWithEZ";
import Scanner from "./components/Scanner";
import { format, getDate, getMonth, getYear, set } from "date-fns";
import ModalConfirmDiscard, {
  ModalConfirmDiscardRefs,
} from "../components/place-order/ModalConfirmDiscard";
import useExitPrompt from "../hooks/useExitPrompt";
import { useFormState } from "react-hook-form";
import Prompt from "../components/common/Prompt";

const { ROUTES } = Constants;

const PlaceOrderLayOut: FunctionComponent = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const {
    validate,
    formState: { setValue },
  } = usePlaceOrder();

  const discardModal = useRef<ModalConfirmDiscardRefs>(null);

  const [mutationSaveOrders, { loading }] = useSaveOrdersMutation();
  const {
    getValues,
    control,
    reset: resetAllFields,
  } = usePlaceOrder().formState || {};
  const { isDirty } = useFormState({ control });
  const { setShowExitPrompt } = useExitPrompt(false);
  const [showMyPrompt, setShowMyPrompt] = useState<boolean>(false);

  const isQuote = location.pathname === ROUTES.quoteOrder;

  useEffect(() => {
    setShowExitPrompt(isDirty);
  }, [isDirty, setShowExitPrompt]);

  const gotoQuoteOrder = useCallback(async () => {
    setValue("forward", true);
    const error = await validate();
    if (!error) return;
    history.push(ROUTES.quoteOrder);
  }, [history, validate, setValue]);

  const backToDetail = useCallback(() => {
    history.push(ROUTES.placeOrder);
  }, [history]);

  const cancelDiscard = useCallback(() => {
    setShowMyPrompt(false);
  }, [setShowMyPrompt]);

  const resetForm = useCallback(() => {
    resetAllFields();
    cancelDiscard();
  }, [resetAllFields, cancelDiscard]);

  const discard = useCallback(() => {
    if (isDirty) discardModal?.current?.open();
  }, [isDirty]);

  const handlePlaceOrder = async () => {
    const error = await validate();
    const values = getValues();

    if (!error) return;
    else {
      const { delivery_date, delivery_time } = values as any;
      const date = set(delivery_time, {
        year: getYear(delivery_date),
        month: getMonth(delivery_date),
        date: getDate(delivery_date),
      });
      const stops = (values?.stops || []).map((stop: any, index: number) => {
        return {
          Sequence: `${index + 1}`,
          StopType: stop.StopType,
          ...(stop.StopType === "P"
            ? {
                ScheduledDateTime: format(date, "MM/dd/yyyy h:mm:ss b"),
              }
            : {}),
          Name: stop.Name,
          Address: stop.Address,
          City: "Orlando",
          State: stop.State,
          Zip: stop.Zip,
          Country: "USA",
          Phone: stop.Phone,
          OrderStopPieces: {
            OrderStopPiece: {
              PieceAction: stop.StopType,
              Sequence: "1",
            },
          },
        };
      });

      const res = await mutationSaveOrders({
        variables: {
          input: {
            Order: {
              CustomerCode: "10017",
              Service: values.deliveryServiceType,
              Auth: "10017",
              Pieces: {
                Piece: [
                  {
                    Sequence: "1",
                    Reference: "test1234barcode",
                    Pieces: "1",
                  },
                  {
                    Sequence: "2",
                    Reference: "test1235barcode",
                    Pieces: "5",
                  },
                ],
              },
              Stops: {
                Stop: stops,
              },
            },
          },
        },
      });
      if (res?.data?.saveOrders?.Status.OrderID) {
        resetAllFields();
        return history.push(
          `${ROUTES.placeOrder}/confirm/${res?.data?.saveOrders?.Status.OrderID}`
        );
      }
    }
  };

  return loading ? (
    <LoadingContainer data-testid="loading-screen">
      <Spinner />
    </LoadingContainer>
  ) : (
    <Wrapper data-testid="place-layout">
      <Header>
        <Title>Place Order</Title>
        <HeaderContent>
          <Scanner dataScanner={fakeData} />
          <FillWithEZ />
        </HeaderContent>
      </Header>
      <HeaderMobile>
        <FlexContainer2>
          <Title>{isQuote ? "Quote order" : "Place Order"}</Title>
          {!isQuote && <FillWithEZ />}
        </FlexContainer2>
      </HeaderMobile>
      <Content>{children}</Content>
      <Footer>
        <Divider />
        <FlexContainer>
          <div
            data-testid="back-to-detail"
            onClick={isQuote ? backToDetail : discard}
            className={!isQuote && !isDirty ? "disabled" : ""}
          >
            <TitleDisCard style={isQuote ? { color: "#394048" } : {}}>
              {isQuote ? "Back to Order Details" : "Discard order"}
            </TitleDisCard>
          </div>
          <ButtonGroup>
            {!isQuote && (
              <ButtonCustom
                onClick={handlePlaceOrder}
                data-testid="place-order-act"
              >
                Place this order
              </ButtonCustom>
            )}
            <ButtonQuote onClick={gotoQuoteOrder} data-testid="go-to-quote">
              {!isQuote ? "Quote this order" : "Place this order"}
            </ButtonQuote>
          </ButtonGroup>
        </FlexContainer>
      </Footer>
      <FooterMobile>
        <DisCardOrder
          onClick={discard}
          className={!isQuote && !isDirty ? "disabled" : ""}
        >
          <Icon icon="trash" color="#fa545e" />
          <TitleDisCard>Discard order</TitleDisCard>
        </DisCardOrder>
        <Divider />
        {!isQuote && (
          <ButtonGroup2>
            <ButtonCustom onClick={handlePlaceOrder}>Place order</ButtonCustom>
            <ButtonQuote onClick={gotoQuoteOrder}>Quote order</ButtonQuote>
          </ButtonGroup2>
        )}
        {isQuote && (
          <ButtonGroup2>
            <ButtonCustomBack outlined onClick={backToDetail}>
              <Icon
                icon={IconNames.ArrowLeft}
                style={{ marginRight: 4, color: "#102a47" }}
              />
              Edit order
            </ButtonCustomBack>
            <ButtonQuote onClick={gotoQuoteOrder}>Place order</ButtonQuote>
          </ButtonGroup2>
        )}
      </FooterMobile>
      <ModalConfirmDiscard
        ref={discardModal}
        onConfirm={resetForm}
        onCancel={cancelDiscard}
      />
      <Prompt
        when={isDirty && !showMyPrompt}
        message={(location, action: any) => {
          if (
            location.pathname === ROUTES.placeOrder ||
            location.pathname === ROUTES.quoteOrder
          )
            return true;
          discardModal.current?.open({
            event: action as any,
            router: location.pathname,
          });
          setShowMyPrompt(true);
          return false;
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${variable.DEFAULT_BG_PLACE_ORDER};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  padding: 32px;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    display: none;
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const TitleDisCard = styled.p`
  color: #fa545e;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: justify;
  cursor: pointer;
`;
const HeaderMobile = styled.div`
  display: none;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    display: block;
  }
`;
const DisCardOrder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding-left: 27px;
  padding-right: 27px;
  height: 48px;
  background: #fff;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: #102a47;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    font-size: 30px;
  }
`;

const Footer = styled.div`
  display: block;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    display: none;
  }
`;
const FooterMobile = styled.div`
  display: none;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    display: block;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Content = styled.div`
  flex: 1;
  overflow-y: scroll;
  @media (min-width: ${bps["sm"]}px) {
    padding-left: 12px;
    padding-right: 12px;
  }
  @media (min-width: ${bps["md"]}px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (min-width: ${bps["lg"]}px) {
  }
  @media (min-width: ${bps["xl"]}px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media (min-width: ${bps["2xl"]}px) {
  }
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 32px;
  padding-right: 32px;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    flex-direction: column;
    gap: 24px;
  }
`;
const FlexContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;
const ButtonCustom = styled(Button)`
  height: 40px;
  border-radius: 6px;
  background: #ffffff !important;
  color: #102a47 !important;
  box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.06) !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 10px 24px;
`;

const ButtonCustomBack = styled(Button)`
  height: 40px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: justify;
  color: #102a47;
  padding: 10px 24px;
  border: none !important;
`;

const ButtonQuote = styled(Button)`
  height: 40px;
  border-radius: 6px;
  color: #ffffff !important;
  background: #102a47 !important;
  box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.12) !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 10px 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const ButtonGroup2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 24px;
`;

export default PlaceOrderLayOut;
