import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws';

const GRAPHQL_ENDPOINT =
  'https://api.graph.cool/simple/v1/cj3g3v2hp18ag01621354vr2y';
const GRAPHQL_WEBSOCKET_ENDPOINT =
  'wss://subscriptions.graph.cool/v1/cj3g3v2hp18ag01621354vr2y';

const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });
const wsClient = new SubscriptionClient(GRAPHQL_WEBSOCKET_ENDPOINT, {
  reconnect: true
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
