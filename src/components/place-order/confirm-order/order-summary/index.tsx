import styled from "@emotion/styled";
import moment from "moment";
import Address from "./components/Address";
import OrderBillingInfomation from "./components/OrderBillingInfomation";
import OrderEzShip from "./components/OrderEzShip";
import OrderNotifications from "./components/OrderNotifications";
import OrderPackageDetails from "./components/OrderPackageDetails";
import OrderQuote from "./components/OrderQuote";
import OrderReferences from "./components/OrderReferences";

const OrderSummary = ({ values }: { values?: any }) => {
  const items = values?.Order?.Stops?.Stop?.find(
    (v: any) => v["@StopType"] === "P"
  );
  const customer = values?.Order?.Customer?.CustomerBillingTypes;
  const reference = values?.Order?.Customer?.CustomerReferences?.Reference;
  return (
    <Container>
      <Card>
        <Title> Order Summary</Title>
        <Title2 className="mt-6">Address</Title2>
        <Address values={values?.Order} />
      </Card>
      <Line />

      <Card>
        <Title>Order Details</Title>
        <Title2 className="mt-6 mb-2">Delivery Date</Title2>
        <Title3>
          {moment(items?.["@ScheduledDateTime"]).format(
            "dddd, MMMM Do YYYY, h:mm:ss A"
          )}
        </Title3>
        <Title2>
          <Magin32>Package Details</Magin32>
        </Title2>
        <OrderPackageDetails values={values?.Order} />
        <Title2>
          <Magin32> Order References</Magin32>
        </Title2>
        <OrderReferences value={reference || []} />
      </Card>
      <Line />

      <Card>
        <Title>Billing</Title>

        <Title2>
          <Magin32>Billing Information</Magin32>
        </Title2>

        <OrderBillingInfomation values={customer} />

        <Title2>
          <Magin32>Notifications</Magin32>
        </Title2>

        <OrderNotifications />

        <Title2>
          <Magin32>Ez Ship</Magin32>
        </Title2>
        <OrderEzShip />
      </Card>
      <Line />

      <Card>
        <QuoteContainer>Quote</QuoteContainer>
        <OrderQuote />
      </Card>
      <Line />
    </Container>
  );
};

const Container = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 1px 0 rgba(44, 58, 110, 0.06);
  border: solid 1px #cbd0df;
  background-color: #fff;
`;

const Card = styled.div`
  padding: 24px;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #102a47;
`;
const QuoteContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 28px;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #102a47;
`;
const Magin32 = styled.div`
  margin-top: 32px;
  margin-bottom: 8px;
`;
const Title2 = styled.p`
  font-family: BasierCircle;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;
const Title3 = styled.p`
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

const Line = styled.div`
  height: 1px;
  flex-grow: 0;
  background-color: #dadee2;
`;
export default OrderSummary;
