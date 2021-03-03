import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import ordersIcon from "../../icons/orders-icon.svg";
import accountIcon from "../../icons/account-icon.svg";
import addressesIcon from "../../icons/addresses-icon.svg";
import paymentIcon from "../../icons/payment-icon.svg";
import notificationIcon from "../../icons/notification-icon.svg";
import giftCardsIcon from "../../icons/gift-cards-icon.svg";
import inviteFriendsIcon from "../../icons/invite-friends-icon.svg";
import helpIcon from "../../icons/help-icon.svg";
import logoutIcon from "../../icons/logout-icons.svg";
import LoadingModal from "../../Components/LoadingModal";
import MaskedInput from 'react-text-mask';
import store from "../../store";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import app_config from "../../store/appConfig";

import styles from "./paymentMethods.scss";

class AddCard extends Component {
  state = {
    cvv: "",
    holder: "",
    creditCard: "",
    expiration: "",
    processing: true
  };
  async componentDidMount() {
    if (getCookie("user") === null) {
      window.location.pathname = `/`;
    }
    this.setState({
      processing: false
    });
    window.scrollTo(0, 0);
  }
  saveNewCard = async () => {
    axios.post(app_config.baseUrl + "payment/createCard",{
        cvv:this.state.cvv,
        holder:this.state.holder,
        creditCard:this.state.creditCard,
        expiration:this.state.expiration,
        user_id:getCookie("user_id")
    }).then(async (response) => {
        window.location.pathname = `/PaymentMethods`;
    })
    .catch(function(error) {
        console.log( error );
    });
  };
  render() {
    return (
      <>
        {
          this.state.processing === true &&
          <LoadingModal text="Loading" />
        }
        { this.state.processing !== true &&
          <div className={"PaymentMethods"}>
            <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-xs-12">
              <div className={"PaymentMethods__newBlock"}>
                <div className="container">
                  <ul className={"leftDropMenu"} >
                    <li>
                      <Link to="/Orders">
                        <div className={"dropDownImage"}>
                          <img src={ordersIcon} alt={ordersIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Your Orders
                              </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/AccountSettings">
                        <div className={"dropDownImage"}>
                          <img src={accountIcon} alt={accountIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Account Settings
                              </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Addresses">
                        <div className={"dropDownImage"}>
                          <img src={addressesIcon} alt={addressesIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Addresses
                              </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/PaymentMethods">
                        <div className={"dropDownImage"}>
                          <img src={paymentIcon} alt={paymentIcon} />
                        </div>
                        <div className={"title active"}>
                          Payment Methods
                              </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Notifications">
                        <div className={"dropDownImage"}>
                          <img src={notificationIcon} alt={notificationIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Notification
                              </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Gifts">
                        <div className={"dropDownImage"}>
                          <img src={giftCardsIcon} alt={giftCardsIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Credits, promos & gift cards
                              </div>
                      </Link>
                    </li>
                    <li></li>
                    <li>
                      <Link>
                        <div className={"dropDownImage"}>
                          <img src={inviteFriendsIcon} alt={inviteFriendsIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Invite Friends
                              </div>
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <div className={"dropDownImage"}>
                          <img src={helpIcon} alt={helpIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Help
                              </div>
                      </Link>
                    </li>
                    <li></li>
                    <li>
                      <Link to="/Login">
                        <div className={"dropDownImage"}>
                          <img src={logoutIcon} alt={logoutIcon} />
                        </div>
                        <div className={"menuTitle"}>
                          Logout
                              </div>
                      </Link>
                    </li>
                  </ul>

                </div>

              </div>

            </div>
            <div className="col-md-8 col-lg-8 col-xs-12">
              <div className={"PaymentMethods__block"}>
                <div className="container">
                  <div className="PaymentMethods__block__sectionSubTitle">
                    Add Card
                  </div>

                  <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-xs-12">
                                                        <div className="Checkout__block__subTitle"> Card number </div>
                                                        <div className="Checkout__block__addressInput"> <MaskedInput mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]} className="Checkout__block__addressInput__input" rows="5" onChange={(event) => { this.setState({ creditCard: event.target.value }) }} placeholder="1234 ####  #### ##22" /> </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                                        <div className="Checkout__block__subTitle"> Expiration </div>
                                                        <div className="Checkout__block__addressInput"> <MaskedInput mask={[/\d/, /\d/, '/', /\d/, /\d/]} className="Checkout__block__addressInput__input" rows="5" onChange={(event) => { this.setState({ expiration: event.target.value }) }} placeholder="09/25" /> </div>
                                                    </div>
                                                    <div className="col-md-2 col-lg-2 col-xs-12">
                                                        <div className="Checkout__block__subTitle"> CVC </div>
                                                        <div className="Checkout__block__addressInput"> <MaskedInput mask={[/\d/, /\d/, /\d/]} className="Checkout__block__addressInput__input" rows="5" placeholder="212" onChange={(event) => { this.setState({ cvv: event.target.value }) }} /> </div>
                                                    </div>
                                                </div>
              <div className={"PaymentMethods__block2"}>
                <Link onClick={this.saveNewCard}>
                  <div className="PaymentMethods__block2__itemPlaceBox">
                    <span className="PaymentMethods__block2__itemPlaceBox__price"> Add Credit Card </span>
                  </div>
                </Link>
              </div>
                </div>
              </div>
            </div>
          </div>

        </div>
            <Footer />
          </div>
        }
      </>
    );
  }
}

export default AddCard;