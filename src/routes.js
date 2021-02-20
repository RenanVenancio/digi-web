import { Route, Switch, BrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import ProductSearch from "./Pages/ProductSearch";
import FinishOrder from "./Pages/FinishOrder";
import Navbar from "./Components/Navbar";
import Company from "./Pages/Company";
import Orders from "./Pages/Orders";
import Products from "./Pages/Products";

export default function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Switch>
        <Route path="/:company/" exact component={Main} />
        <Route path="/:company/productsearch" exact component={ProductSearch} />
        <Route path="/:company/finish" exact component={FinishOrder} />
        <Route path="/:company/company/edit" exact component={Company} />
        <Route path="/:company/orders" exact component={Orders} />
        <Route path="/:company/products" exact component={Products} />
      </Switch>
    </BrowserRouter>
  );
}
