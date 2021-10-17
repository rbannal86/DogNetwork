import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, gql } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://fair-spaniel-17.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_X_HASURA_ADMIN_SECRET,
    'content-type': 'application/json',
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

client.query({
  query: gql`
    query dogQuery {
        dogs(where: {deactivated: {_is_null: true}}) {
        id
        name
        age
        breedByBreed {
              id
              name
              size
          }
        }
    }
`
}).then(res => console.log(res))


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
