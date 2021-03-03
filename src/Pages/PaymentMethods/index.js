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

import styles from "./paymentMethods.scss";

class PaymentMethods extends Component {
  state = {
    cards: null,
    processing: true
  };
  async componentDidMount() {
    if (getCookie("user") === null) {
      window.location.pathname = `/`;
    }
    else {
      await this.getCards();
    }
    window.scrollTo(0, 0);
  }
  getCards = async () => {
    let res = await store.getCards();
    if (res) {
      this.setState({
        cards: res.data.cards,
        processing: false
      });
    }
  };
  deleteCard = async (id) => {
    let res = await store.deleteCard(id);
    if (res) {
      this.setState({
        processing: false
      });
      window.location.reload(false)
    }
  };
  openModal(id){
    this.props.createModal({
      header: "Delete Card",
      declaration: "Are you sure to delete card?",
      buttons: [
      {
          type: "secondary",
          text: "Delete",
          sizeName: "default",
          onButtonClick: () => {
            this.setState({
              processing: true
            });
            this.deleteCard(id);
          },
      },
      {
        type: "primary",
        text: "Cancel",
        sizeName: "default",
        onButtonClick: () => {
        this.props.closeModal();
        },
    },
      ],
  });
  }
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
            <div className="col-md-4 col-lg-4 col-xs-12">
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
                    Payment Methods
                      </div>
                            { this.state.cards !== null && this.state.cards.map((item, index) => (
                      <>
                  <div className="row mt30">
                    <div className="col-3 text-left">
                      <span className="PaymentMethods__block__leftPart">
                        Card
                                    </span>
                    </div>
                    <div className="col-6 text-left">
                      <span className="PaymentMethods__block__sectionParagraph">
                        {item.card_info.creditCard}
                                    </span>
                    </div>
                    <div className="col-3 text-right">
                      <span className="PaymentMethods__block__sectionParagraph oranged">
                        <Link onClick={(e) => this.openModal(item.id)} className="oranged">
                          Delete Card
                                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="hrLine"></div>
                  </>
                            ))
                  }
                </div>
              </div>
              <div className={"PaymentMethods__block2"}>
                <Link to="/AddCard">
                  <div className="PaymentMethods__block2__itemPlaceBox">
                    <span className="PaymentMethods__block2__itemPlaceBox__price"> Add Credit or Debit Card </span>
                  </div>
                </Link>
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

export default PaymentMethods;