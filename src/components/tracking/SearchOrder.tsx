import { ApolloError } from "@apollo/client";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { isArray, isEmpty } from "lodash";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useGetOrderQuery } from "../../generated/graphql";
import { SVGSearch } from "../../svgs/SVGSearch";
import { EOrderStatus } from "../../types/EOrderStatus";
import { ISearchOrderRes, Stop } from "../../types/ISearchOrderRes";
import { formatDate, formatTime } from "../../utils/datetime";
import { COLORS } from "../common/Constants";
import { Loading } from "../common/Loading";
import { Table } from "../common/Table/Table";

interface SearchOrderProps {
  children?: Element;
  orderNumber: string;
  setOrderNumber: Function;
}

const SearchOrder: React.FC<SearchOrderProps> = ({
  orderNumber,
  setOrderNumber,
}) => {
  const [orderNumberInput, setOrderNumberInput] = useState<string>("");
  const [stopName, setStopName] = useState<string>("");
  const [orderNumberSearch, setOrderNumberSearch] = useState<string>("");
  const { data, loading, error } = useGetOrderQuery({
    variables: {
      input: {
        OrderNumber: orderNumberSearch,
      },
    },
    skip: !orderNumberSearch,
    fetchPolicy: "no-cache",
  }) as unknown as {
    data: ISearchOrderRes;
    loading: boolean;
    error: ApolloError | undefined;
  };
  useEffect(() => {
    // set Order number ?? data must array
    if (orderNumberSearch) {
      setOrderNumber(orderNumberSearch);
    }
  }, [data, orderNumberSearch, setOrderNumber]);
  const renderSearchResults = () => {
    if (!orderNumberSearch) {
      return (
        <ResultDefaultContainer>
          <div>
            <ImgTruck
              alt="truck"
              src={process.env.PUBLIC_URL + "/images/truck.png"}
            />

            <ResultHere>
              Once you search for an order your results will appear here
            </ResultHere>
          </div>
        </ResultDefaultContainer>
      );
    }
    if (loading) {
      return (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      );
    }
    if (error) {
      return <div>Error...</div>;
    }

    if (!data?.getOrder?.Order) {
      return (
        <div>
          <NumberOfOrderFound count={0} />
          <Spacer height={40} />

          <NotFoundLabel data-testid="lable-not-found">
            We couldn’t find any order! Please change the search parameters
          </NotFoundLabel>
        </div>
      );
    }

    const orders = [data?.getOrder?.Order];

    const dataTable = orders.map((order) => {
      const stop = order?.Stops?.Stop;
      const stops = isArray(stop) ? stop : stop ? [stop] : [];
      stops.sort((a: any, b: any) => {
        const timeA = new Date(a["@ScheduledDateTime"])?.getTime();
        const timeB = new Date(b["@ScheduledDateTime"])?.getTime();
        return timeA - timeB;
      });
      const firstStop = stops.find(
        (stop: any = {}) => stop["@StopType"] === "P"
        // eslint-disable-next-line no-useless-computed-key
      ) || { ["@ScheduledDateTimeTZ"]: "" };
      const timezone = firstStop["@ScheduledDateTimeTZ"] || "";
      const lastStop = [...stops]
        .reverse()
        .find((stop: any = {}) => stop["@StopType"] === "D") || {
        // eslint-disable-next-line no-useless-computed-key
        ["@ScheduledDateTimeTZ"]: "",
      };
      const timezoneETA = lastStop["@ScheduledDateTimeTZ"] || "";
      return {
        "Order #": order["@OrderID"],
        Status: order["@OrderStatus"],
        Dispatched: order["@DispatchDateTime"],
        "Due by": order["@DueDateTime"],
        ETA: (() => {
          const getETA = (listStop: Stop[]) => {
            if (isEmpty(listStop)) {
              return "";
            }
            return listStop![listStop!?.length - 1]["@ScheduledDateTime"] || "";
          };
          return getETA(order?.Stops?.Stop);
        })(),
        Timezone: timezone,
        TimezoneETA: timezoneETA,
      };
    });
    return (
      <div>
        <NumberOfOrderFound count={1} />
        <Spacer height={16} />
        <div className=" ">
          <Table
            role="table-search-order"
            fnCheckActiveRow={(row: any) => {
              return row["Order #"] === orderNumber;
            }}
            onRowClick={(orderNumber: string) => {
              setOrderNumber(orderNumber);
            }}
            isLoading={false}
            dataSource={dataTable}
            headerColumns={[
              { isSort: false, text: "Order #" },
              { isSort: false, text: "Status" },
              { isSort: false, text: "Dispatched" },
              { isSort: false, text: "Due by" },
              { isSort: false, text: "ETA" },
            ]}
            bodyColumns={[
              {
                renderKey: "Order #",
                render: (order: string) => {
                  return (
                    <div
                      className={css`
                        font-size: 15px;
                        line-height: 20px;
                        text-align: justify;
                        color: #102a47;
                      `}
                    >
                      {order}
                    </div>
                  );
                },
              },
              {
                renderKey: "Status",
                render: (orderStatus: keyof typeof EOrderStatus) => {
                  return <ButtonOrderStatus status={orderStatus} />;
                },
              },
              {
                renderKey: "Dispatched",
                render: (dispatchDate: string, order: any) => {
                  return (
                    <DateAndTime
                      date={dispatchDate}
                      orderNumber={order["Order #"]}
                      type={"dispatched"}
                      timezone={order?.Timezone}
                    />
                  );
                },
              },
              {
                renderKey: "Due by",
                render: (dueDate: string, order: any) => {
                  return (
                    <DateAndTime
                      orderNumber={order["Order #"]}
                      type={"due"}
                      date={dueDate}
                      timezone={order?.TimezoneETA}
                    />
                  );
                },
              },

              {
                renderKey: "ETA",
                render: (eta: any, order: any) => {
                  return (
                    <DateAndTime
                      date={eta}
                      orderNumber={order["Order #"]}
                      type={"eta"}
                      timezone={order?.TimezoneETA}
                    />
                  );
                },
              },
            ]}
            idKey="Order #"
          />
        </div>
      </div>
    );
  };

  return (
    <div className=" ">
      <TitlePage>Track Order</TitlePage>

      <SubtitlePage>
        Find your order using the search bar and follow it using the map on the
        right.
      </SubtitlePage>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOrderNumberSearch(orderNumberInput);
        }}
      >
        <FormContainer>
          <InputWithLabel
            data-testid="number-search"
            label="Order number"
            placeholder="e.g. 19470"
            value={orderNumberInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOrderNumberInput(e.target.value);
            }}
            disabled={false}
          />

          <DivideLine />

          <InputWithLabel
            label="Stop name"
            placeholder="e.g. John Smith"
            value={stopName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStopName(e.target.value);
            }}
            disabled
          />

          <SubmitButton type="submit" role="submit" data-testid="input-search">
            <SVGSearch />
          </SubmitButton>
        </FormContainer>
      </form>
      {renderSearchResults()}
    </div>
  );
};

