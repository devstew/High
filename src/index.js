import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory, applyRouterMiddleware } from "react-router";
import Routes from "./routes/";
import registerServiceWorker from "./registerServiceWorker";
import Relay from "react-relay";
import userRelay from "react-router-relay";
import { RelayNetworkLayer, urlMiddleware } from "react-relay-network-layer";
import { relayApi } from "./config/endpoints";
import auth from "./utils/auth";

const createHeaders = () => {
  let idToken = auth.getToken();
  if (idToken) {
      return {
        'Authorization': `Bearer ${idToken}`
      }
  } else {
    return {};
  }
};

Relay.injectNetworkLayer(
  new RelayNetworkLayer(
    [
      urlMiddleware({
        url: req => relayApi
      }),
      next => req => {
        req.headers = {
          ...req.heaeders,
          ...createHeaders()
        };
        return next(req);
      }
    ],
    {
      disableBatchQuery: true
    }
  )
);

ReactDOM.render(
  <Router 
  environment={Relay.Store}
  render={applyRouterMiddleware(userRelay)}
  history={browserHistory} routes={Routes} />,
  document.getElementById("root")
);
registerServiceWorker();
