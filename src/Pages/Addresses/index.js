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

import styles from "./addresses.scss";
import SideMenuBar from "../../Components/SideMenuBar";

class Addresses extends Component {
  state = {
    addresses: [],
    processing: true,
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
        addresses: res.data.addresses,
        processing: false,
      });
    }
  };
  deleteAddress = async (id) => {
    let res = await store.deleteAddress(id);
    if (res) {
      this.setState({
        processing: false,
      });
      window.location.reload(false);
    }
  };
  openModal(id) {
    this.props.createModal({
      header: "Delete Address",
      declaration: "Are you sure to delete address?",
      buttons: [
        {
          type: "secondary",
          text: "Delete",
          sizeName: "default",
          onButtonClick: () => {
            this.setState({
              processing: true,
            });
            this.deleteAddress(id);
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
        {this.state.processing === true && <LoadingModal text="Loading" />}
        {this.state.processing !== true && (
          <div className={"Addresses"}>
            <div className="container">
              <div className="row">
                <SideMenuBar />
                <div className="col-lg-8 col-md-8 col-xs-12">
                  <div className={"Addresses__block"}>
                    <div className="container">
                      <div className="Addresses__block__sectionSubTitle">
                        Addresses
                      </div>
                      {this.state.addresses !== null &&
                        this.state.addresses.map((item, index) => (
                          <>
                            <div className="row mt30">
                              <div className="col-3 text-left">
                                <span className="Addresses__block__leftPart">
                                  {item.tag}
                                </span>
                              </div>
                              <div className="col-5 text-left">
                                <span className="Addresses__block__sectionParagraph">
                                  {item.address}
                                </span>
                              </div>
                              <div className="col-3 text-right">
                                <span className="Addresses__block__sectionParagraph oranged">
                                  <Link
                                    onClick={(e) => this.openModal(item.id)}
                                    className="oranged"
                                  >
                                    Delete Address
                                  </Link>
                                </span>
                              </div>
                            </div>
                            <div className="hrLine"></div>
                          </>
                        ))}
                    </div>
                  </div>
                  <div className={"Addresses__block"}>
                    <Link to="/AddAddress">
                      <div className="Addresses__block__itemPlaceBox">
                        <span className="Addresses__block__itemPlaceBox__price">
                          Add New Address
                        </span>
                      </div>
                    </Link>
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

export default Addresses;
