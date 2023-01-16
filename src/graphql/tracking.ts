export const GetJsonOrder = /*GraphQL*/ `
    mutation GetJsonOrder($input: GetOrderInput!) {
        GetJsonOrder(input: $input)
        @rest(
          path: "/GetJsonOrder"
          method: "POST"
        ) {
            Order
        }
    }
`;
