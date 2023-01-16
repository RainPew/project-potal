export const getOrder = /*GraphQL*/ `
    query GetOrder($input: GetOrderInput!) {
        getOrder(input: $input)
        @rest(
          type: "GetOrderResponse"
          path: "/GetJsonOrder"
          method: "POST"
        ) {
            Order
        }
    }
`;
