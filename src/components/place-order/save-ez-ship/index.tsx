import { Checkbox } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { Col, Row } from "antd";
import { Controller } from "react-hook-form";
import { Input } from "../../common/Input";
import { usePlaceOrder } from "../PlaceOrderProvider";

const SaveEzShip = () => {
  const { control } = usePlaceOrder().formState || {};

  return (
    <Container data-testid="save-ez-ship">
      <HeadContent>
        <TitleHeader>Save as EZ Ship (optional)</TitleHeader>
      </HeadContent>
      <Content data-margintop="16px">
        <HeadContent2>
          The next time you need this information all fields will be pre-filled.
        </HeadContent2>
      </Content>
      <Content>
        <Controller
          control={control}
          name="SaveEZShip"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <Row justify="space-between" style={{ width: "100%" }}>
              <Col sm={value ? 12 : 24} xs={24}>
                <CheckboxWrapper
                  onChange={onChange}
                  checked={value}
                  data-testid="save-ez-ship-checkbox"
                  large
                >
                  <p>Save as EZ Ship</p>
                </CheckboxWrapper>
              </Col>
              <Col sm={value ? 12 : 0} xs={value ? 24 : 0}>
                <Controller
                  name="SaveEZShipName"
                  control={control}
                  rules={{
                    required: {
                      value: value ? true : false,
                      message: "This is required",
                    },
                  }}
                  defaultValue={""}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      value={value || ""}
                      onChange={onChange}
                      name="SaveEZShipName"
                      data-testid="SaveEZShipName"
                      label=""
                      error={error?.message || ""}
                      placeholder="Write the EZ Ship name"
                    />
                  )}
                />
              </Col>
            </Row>
          )}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 16px 16px 8px 24px;
  border-radius: 6px;
  box-shadow: 0 2px 1px 0 rgba(44, 58, 110, 0.06);
  border: solid 1px #cbd0df;
  background-color: #fff;
  display: inline-block;
  @media only screen and (max-width: 600px) {
    border-radius: 0;
  }
`;

const HeadContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
const HeadContent2 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
`;

const TitleHeader = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;
const Content = styled.div`
  margin-top: ${(props: any) => props["data-margintop"] || "6px"};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
`;

const CheckboxWrapper = styled(Checkbox)`
  width: 100%;
  display: flex !important;
  align-items: center !important;
  padding: 6px;
  padding-left: 32px !important;
  :hover {
    border-radius: 6px;
    background-color: #f4f5f7;
  }
`;

export default SaveEzShip;