const InputWithLabel = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}) => {
  return (
    <InputContainer>
      <Label htmlFor="order_number">{label}</Label>

      <StyledInput
        placeholder={placeholder}
        name="order_number"
        id="order_number"
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </InputContainer>
  );
};

const NumberOfOrderFound = ({ count }: { count: number }) => {
  return (
    <NumberOfOrderFoundContainer>
      <img alt="" src={process.env.PUBLIC_URL + "/images/refresh.png"} />
      <OrdersFoundText>
        {count} order{count === 1 ? "" : "s"} found
      </OrdersFoundText>
      <Line />
    </NumberOfOrderFoundContainer>
  );
};

export const ButtonOrderStatus = ({
  status,
}: {
  status: keyof typeof EOrderStatus;
}) => {
  let bgc = "";
  let color = "";
  switch (status) {
    case "N":
      bgc = "rgba(16, 42, 71, 0.1)";
      color = COLORS.DarkestGreyA47;
      break;

    case "A":
    case "I":
    case "P":
      bgc = "#E9F6F0";
      color = COLORS.Green567;
      break;

    case "X":
      bgc = "rgba(255, 129, 78, 0.1)";
      color = " #FF884E";
      break;
  }
  return (
    <StyledButtonOrderStatus
      bgc={bgc}
      color={color}
      data-testid={`button-status`}
    >
      {EOrderStatus[status]}
    </StyledButtonOrderStatus>
  );
};

const DateAndTime = ({
  date,
  orderNumber,
  type,
  timezone = "",
}: {
  date: string;
  orderNumber: string;
  type: "dispatched" | "due" | "eta";
  timezone?: string;
}) => {
  if (!date) {
    return <div data-testid={`empty-${type}-${orderNumber}`}>-</div>;
  }
  return (
    <div data-testid={`not-empty-${type}-${orderNumber}`}>
      <StyledDate>{formatDate(date)}</StyledDate>
      <StyledTime>
        {formatTime(date)} {timezone || ""}
      </StyledTime>
    </div>
  );
};

export { SearchOrder };

const ResultDefaultContainer = styled.div`
  height: calc(100vh - 215px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const ImgTruck = styled.img`
  width: 208px;
  height: auto;
  margin-bottom: 24px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #e2e8f0;
`;

const ResultHere = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #8da4be;
`;

const NotFoundLabel = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #8da4be;
`;

export const TitlePage = styled.div`
  font-size: 30px;
  line-height: 35px;
  text-align: justify;
  color: #102a47;
  font-weight: 600;
  margin-bottom: 4px;
`;

const SubtitlePage = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #576f8b;
  margin-bottom: 24px;
`;

const FormContainer = styled.div`
  background: #ffffff;
  border: 1px solid #cbd0df;
  box-shadow: 0px 1px 1px rgba(44, 58, 110, 0.06);
  border-radius: 6px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px;
`;

const DivideLine = styled.div`
  background: #cfd4df;
  width: 1px;
  height: 40px;
  margin-left: 4px;
  margin-right: 4px;
`;

const SubmitButton = styled.button`
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: #14305a;
  border: 1px solid rgba(0, 0, 0, 0.202387);
  box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.12);
  border-radius: 6px;
`;

const InputContainer = styled.div`
  width: 100%;
  background: #fff;
  &:hover {
    background: #f4f5f7;
  }
  border-radius: 6px;
  padding: 8px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 16px;
  color: #102a47;
`;

const StyledInput = styled.input`
  background: transparent;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  color: #102a47;
  &::placeholder {
    color: #8da4be;
  }
`;

const NumberOfOrderFoundContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const OrdersFoundText = styled.p`
  font-size: 16px;
  line-height: 20px;
  text-align: justify;
  color: #000a44;
  margin-left: 9px;
  margin-right: 4px;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background: #cbd0df;
  margin-top: 2px;
`;

const StyledButtonOrderStatus = styled.span<{ bgc: string; color: string }>`
  padding: 4px 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  background: ${(props) => props.bgc};
  border-radius: 4px;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.color};
`;
const StyledDate = styled.div`
  font-size: 15px;
  line-height: 20px;
  text-align: justify;
  color: #102a47;
  margin-bottom: 2px;
`;

const StyledTime = styled.div`
  font-size: 14px;
  line-height: 20px;
  text-align: justify;
  color: #8da4be;
`;

const Spacer = styled.div<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height + "px"};
`;
