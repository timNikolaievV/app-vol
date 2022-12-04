import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Storages from "./storage/Storages";
import NewStorage from "./storage/NewStorage";
import EditStorage from "./storage/EditStorage";
import Storage from "./storage/Storage";

import Queries from "./query/Queries";
import NewQueries from "./query/NewQuery";

import Categories from "./category/Categories";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />

        <PrivateRoute path="/storage/new" component={NewStorage} />
        <PrivateRoute path="/storage/edit/:storageId" component={EditStorage} />
        <PrivateRoute path="/storage/:storageId" component={Storage} />
        <PrivateRoute path="/storages" component={Storages} />

        <PrivateRoute path="/category" component={Categories} />

        <PrivateRoute path="/query/new" component={NewQueries} />
        <PrivateRoute path="/queries" component={Queries} />
      </Switch>
    </div>
  );
};

export default MainRouter;
