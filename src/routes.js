import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AdminMenu from "./Components/AdminMenu";
import CompanyList from "./Components/CompanyList";
import ContextLoader from "./Components/ContextLoader";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import Company from "./Pages/Company";
import Dashboard from "./Pages/Dashboard";
import FinishedOrder from "./Pages/FinishedOrder";
import FinishOrder from "./Pages/FinishOrder";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import OrderDetail from "./Pages/OrderDetail";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import ProductSearch from "./Pages/ProductSearch";
import SearchCompanyDomain from "./Pages/SearchCompanyDomain";
import User from "./Pages/User";

// POSSUI MENU ADMIN
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("@digi-app/autheticatedUser/") !== null ? (
          <>
            <ContextLoader company={props.match.params.company} />
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect to={{ pathname: `/admin/company/search/` }} />
          </>
        )
      }
    />
  );
};

// POSSUI NAVBAR
const ClientRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <ContextLoader company={props.match.params.company} />
          <Navbar>
            <Component {...props} />
          </Navbar>
        </>
      )}
    />
  );
};

// SEM NAVBAR
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <ContextLoader company={props.match.params.company} />
          <Component {...props} />
        </>
      )}
    />
  );
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ClientRoute path="/" exact component={CompanyList} />
        <ClientRoute path="/:company/" exact component={Main} />
        <ClientRoute
          path="/:company/productsearch/"
          exact
          component={ProductSearch}
        />
        <ClientRoute path="/:company/finish/" exact component={FinishOrder} />
        <ClientRoute path="/:company/finished/" exact component={FinishedOrder} />
        <ClientRoute path="/:company/orders/" exact component={(props) => <Orders {...props} adminPerspective={false} />} />
        <ClientRoute
          path="/:company/orders/order/:id/"
          exact
          component={OrderDetail}
        />
        <ClientRoute path="/:company/users/user/" exact component={User} />

        <AuthRoute path="/:company/admin/login/" exact component={Login} />
        <Route
          path="/admin/company/search/"
          exact
          component={SearchCompanyDomain}
        />

        <AdminMenu>
          <PrivateRoute
            exact
            path="/:company/admin/dashboard/"
            component={Dashboard}
          />
          <PrivateRoute
            exact
            path="/:company/admin/products/"
            component={ProductList}
          />
          <PrivateRoute
            path="/:company/admin/products/product/:id/"
            exact
            component={Product}
          />
          <PrivateRoute
            path="/:company/admin/products/product/"
            exact
            component={Product}
          />
          <PrivateRoute
            path="/:company/admin/company/edit/"
            exact
            component={Company}
          />
          <PrivateRoute
            path="/:company/admin/orders/"
            exact
            component={(props) => <Orders {...props} adminPerspective={true} />}
          />
          <PrivateRoute
            path="/:company/admin/orders/order/:id/"
            exact
            component={OrderDetail}
          />
        </AdminMenu>
      </Switch>
    </BrowserRouter>
  );
}
