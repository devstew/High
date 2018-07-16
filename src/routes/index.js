import React from "react";
import { Route, IndexRoute } from "react-router";
//import { template } from "handlebars";
import Template from "../containers/Template";
import HighApp from "../containers/HighApp";
import Profile from "../containers/Profile";
import Relay from 'react-relay'
import auth from '../utils/auth'
const ViewerQueries = {
  viewer: () => Relay.QL`query {viewer}`
}

const createRoutes = () => {
  return (
    <Route
      path='/' 
      component={Template}
      queries={ViewerQueries}
      auth={auth}
      >
      <IndexRoute 
      component={HighApp}
      queries={ViewerQueries}
      />
      <Route 
      path={"/profile"} 
      queries={ViewerQueries}
      component={Profile} />
    </Route>
  );
};

const Routes = createRoutes();

export default Routes;
