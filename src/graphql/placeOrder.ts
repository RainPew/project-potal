export const getQuoteOrder = /*GraphQL*/ `
  mutation GetQuoteOrder($input: QuoteOrderInput!) {
        GetQuoteOrder(input: $input)
        @rest(
          path: "/QuoteOrder"
          method: "POST"
        ) {
          mQuoteOrderResponse
        }
    }
`;

export const saveOrders = /*GraphQL*/ `
  mutation saveOrders($input: QuoteOrderInput!) {
    saveOrders(input: $input)
        @rest(
          path: "/SaveOrder"
          method: "POST"
        ) {
          Order
        }
    }
`;
