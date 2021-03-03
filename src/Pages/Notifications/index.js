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
import MaskedInput from 'react-text-mask'

import styles from "./notifications.scss";

class Notifications extends Component {
state = {

};

componentDidMount(){

  window.scrollTo(0, 0);
}
render() {
const options = {
items: 4,
nav: false,
dots:false,
autoplayTimeout:2500,
rewind: true,
autoplay: true,
responsive:{
0:{
items:1
},
768 : {
items:4
}
}
};
let { items } = this.state;
return (
<div className={"Notifications"}>
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-4 col-xs-12">
            <div className={"Notifications__newBlock"}>
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
                              <div className={"menuTitle"}>
                                Payment Methods
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to="/Notifications">
                              <div className={"dropDownImage"}>
                                <img src={notificationIcon} alt={notificationIcon} />
                              </div>
                              <div className={"title active"}>
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
                <div className={"Notifications__block"}>
                        <div className="container"> 
                        <div className="Notifications__block__sectionTitle">
                            Mobile Number
                        </div>
                        <div className="hrLine"></div>
                        <div className="Notifications__block__paragraph"> We use your number to text or call you about your order. You can set your contact preferences below. </div>
                        <div className="row">
                          <div className="col-9">
                            <div className="Notifications__block__subTitle"> Mobile number (10-digit) </div>
                          </div>
                          <div className="col-3">
                            
                          </div>
                          <div className="col-9">
                            <div className="Notifications__block__addressInput"> <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]} className="Notifications__block__addressInput__input" placeholder="+1 ### ### ## ##"/> </div>
                          </div>
                          <div className="col-3">
                          <a href="javascript:;">
                                <div className="Notifications__block__standartButton ">
                                        <span className="Notifications__block__standartButton__text"> Save </span>
                                </div>
                            </a>
                          </div>
                        </div>
                        </div>     
                </div>
                <div className={"Notifications__block"}>
                        <div className="container"> 
                            <div className="Notifications__block__sectionSubTitle">
                            When there is an update to your order...
                            </div>
                            <div className="row mt30">
                                <div className="col-9 text-left">
                                    <span className="Notifications__block__sectionParagraph">
                                    Send an SMS message
                                    </span>
                                </div>
                                <div className="col-3 text-right">
                                    <span className="Notifications__block__sectionParagraph">
                                        <input type="checkbox" />
                                    </span>
                                </div>
                            </div>
                            <div className="row mt30">
                                <div className="col-9 text-left">
                                    <span className="Notifications__block__sectionParagraph">
                                    Call before checkout
                                    </span>
                                </div>
                                <div className="col-3 text-right">
                                    <span className="Notifications__block__sectionParagraph">
                                        <input type="checkbox" />
                                    </span>
                                </div>
                            </div>
                        </div>     
                    </div>
                    <div className={"Notifications__block"}>
                        <div className="container"> 
                            <div className="Notifications__block__sectionSubTitle">
                            When there is an update to your order...
                            </div>
                            <div className="row mt30">
                                <div className="col-9 text-left">
                                    <span className="Notifications__block__sectionParagraph">
                                    I want to become an Email subscriber
                                    </span>
                                </div>
                                <div className="col-3 text-right">
                                    <span className="Notifications__block__sectionParagraph">
                                        <input type="checkbox" />
                                    </span>
                                </div>
                            </div>
                            <div className="row mt30">
                                <div className="col-9 text-left">
                                    <span className="Notifications__block__sectionParagraph">
                                    Send an Email
                                    </span>
                                </div>
                                <div className="col-3 text-right">
                                    <span className="Notifications__block__sectionParagraph">
                                        <input type="checkbox" />
                                    </span>
                                </div>
                            </div>
                        </div>     
                    </div>
                
            </div>
        </div>

    </div>
    <Footer />
</div>
);
}
}

export default Notifications;