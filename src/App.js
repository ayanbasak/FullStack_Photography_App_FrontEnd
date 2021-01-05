import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from "./components/NavBar";
import Home from "./components/Home/Home";
//import Register from "./components/Register";
//import SignIn from "./components/SignIn";
import SignIn from "./components/UserManagement/SignIn";
import { RecoilRoot } from "recoil";
import Catalog from "./components/cart/components/Catalog";
import Cart from "./components/admin/Cart/Cart";
import CartList from "./components/admin/Cart/CartList";
import LoadProduces from "./components/products/LoadProduces";
import Tile from "./components/admin/Tile/Tile";
import OrderedItems from "./components/admin/OrderedItems/OrderedItems";
import OrderedItemsList from "./components/admin/OrderedItems/OrderedItemsList";
import TileList from "./components/admin/Tile/TileList";
import AdminWorkbox from "./components/admin/AdminWorkbox";
import CartBox from "./components/cart/components/CartBox";
import RecivedOrder from "./components/cart/components/RecivedOrder";
import User from "./components/admin/User/User";
import UserList from "./components/admin/User/UserList";

import { Provider } from "react-redux";
import store from "./store";

import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import ContactUs from "./components/admin/ContactUs/ContactUs";
import ContactUsList from "./components/admin/ContactUs/ContactUsList";
import { ContactUsForm } from "./components/Home/ContactUsForm";
import UserUpdate from "./components/UserUpdate";
import TileListPagi from "./components/admin/Tile/TileListPagi";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RecoilRoot>
          <Router basename="/">
            <div className="App">
              <CssBaseline />
              <NavBar />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={SignIn} />




                {/*  <Route exact path="/Register" component={Register} />   */}
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/view/update/MyProfile" component={UserUpdate} />


                <Route exact path="/catalog" component={Catalog} />
                <Route path="/cartbox" component={CartBox} />
                <Route path="/recivedOrder" component={RecivedOrder} />
                <Route path="/products" component={LoadProduces} />

                {/*      admin links     */}
                <Route path="/admin" exact component={AdminWorkbox} />

                <Route path="/addContactUs" exact component={ContactUs} />
                <Route path="/editContactUs/:id" exact component={ContactUs} />
                <Route path="/ContactUsList" exact component={ContactUsList} />

                <Route path="/addUser" exact component={User} />
                <Route path="/editUser/:id" exact component={User} />
                <Route path="/listUser" exact component={UserList} />

                <Route path="/addTile" exact component={Tile} />
                <Route path="/editTile/:id" exact component={Tile} />
                <Route path="/TileList" exact component={TileList} />

                <Route path="/addCart" exact component={Cart} />
                <Route path="/editCart/:id" exact component={Cart} />
                <Route path="/CartList" exact component={CartList} />

                <Route path="/addOrderedItems" exact component={OrderedItems} />
                <Route path="/editOrderedItems/:id" exact component={OrderedItems} />
                <Route path="/OrderedItemsList" exact component={OrderedItemsList} />


              </Switch>

            </div>
          </Router>
        </RecoilRoot>
      </Provider>
    );
  }
}

export default App;
