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
import MaskedInput from "react-text-mask";
import LoadingModal from "../../Components/LoadingModal";
import store from "../../store";
import { getCookie, setCookie } from "../../utils/cookie";

import styles from "./addresses.scss";
import SideMenuBar from "../../Components/SideMenuBar";

class AddAddress extends Component {
  state = {
    loading: true,
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    formatted_address: "",
    formatted_address2: "",
    zipcode: "",
    blockButton: true,
    tag: "",
    house: "",
    selectedAddressIndex: -1,
  };
  async componentDidMount() {
    if (getCookie("user") === null) {
      window.location.pathname = `/`;
    } else {
      //await this.getUser();
    }
    var that = this;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        that.setState({
          blockButton: false,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      },
      function (error) {
        that.setState({
          blockButton: true,
        });
        that.props.createModal({
          header: "Error",
          declaration: "You must enable your location services on url bar!",
          buttons: [
            {
              type: "primary",
              text: "OK",
              sizeName: "default",
              onButtonClick: () => {
                that.props.closeModal();
              },
            },
          ],
        });
      }
    );
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
  async addAddress() {
    let myObject = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      address: this.state.address,
      house: this.state.house,
      zipcode: this.state.zipcode,
      carrier_route: "",
      tag: this.state.tag,
      token: "",
      user_id: getCookie("user_id"),
      add_data: this.state.add_data,
    };
    let res = {};
    res = await store.createAddress(myObject);
    if (res) {
      console.log(res);
      this.setState({
        formatted_address: "",
        formatted_address2: "",
        zipcode: "",
        blockButton: true,
        tag: "",
        house: "",
        selectedAddressIndex: -1,
      });
      setCookie("address", res.data[0].id, {});
      this.props.createModal({
        header: "Success",
        declaration: "You have successfully created new addres!",
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => {
              this.props.closeModal();
              window.location.pathname = `/Addresses`;
            },
          },
        ],
      });
    } else {
      this.props.createModal({
        header: "Error",
        declaration: "Something went wrong! Please try again later!",
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => {
              this.props.closeModal();
            },
          },
        ],
      });
    }
    this.setState({
      processing: false,
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
                        Add New Address
                      </div>
                      <div className="row mt30">
                        <div className="col-12">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Tag (EG. HOME,WORK) *{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <input
                              type="text"
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({ tag: event.target.value });
                              }}
                              placeholder=""
                            />{" "}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Address{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <input
                              type="text"
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({ address: event.target.value });
                              }}
                              placeholder=""
                            />{" "}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-xs-12">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            House Number{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <input
                              type="text"
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({ house: event.target.value });
                              }}
                              placeholder=""
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-12">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Add to apt #, unit, etc.{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <input
                              type="text"
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({ add_data: event.target.value });
                              }}
                              placeholder=""
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-12">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Zip Code{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <input
                              type="text"
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({ zipcode: event.target.value });
                              }}
                              placeholder=""
                            />{" "}
                          </div>
                        </div>
                      </div>
                      <div className="row mt30">
                        {!this.state.blockButton ? (
                          <>
                            <div className="col-12">
                              <div
                                className="Login__block__standartButton "
                                onClick={async () => this.addAddress()}
                              >
                                <span className="Login__block__standartButton__text">
                                  {" "}
                                  Add Address{" "}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-12">
                              <div className="Login__block__standartButton">
                                <span className="Login__block__standartButton__text">
                                  {" "}
                                  Add Address{" "}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="hrLine"></div>
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

export default AddAddress;
