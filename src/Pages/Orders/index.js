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
import meats from "../../assets/meats.jpg";
import downArrowIcon from "../../icons/down-arrow.svg";
import LoadingModal from "../../Components/LoadingModal";
import store from "../../store";
import { getCookie } from "../../utils/cookie";

import styles from "./orders.scss";

class Orders extends Component {
  state = {
    orders: [],
    processing: true
  };
  async componentDidMount() {
    if (getCookie("user") === null) {
      window.location.pathname = `/`;
    }
    else {
      await this.getOrders();
    }
    window.scrollTo(0, 0);
  }
  getOrders = async () => {
    let res = await store.getOrders();
    console.log(res);
    if (res) {
      this.setState({
        orders: res.data,
        processing: false
      });
    }
  };
  handleHideShow(id, e) {
    e.preventDefault();
    var item = document.getElementById('element' + id);
    var button = document.getElementById('button' + id);
    if (item.className.includes("hide")) {
      button.classList.add("up");
      item.classList.remove("hide");
      item.classList.add("show");
    }
    else {
      button.classList.remove("up");
      item.classList.add("hide");
      item.classList.remove("show");
    }
  }
  render() {
    return (
      <>
        {
          this.state.processing === true &&
          <LoadingModal text="Loading" />
        }
        { 
        this.state.processing !== true &&
          <div className={"Orders"}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-xs-12">
                  <div className={"Orders__newBlock"}>
                    <div className="container">
                      <ul className={"leftDropMenu"} >
                        <li>
                          <Link to="/Orders">
                            <div className={"dropDownImage"}>
                              <img src={ordersIcon} alt={ordersIcon} />
                            </div>
                            <div className={"title active"}>
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
                          <Link to="#">
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
                <div className="col-lg-8 col-md-8 col-xs-12">
                  <div className={"Orders__block"}>
                    <div className="container">
                      <div className="Orders__block__sectionSubTitle">
                        Your Orders
                            </div>
                      {this.state.orders !== null && this.state.orders.map((item, index) => (
                        <>
                          <div className="Orders__block__deliveryItem">
                            <div className="Orders__block__deliveryItem__input">
                              <img src={meats} />
                            </div>
                            <div className="Orders__block__deliveryItem__text">
                              {item.unique_order_id}
                                    <div className="Orders__block__deliveryItem__text__subText">
                                      Delivery date/time: {item.selectedDeliveryMonth}.{item.selectedDeliveryDay}.{item.selectedDeliveryYear} {item.selectedDeliveryHour}:00
                                    </div>
                            </div>
                            <a href="javascript:;" onClick={(e) => this.handleHideShow(index, e)}>
                              <div className="Orders__block__deliveryItem__icon">
                                <img src={downArrowIcon} className="" id={`button${index}`} />
                              </div>
                            </a>
                            <div className="Orders__block__deliveryItem__price">
                              $ {item.total}
                            </div>
                          </div>
                          <div className="Orders__block__deliveryItem hide" id={`element${index}`}>
                            <div className="Orders__block__deliveryItem__text__subText">
                              <span className="Orders__block__deliveryItem__text__quantityText">Tax</span> : <span className="grayed">$ {item.tax}</span>
                                <span className="Orders__block__deliveryItem__text__quantityText ml20">Tip</span>
                                <span className="dot grayed">·</span> <span className="grayed">$ {item.tip}</span>
                            </div>
                            <div className="Orders__block__deliveryItem__descriptionBlock mt-10">
                                {JSON.parse(item.location).tag} : {item.address}
                            </div>
                          </div>
                        </>
                      ))
                      }
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
export default Orders;