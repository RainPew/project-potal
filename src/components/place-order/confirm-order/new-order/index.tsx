import styled from "@emotion/styled";

const NewOrder = () => {
  return (
    <Container data-testid="new-order">
      <Card>
        <FlexContainer>
          <img src="/images/20px_Order.svg" alt="print" />
          <Title> Place a new order</Title>
        </FlexContainer>
        <Title2> Place a new blank or pre-filled order</Title2>
      </Card>
      <Line />

      <Sections>
        <HoverContainer>
          <Links> Order from same pickup address</Links>
          <img src="/images/arrow-right.svg" alt="arrow-right" />
        </HoverContainer>
      </Sections>
      <Line />

      <Sections>
        <HoverContainer>
          <Links> Order round trip</Links>
          <img src="/images/arrow-right.svg" alt="arrow-right" />
        </HoverContainer>
      </Sections>
      <Line />

      <Sections>
        <HoverContainer>
          <Links> Order from default location</Links>
          <img src="/images/arrow-right.svg" alt="arrow-right" />
        </HoverContainer>
      </Sections>
      <Line />

      <Sections>
        <HoverContainer>
          <Links> Order from a new location</Links>
          <img src="/images/arrow-right.svg" alt="arrow-right" />
        </HoverContainer>
      </Sections>
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

const Line = styled.div`
  height: 1px;
  flex-grow: 0;
  background-color: #dadee2;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const HoverContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  :hover {
    border-radius: 6px;
    background-color: #ecf0ff;
  }
`;

const Links = styled.p`
  font-family: BasierCircle;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: #406aff;
  cursor: pointer;
`;

const Sections = styled.div`
  height: 56px;
  padding: 0px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Title = styled.p`
  font-family: BasierCircle;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;

const Title2 = styled.p`
  font-family: BasierCircle;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #576f8b;
  margin-top: 12px;
`;
export default NewOrder;
