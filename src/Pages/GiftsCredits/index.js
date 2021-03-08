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
import store from "../../store";
import { getCookie } from "../../utils/cookie";

import styles from "./gifts.scss";
import { OrdersIcon } from "../../icons";
import SideMenuBar from "../../Components/SideMenuBar";

class Gifts extends Component {
  state = {
    coupons: null,
    processing: true,
  };
  async componentDidMount() {
    if (getCookie("user") === null) {
      window.location.pathname = `/`;
    } else {
      await this.getCoupons();
    }
    window.scrollTo(0, 0);
  }
  getCoupons = async () => {
    let res = await store.getCoupons();
    if (res) {
      console.log(res.data.coupons);
      this.setState({
        coupons: res.data.coupons,
        processing: false,
      });
    }
  };
  render() {
    const options = {
      items: 4,
      nav: false,
      dots: false,
      autoplayTimeout: 2500,
      rewind: true,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 4,
        },
      },
    };
    let { items } = this.state;
    let pathname = window.location.pathname;
    return (
      <>
        {this.state.processing === true && <LoadingModal text="Loading" />}
        {this.state.processing !== true && (
          <div className={"Gifts"}>
            <div className="container">
              <div className="row">
                {/* <div className="col-lg-4 col-md-4 col-xs-12">
                  <div className={"Gifts__newBlock"}>
                    <div className="container">
                      <ul className={"leftDropMenu"}>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/Orders">
                            <div className={"dropDownImage"}>
                              <OrdersIcon
                                className={
                                  pathname.includes("Orders")
                                    ? "activeDropdownIcon"
                                    : "topBarDropdownImage"
                                }
                              />
                            </div>
                            <div className={"menuTitle"}>Your Orders</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/AccountSettings">
                            <div className={"dropDownImage"}>
                              <img src={accountIcon} alt={accountIcon} />
                            </div>
                            <div className={"menuTitle"}>Account Settings</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/Addresses">
                            <div className={"dropDownImage"}>
                              <img src={addressesIcon} alt={addressesIcon} />
                            </div>
                            <div className={"menuTitle"}>Addresses</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/PaymentMethods">
                            <div className={"dropDownImage"}>
                              <img src={paymentIcon} alt={paymentIcon} />
                            </div>
                            <div className={"menuTitle"}>Payment Methods</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/Notifications">
                            <div className={"dropDownImage"}>
                              <img
                                src={notificationIcon}
                                alt={notificationIcon}
                              />
                            </div>
                            <div className={"menuTitle"}>Notification</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/Gifts">
                            <div className={"dropDownImage"}>
                              <img src={giftCardsIcon} alt={giftCardsIcon} />
                            </div>
                            <div className={"title active"}>
                              Credits, promos & gift cards
                            </div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper"></li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link>
                            <div className={"dropDownImage"}>
                              <img
                                src={inviteFriendsIcon}
                                alt={inviteFriendsIcon}
                              />
                            </div>
                            <div className={"menuTitle"}>Invite Friends</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link>
                            <div className={"dropDownImage"}>
                              <img src={helpIcon} alt={helpIcon} />
                            </div>
                            <div className={"menuTitle"}>Help</div>
                          </Link>
                        </li>
                        <li className="sideBarMenuTitleWrapper"></li>
                        <li className="sideBarMenuTitleWrapper">
                          <Link to="/Login">
                            <div className={"dropDownImage"}>
                              <img src={logoutIcon} alt={logoutIcon} />
                            </div>
                            <div className={"menuTitle"}>Logout</div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
                <SideMenuBar />
                <div className="col-md-8 col-lg-8 col-xs-12">
                  {/* <div className={"Gifts__block"}>
                        <div className="container"> 
                        <div className="Gifts__block__sectionSubTitle">
                        Apply discounts to your account
                        </div>
                        <div className="hrLine"></div>
                        <div className="Gifts__block__paragraph mt30"> Apply HarvestTrolley promos or gift cards. Learn more about <span className="oranged">gift cards</span> </div>
                        <div className="row mt30">
                          <div className="col-9">
                            <div className="Gifts__block__addressInput"> <input type="text" className="Gifts__block__addressInput__input" rows="5" placeholder="Promo or gift card code"/> </div>
                          </div>
                          <div className="col-3">
                          <a href="javascript:;">
                                <div className="Gifts__block__standartButton ">
                                    <span className="Gifts__block__standartButton__text"> Add to account </span>
                                </div>
                            </a>
                          </div>
                        </div>
                        </div>     
                </div>
                <div className={"Gifts__block"}>
                        <div className="container"> 
                        <div className="Gifts__block__sectionSubTitle">
                        Gift card credit: $0.00                        
                        </div>
                        <div className="hrLine"></div>
                        <div className="Gifts__block__paragraph mt30"> Your credit will be automatically applied to your next order. </div>
                        </div>     
                </div>
                */}
                  <div className={"Gifts__block"}>
                    <div className="container">
                      <div className="Gifts__block__sectionSubTitle">
                        Promotions and discounts
                      </div>
                      <div className="row mt30">
                        <div className="col-3 text-left">
                          <span className="Addresses__block__leftPart">
                            Coupon Name
                          </span>
                        </div>
                        <div className="col-3 text-left">
                          <span className="Addresses__block__leftPart">
                            Coupon Code
                          </span>
                        </div>
                        <div className="col-3 text-left">
                          <span className="Addresses__block__sectionParagraph ">
                            Coupon
                          </span>
                        </div>
                        <div className="col-3 text-right">
                          <span className="Addresses__block__sectionParagraph ">
                            Expire Date
                          </span>
                        </div>
                      </div>
                      <div className="hrLine"></div>
                      {this.state.coupons !== null &&
                        this.state.coupons.map((item, index) => (
                          <>
                            <div className="row mt30">
                              <div className="col-3 text-left">
                                <span className="Addresses__block__leftPart">
                                  {item.name}
                                </span>
                              </div>
                              <div className="col-3 text-left">
                                <span className="Addresses__block__leftPart">
                                  {item.code}
                                </span>
                              </div>
                              <div className="col-3 text-left">
                                <span className="Addresses__block__sectionParagraph oranged">
                                  {item.discount_type === "PERCENTAGE" ? (
                                    <>% {item.discount}</>
                                  ) : (
                                    <>$ {item.discount}</>
                                  )}
                                </span>
                              </div>
                              <div className="col-3 text-right">
                                <span className="Addresses__block__sectionParagraph oranged">
                                  {item.expire_date}
                                </span>
                              </div>
                            </div>
                            <div className="hrLine"></div>
                          </>
                        ))}
                      {this.state.coupons === null && (
                        <>
                          <div className="hrLine"></div>
                          <div className="Gifts__block__paragraph mt30">
                            {" "}
                            You have no active promotions.{" "}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  }
}

export default Gifts;
