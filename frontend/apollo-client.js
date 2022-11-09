// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
  } from "@apollo/client";
  
  const httpLink = new HttpLink({ uri: "https://api-mumbai.lens.dev/" });
  
  // example how you can pass in the x-access-token into requests using `ApolloLink`
  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    // if your using node etc you have to handle your auth different
    const token = localStorage.getItem("lens_auth_token");
    console.log("token", token);
  
    // Use the setContext method to set the HTTP headers.
    if (token != null) {
      operation.setContext({
        headers: {
          "x-access-token": `Bearer ${token}`,
        },
      });
    }
  
    // Call the next link in the middleware chain.
    return forward(operation);
  });
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  