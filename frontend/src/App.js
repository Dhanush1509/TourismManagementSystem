import logo from "./logo.svg";
import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";
import Appbar from "./components/layout/Appbar";
import Home from "./pages/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Editor from "./pages/Editor";

import Main from "./pages/Main";
import SingleArticle from "./pages/SingleArticle";
import AuthState from "./context/Auth/AuthState";
import AlertState from "./context/Alert/AlertState";
import ArticleState from "./context/Article/ArticleState";
import PackageState from "./context/Package/PackageState";
import Alerts from "./components/layout/Alerts";
import Admin from "./pages/Admin";
import Package from "./components/Package";
import Packages from "./pages/Packages";
import Users from "./pages/Users";
import SinglePackage from "./pages/SinglePackage";
import UserPackages from "./pages/MultiplePackages";
import PackageForm from "./pages/PackageForm";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrder from "./pages/PlaceOrder";
import OrderState from "./context/Order/OrderState";
import Ticket from "./pages/Ticket";
import UserDetails from "./pages/UserDetails";
import AdminOrders from "./pages/AdminOrders"
function App() {
  return (
    <div className="App">
      <AuthState>
        <ArticleState>
          <PackageState>
            <OrderState>
              {" "}
              <AlertState>
                <Router>
                  <Appbar />
                  <Alerts />
                  <Switch>
                    <Route
                      exact
                      path="/article/:articleid"
                      component={SingleArticle}
                    />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/editor" component={Editor} />
                    <Route exact path="/articles" component={Home} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/package/create" component={Package} />
                    <Route exact path="/admin/packages" component={Packages} />
                    <Route exact path="/packages" component={UserPackages} />
                    <Route exact path="/admin/users" component={Users} />
                    <Route
                      exact
                      path="/packages/:packageid"
                      component={SinglePackage}
                    />
                    <Route exact path="/buypackage" component={PackageForm} />
                    <Route exact path="/payment" component={PaymentPage} />
                    <Route exact path="/placeorder" component={PlaceOrder} />
                    <Route exact path="/" component={Main} />
                    <Route exact path="/tickets/:orderId/ticket/download" component={Ticket}/>

                    <Route exact path="/admin/orders" component={AdminOrders}/>
                    <Route exact path="/profile" component={UserDetails}/>
                  </Switch>
                </Router>
              </AlertState>
            </OrderState>
          </PackageState>
        </ArticleState>
      </AuthState>
    </div>
  );
}

export default App;
