export const login = /*GraphQL*/ `
    mutation Login($input: LoginInput!) {
        login(input: $input)
        @rest(
          type: "LoginResponse"
          path: "/Login"
          method: "POST"
        ) {
            status
            UserGUID
        }
    }
`;
