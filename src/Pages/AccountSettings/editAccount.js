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

import styles from "./accountSettings.scss";

class EditAccount extends Component {
  state = {
    user: null,
    processing: true,
    updateEmail: "",
    updatePhone: "",
    updateName: "",
  };

  async componentDidMount() {
    if (getCookie("user") === null) {
      window.location.pathname = `/`;
    } else {
      await this.getUser();
    }
    window.scrollTo(0, 0);
  }
  getUser = async () => {
    let res = await store.getUser();
    if (res) {
      this.setState({
        user: res.data,
        updateEmail: res.data.email,
        updatePhone: res.data.phone,
        updateName: res.data.name,
        processing: false,
      });
    }
  };
  updateUser = async () => {
    this.setState({
      processing: true,
    });
    let payload = {
      email: this.state.updateEmail,
      phone: this.state.updatePhone,
      name: this.state.updateName,
      user_id: getCookie("user_id"),
      token: getCookie("token"),
    };
    let res = await store.updateUser(payload);
    if (res) {
      this.setState({
        processing: false,
      });
      window.location.pathname = `/AccountSettings`;
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
    return (
      <>
        {this.state.processing === true && <LoadingModal text="Loading" />}
        {this.state.processing !== true && (
          <div className={"AccountSettings"}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-xs-12">
                  <div className={"AccountSettings__newBlock"}>
                    <div className="container">
                      <ul className={"leftDropMenu"}>
                        <li>
                          <Link to="/Orders">
                            <div className={"dropDownImage"}>
                              <img src={ordersIcon} alt={ordersIcon} />
                            </div>
                            <div className={"menuTitle"}>Your Orders</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/AccountSettings">
                            <div className={"dropDownImage"}>
                              <img src={accountIcon} alt={accountIcon} />
                            </div>
                            <div className={"title active"}>
                              Account Settings
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/Addresses">
                            <div className={"dropDownImage"}>
                              <img src={addressesIcon} alt={addressesIcon} />
                            </div>
                            <div className={"menuTitle"}>Addresses</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/PaymentMethods">
                            <div className={"dropDownImage"}>
                              <img src={paymentIcon} alt={paymentIcon} />
                            </div>
                            <div className={"menuTitle"}>Payment Methods</div>
                          </Link>
                        </li>

                        <li>
                          <Link to="/Gifts">
                            <div className={"dropDownImage"}>
                              <img src={giftCardsIcon} alt={giftCardsIcon} />
                            </div>
                            <div className={"menuTitle"}>Promotions</div>
                          </Link>
                        </li>
                        <li></li>
                        <li>
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
                </div>
                <div className="col-lg-8 col-md-8 col-xs-12">
                  <div className={"AccountSettings__block"}>
                    <div className="container">
                      <div className="AccountSettings__block__sectionSubTitle">
                        Account information
                      </div>
                      <div className="row mt30">
                        <div className="col-3 text-left">
                          <span className="AccountSettings__block__leftPart">
                            Name
                          </span>
                        </div>
                        <div className="col-6 text-left">
                          <span className="AccountSettings__block__sectionParagraph">
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.updateName}
                              onChange={(event) => {
                                this.setState({
                                  updateName: event.target.value,
                                });
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="row mt30">
                        <div className="col-3 text-left">
                          <span className="AccountSettings__block__leftPart">
                            Email
                          </span>
                        </div>
                        <div className="col-6 text-left">
                          <span className="AccountSettings__block__sectionParagraph">
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.updateEmail}
                              onChange={(event) => {
                                this.setState({
                                  updateEmail: event.target.value,
                                });
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="row mt30">
                        <div className="col-3 text-left">
                          <span className="AccountSettings__block__leftPart">
                            Phone
                          </span>
                        </div>
                        <div className="col-6 text-left">
                          <span className="AccountSettings__block__sectionParagraph">
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.updatePhone}
                              onChange={(event) => {
                                this.setState({
                                  updatePhone: event.target.value,
                                });
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <div className={"PaymentMethods__block2"}>
                        <Link onClick={this.updateUser}>
                          <div className="PaymentMethods__block2__itemPlaceBox">
                            <span className="PaymentMethods__block2__itemPlaceBox__price">
                              {" "}
                              Update{" "}
                            </span>
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
        )}
      </>
    );
  }
}

export default EditAccount;
