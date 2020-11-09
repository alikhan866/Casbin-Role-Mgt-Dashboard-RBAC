import React from "react";
import "./App.css";
import Tabs from "./components/Tabs/Tabs";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { hostname } from "./constants/constants";

const client = new ApolloClient({
  uri: `${hostname}/graphql`,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Tabs />
    </ApolloProvider>
  );
};

export default App;
