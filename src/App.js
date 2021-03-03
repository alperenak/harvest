import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CookieConsent from 'react-cookie-consent-notification';
import { useParams } from "react-router-dom";

/*** Components ***/
import TopBar from "./Components/TopBar";
import SubBar from "./Components/SubBar";
import LoadingModal from "./Components/LoadingModal";
import store from "./store";
import { getCookie, setCookie, eraseCookie } from "./utils/cookie";

/*** Screens ***/
import Home from "./Pages/Home";
import Departments from "./Pages/Departments";
import ProductDetail from "./Pages/ProductDetail";
import AccountSettings from "./Pages/AccountSettings";
import Addresses from "./Pages/Addresses";
import PaymentMethods from "./Pages/PaymentMethods";
import Notifications from "./Pages/Notifications";
import FoodCourt from "./Pages/FoodCourt";
import FoodCourts from "./Pages/FoodCourts";
import GiftsCredits from "./Pages/GiftsCredits";
import Orders from "./Pages/Orders";
import Checkout from "./Pages/Checkout";
import RequestNow from "./Pages/Checkout/RequestNow";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AddCard from "./Pages/PaymentMethods/addCard";
import EditAccount from "./Pages/AccountSettings/editAccount";
import ChangePassword from "./Pages/AccountSettings/changePassword";
import AddAddress from "./Pages/Addresses/addAddress";
import Modal from "./Components/Modal";

/*** Styles ***/
import styles from "./app.scss";


class App extends React.Component {
  state = {
    isAuthorized: false,
    user: {},
    mainCategories:[],
    items:[],
    recommended:[],
    userType: "",
    loading: true,
    consentTaken: false,
    modal: {
      header: "",
      declaration: "",
      size: 'small',
      backgroundColor: '#fff',
      content: {},
      buttons: [],
      visibility: false,
      isInternshipBegun: false,
      /*default: null*/
      selectedJobID: '',
    }

  };
  async componentDidMount() {
    this.setState({ loading:false });
    var marketType = localStorage.getItem("marketType")
    if(!marketType){
      localStorage.setItem("marketType", "harvest-market")
    }
  }

  createModal = ({ header, declaration, backgroundColor = '#fff', content, buttons, size = 'small' }) => {
    this.setState({
      modal: { header, declaration, backgroundColor, content, buttons, size, visibility: true },
    });
  };

  closeModal = () => {
    this.setState({
      modal: { header: "", declaration: "", backgroundColor: '#fff', size: 'small', visibility: false },
    });
  };

  getUser = async () => {
    if (getCookie("token")) {
      let res = await store.getUser(getCookie("user_id"), getCookie("auth_token"));
      if (res.status && res.status === 200) {
        this.setState({
          user: res.data,
          isAuthorized: true
        });
        return res;
      }
    } else {
      eraseCookie(["token", "user", "user_id"]);
      this.setState({ isAuthorized: false });
    }
  };

  checkStatus = (status) => {
    if (status) {
      this.setState({ consentTaken: true })
    }
  }

  render() {
    let { loading, user, modal, recommended, items, mainCategories } = this.state;
    const cookieClass = this.state.consentTaken ? `${"hidden"} ${"myCookie"}` : "myCookie"
    const appClass = this.state.consentTaken ? `${"App"} ${"fullScreen"} ` : `${"App"} ${"fullScreen"}`

    return (
      <div className={appClass}>
        {loading == true &&
          <LoadingModal text="Loading" />
        }
        <Router>
          <Route
            path="/"
            render={(props) => (
              <div>
                <TopBar
                  {...props}
                />
                <SubBar
                  {...props}
                />
              </div>
            )}
          />
          {
            modal.visibility &&
					<Modal
						header={modal.header}
						modalSize={modal.size}
						backgroundColor={modal.backgroundColor}
						declaration={modal.declaration}
						closeModal={this.closeModal}
						content={modal.content}
						buttons={modal.buttons}
					/>
          }
          <Switch>
            <Route
              exact path="/"
              render={(props) => (
                <Home
                  items={items}
                  mainCategories={mainCategories}
                  recommended={recommended}
                  {...props}
                />
              )}  
            />
            <Route
              path="/Register">
              <Home />
            </Route>
            <Route
              path="/Departments/:id"
              render={(props) => (
                <Departments
                  {...props}
                />
              )}
            />
            <Route
              path="/Departments/"
              render={(props) => (
                <Departments
                  {...props}
                />
              )}
            />
            <Route
              path="/FoodCourts/"
              render={(props) => (
                <FoodCourts
                  {...props}
                />
              )}
            />
            <Route
              path="/ProductDetail/:id"
              render={(props) => (
                <ProductDetail
                  {...props}
                />
              )}
            />
            <Route
              path="/Checkout"
              render={(props) => (
                <Checkout
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/RequestNow"
              render={(props) => (
                <RequestNow
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/FoodCourt/:id"
              render={(props) => (
                <FoodCourt
                  {...props}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                />
              )}
            />
            <Route
              path="/Search/:query"
              render={(props) => (
                <Departments
                  {...props}
                />
              )}
            />
            <Route
              path="/Search/"
              render={(props) => (
                <Departments
                  {...props}
                />
              )}
            />
            <Route
              path="/AccountSettings"
              render={(props) => (
                <AccountSettings
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/Addresses"
              render={(props) => (
                <Addresses
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/AddAddress"
              render={(props) => (
                <AddAddress
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/PaymentMethods"
              render={(props) => (
                <PaymentMethods
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/ChangePassword"
              render={(props) => (
                <ChangePassword
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/EditAccount"
              render={(props) => (
                <EditAccount
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/AddCard"
              render={(props) => (
                <AddCard
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/Notifications"
              render={(props) => (
                <Notifications
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/Orders"
              render={(props) => (
                <Orders
                  user={this.getUser}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}  
            />
            <Route
              path="/Gifts"
              render={(props) => (
                <GiftsCredits
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
					<Route
						path="/Login"
						render={(props) => (
							<Login
								closeModal={this.closeModal}
								createModal={this.createModal}
								{...props}
							/>
						)}
					/>
					<Route
						path="/SignUp"
						render={(props) => (
							<SignUp
								closeModal={this.closeModal}
								createModal={this.createModal}
								{...props}
							/>
						)}
					/>
          </Switch>
        </Router>
        <CookieConsent
          consentFunction={this.checkStatus}
          className={cookieClass}
          buttonText={'Allow'}
          buttonBackground={'#EFF2FC'}
          buttonColor={'#112B49'}
        >
          This website uses cookies to improve
          service, for analytical and advertising purposes.
        Please read our <a href={'/cookies'} style={{ color: '#EFF2FC' }}>Cookie Policy</a>.
        Confirm your consent to the use of cookies.
      </CookieConsent>
      </div>
    );
  }
}

export default App;
