import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// const httpLink = new HttpLink({ uri: "https://api.lens.dev" });
// was originally^^
const httpLink = new HttpLink({ uri: "https://api-mumbai.lens.dev" });
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("lens_auth_token");

  if (token != null) {
    operation.setContext({
      headers: {
        "x-access-token": `Bearer ${token}`,
      },
    });
  }

  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
