import React, { useEffect, useState } from "react";

import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Header from "./Component/Header";
import EmployeeList from "./Component/EmployeeList";


// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path }) => {
//       alert(`Graphql error ${message}`);
//     });
//   }
// });

// const link = from([
//   errorLink,
//   new HttpLink({
//     uri: "http://localhost:5000/graphql", credentials: 'same-origin',
//     credentials: true
//   }),
// ]);

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "http://localhost:5000/graphql",
//   credentials: 'same-origin',
//   credentials: true
// });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        prohects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})
function App() {



  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <EmployeeList />
        {/* <Form /> */}
      </ApolloProvider>
    </>
  );
}

export default App;
