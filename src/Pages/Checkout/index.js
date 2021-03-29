import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import mastercard from "../../icons/002-mastercard.svg";
import visa from "../../icons/004-visa.svg";
import paypal from "../../icons/001-paypal.svg";
import amex from "../../icons/003-amex.svg";
import maestro from "../../icons/022-maestro.svg";
import debit from "../../icons/016-debit.svg";
import cirrus from "../../icons/007-cirrus.svg";
import MaskedInput from "react-text-mask";
import styles from "./checkout.scss";
import { getCookie } from "../../utils/cookie";
import LoadingModal from "../../Components/LoadingModal";
import moment from "moment";
import store from "../../store";
import axios from "axios";
import app_config from "../../store/appConfig";

class Checkout extends Component {
  state = {
    selectedAddressIndex: -1,
    locationModal: false,
    locationLoading: true,
    selectedAddress: {},
    selectedBillingAddress: {},
    addressList: [],
    deliveryTimeModal: false,
    deliveryChange: false,
    processing: true,
    deliveryTimeList: [
      "Within 1 Hour",
      "9am - 11am",
      "11am - 1pm",
      "1pm - 3pm",
      "3pm - 5pm",
      "5pm - 7pm",
      "7pm - 9pm",
    ],
    selectedDeliveryTime: "",
    selectedDeliveryIndex: -1,
    payMethodModal: false,
    ccType: "credit-card",
    cnValid: null,
    exValid: null,
    cvv: "",
    holder: "",
    creditCard: "",
    creditCard2: false,
    mobileNumber: "",
    expiration: "",
    user_id: 0,
    selectedDeliveryHour: "",
    selectedDeliveryDay: "",
    selectedDeliveryYear: "",
    selectedDeliveryMonth: "",
    ccForm: false,
    savedCards: [],
    selectedCreditCard: -1,
    ccLoading: false,
    orderNotes: "",
    deliveryTypeModal: false,
    harvestType: "",
    deliveryType: "",
    deliveryTip: 0.0,
    dates: [],
    currentDate: 0,
    currentDateText: "",
    def_address: {},
    def_address_id: 0,
    orderTip: 0,
    checkoutProcess: false,
    promoCodeModal: false,
    useCoupon: false,
    activeCoupon: {},
    ebtCard: true,
    restaurant: {},
    cartType: "harvestmarket",
    notificationAlert: false,
    foodCourt: false,
    foodCourtData: null,
  };
  getDay(i) {
    return i;
  }
  async componentDidMount() {
    var myObject = JSON.parse(localStorage.getItem("foodCourtItem"));
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let restaurant = await store.getRestaurant();
    if (restaurant) {
      let res = await store.getUser();
      if (res) {
        if (cartItems == null && myObject == null) {
          window.location.pathname = "/";
        } else if (cartItems == null) {
          this.setState({
            foodCourtData: myObject.foodCourtData,
            restaurant: restaurant,
            total: myObject.total,
            restaurant: restaurant.data.restaurants,
            deliveryTip: myObject.deliveryTip,
            addressList: res.data.addresses,
            selectedAddress: res.data.addresses[0].id,
          });
        } else {
          var total = 0;
          cartItems.forEach((element) => {
            total += element.quantity * element.price;
          });
          this.setState({
            order: cartItems,
            restaurant: restaurant,
            total: total.toFixed(2),
            restaurant: restaurant.data.restaurants,
            deliveryTip: 2.0,
            addressList: res.data.addresses,
            selectedAddress: res.data.addresses[0].id,
          });
        }
      }
    }
    var days = [];
    days[0] = moment();
    days[1] = moment(moment(), "DD-MM-YYYY").add(1, "days");
    days[2] = moment(moment(), "DD-MM-YYYY").add(2, "days");
    days[3] = moment(moment(), "DD-MM-YYYY").add(3, "days");
    days[4] = moment(moment(), "DD-MM-YYYY").add(4, "days");
    days[5] = moment(moment(), "DD-MM-YYYY").add(5, "days");
    days[6] = moment(moment(), "DD-MM-YYYY").add(6, "days");
    var weekDates = [];
    for (var i = 1; i <= 7; i++) {
      var d = moment().day(i);
      weekDates.push(d.format("DD") + " " + this.getDay(d.format("dddd")));
    }
    var index = moment().day() - 1;
    this.setState({
      currentDateText: moment().format("DD") + " " + moment().format("dddd"),
      currentDay: moment().format("DD"),
      dates: days,
      currentDay: moment().format("DD"),
      processing: false,
    });
    window.scrollTo(0, 0);
  }
  async placeOrder(e) {
    if (this.state.ebtCard == false) {
      axios
        .post(app_config.baseUrl + "payment/createCard", {
          cvv: this.state.cvv,
          holder: this.state.holder,
          creditCard: this.state.creditCard,
          expiration: this.state.expiration,
          user_id: getCookie("user_id"),
        })
        .then(async (response) => {
          var dataArray = {
            user_id: getCookie("user_id"),
            token: getCookie("token"),
            restaurant_id: this.state.restaurant.id,
            marketType: this.state.cartType,
            delivery_type:
              this.state.cartType == "harvestmarket"
                ? this.state.harvestType
                : "delivery",
            order: [],
            creditCard: response.data,
            address: this.state.selectedAddress,
            selectedDeliveryDay: this.state.selectedDeliveryDay,
            selectedDeliveryHour: this.state.selectedDeliveryHour,
            selectedDeliveryYear: this.state.selectedDeliveryYear,
            selectedDeliveryMonth: this.state.selectedDeliveryMonth,
            deliveryTime:
              this.state.selectedDeliveryHour +
              " - " +
              this.state.currentDateText,
            dType: this.state.deliveryType,
            orderNotes: this.state.orderNotes,
            total: (
              Number(this.state.deliveryTip) +
              Number(this.state.total) +
              Number(this.state.restaurant.delivery_charges)
            ).toFixed(2),
            ccType: this.state.ccType,
            method: this.state.ebtCard ? "EBT" : "STRIPE",
            payment_token: this.getReference(),
            orderTip: this.state.deliveryTip,
            taxTotal: 0,
            coupon: this.state.useCoupon ? this.state.activeCoupon : 0,
            isFoodCourt: false,
          };
          if (this.state.foodCourtData) {
            dataArray.isFoodCourt = true;
            dataArray.id = this.state.foodCourtData.item_id;
            dataArray.foodCourtData = this.state.foodCourtData;
            dataArray.price = Number(this.state.total).toFixed(2);
            dataArray.quantity = this.state.foodCourtData.quantity;
          }
          if (this.state.order) {
            dataArray.order = this.state.order;
          }
          console.log(dataArray);
          let res = await store.placeOrder(dataArray);
          if (res.data.success) {
            localStorage.setItem("foodCourtItem", null);
            localStorage.setItem("cartItems", null);
            window.location.pathname = "/Orders";
          } else {
            this.props.createModal({
              header: "Error",
              declaration: "Please check your credit card information!",
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
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var dataArray = {
        user_id: getCookie("user_id"),
        token: getCookie("token"),
        restaurant_id: this.state.restaurant.id,
        marketType: this.state.cartType,
        delivery_type:
          this.state.cartType == "harvestmarket"
            ? this.state.harvestType
            : "delivery",
        order: [],
        creditCard: {},
        address: this.state.selectedAddress,
        selectedDeliveryDay: this.state.selectedDeliveryDay,
        selectedDeliveryHour: this.state.selectedDeliveryHour,
        selectedDeliveryYear: this.state.selectedDeliveryYear,
        selectedDeliveryMonth: this.state.selectedDeliveryMonth,
        deliveryTime:
          this.state.selectedDeliveryHour + " - " + this.state.currentDateText,
        dType: this.state.deliveryType,
        orderNotes: this.state.orderNotes,
        total: (
          Number(this.state.deliveryTip) +
          Number(this.state.total) +
          Number(this.state.restaurant.delivery_charges)
        ).toFixed(2),
        ccType: this.state.ccType,
        method: this.state.ebtCard ? "EBT" : "STRIPE",
        payment_token: this.getReference(),
        orderTip: this.state.deliveryTip,
        taxTotal: 0,
        coupon: this.state.useCoupon ? this.state.activeCoupon : 0,
        isFoodCourt: false,
      };
      if (this.state.foodCourtData) {
        dataArray.isFoodCourt = true;
        dataArray.id = this.state.foodCourtData.item_id;
        dataArray.foodCourtData = this.state.foodCourtData;
        dataArray.price = Number(this.state.total).toFixed(2);
        dataArray.quantity = this.state.foodCourtData.quantity;
      }
      if (this.state.order) {
        dataArray.order = this.state.order;
      }
      let res = await store.placeOrder(dataArray);
      if (res) {
        localStorage.setItem("foodCourtItem", null);
        localStorage.setItem("cartItems", null);
        window.location.pathname = "/Orders";
      }
    }
  }
  getReference = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  changeActive(type, id, event, time = "") {
    var element = document.getElementById(type + id);
    if (type == "element") {
      if (time !== "") {
        this.setState({ selectedDeliveryHour: time });
        var radio = document.getElementById("radio" + id);
        var blockItems = document.getElementsByClassName("blockItems");
        for (var i = 0; i < blockItems.length; i++) {
          blockItems
            .item(i)
            .classList.remove("Checkout__block__deliveryItem__active");
          blockItems.item(i).classList.add("Checkout__block__deliveryItem");
        }
        radio.checked = true;
        element.classList.remove("Checkout__block__deliveryItem");
        element.classList.add("Checkout__block__deliveryItem__active");
      } else {
        var radio = document.getElementById("radio" + id);
        var blockItems = document.getElementsByClassName("blockItem");
        for (var i = 0; i < blockItems.length; i++) {
          blockItems
            .item(i)
            .classList.remove("Checkout__block__deliveryItem__active");
          blockItems.item(i).classList.add("Checkout__block__deliveryItem");
        }
        if (!radio.checked) {
          if (id == 15) {
            this.setState({
              ebtCard: true,
            });
          }
          if (id == 16) {
            this.setState({
              ebtCard: false,
            });
          }
          radio.checked = true;
          element.classList.remove("Checkout__block__deliveryItem");
          element.classList.add("Checkout__block__deliveryItem__active");
        }
      }
    } else {
      var up = document.getElementById("itemUp" + id);
      var down = document.getElementById("itemDown" + id);
      var ups = document.getElementsByClassName("ups");
      var downs = document.getElementsByClassName("downs");
      var dates = document.getElementsByClassName("dates");
      for (var i = 0; i < dates.length; i++) {
        dates
          .item(i)
          .classList.remove(
            "Checkout__block__deliveryDates__deliveryDate__active"
          );
        dates
          .item(i)
          .classList.add("Checkout__block__deliveryDates__deliveryDate");
      }
      for (var i = 0; i < ups.length; i++) {
        ups
          .item(i)
          .classList.remove(
            "Checkout__block__deliveryDates__deliveryDate__active__up"
          );
        ups
          .item(i)
          .classList.add("Checkout__block__deliveryDates__deliveryDate__up");
      }
      for (var i = 0; i < downs.length; i++) {
        downs
          .item(i)
          .classList.remove(
            "Checkout__block__deliveryDates__deliveryDate__active__down"
          );
        downs
          .item(i)
          .classList.add("Checkout__block__deliveryDates__deliveryDate__down");
      }
      this.setState({
        selectedDeliveryDay: time.day,
        selectedDeliveryMonth: time.month,
        selectedDeliveryYear: time.year,
      });
      element.classList.remove("Checkout__block__deliveryDates__deliveryDate");
      element.classList.add(
        "Checkout__block__deliveryDates__deliveryDate__active"
      );
      up.classList.remove("Checkout__block__deliveryDates__deliveryDate__up");
      up.classList.add(
        "Checkout__block__deliveryDates__deliveryDate__active__up"
      );
      down.classList.remove(
        "Checkout__block__deliveryDates__deliveryDate__down"
      );
      down.classList.add(
        "Checkout__block__deliveryDates__deliveryDate__active__down"
      );
    }
  }
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
        {this.state.processing === true ? (
          <LoadingModal text="Loading" />
        ) : (
          <div className={"Checkout"}>
            <div className="container">
              <div className="row responsiveRow">
                <div className="col-7 responsiveCol">
                  <div className={"Checkout__block"}>
                    <div className="container">
                      <div className="Checkout__block__sectionTitle">
                        Add delivery address
                      </div>
                      <div className="hrLine"></div>
                      <div className="Checkout__block__subTitle">Addresses</div>
                      <div className="Checkout__block__addressInput">
                        <select
                          className="form-control"
                          onChange={(event) => {
                            this.setState({
                              selectedAddress: event.target.value,
                            });
                          }}
                        >
                          {this.state.addressList !== null &&
                            this.state.addressList.map((item, index) => (
                              <>
                                <option value={item.id}>
                                  {item.tag} : {item.address}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                      <a href="javascript:;">
                        <div className="Checkout__block__standartButton">
                          <span className="Checkout__block__standartButton__text">
                            {" "}
                            Add New Address{" "}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className={"Checkout__block"}>
                    <div className="container">
                      <div className="Checkout__block__sectionTitle">
                        Delivery Time
                      </div>
                      <div className="hrLine"></div>
                      <div className="Checkout__block__subTitle">
                        {" "}
                        Choose delivery time{" "}
                      </div>
                      <div className="Checkout__block__deliveryDates">
                        {this.state.dates !== null &&
                          this.state.dates.map((item, index) => (
                            <>
                              {index === 0 ? (
                                <div
                                  className="Checkout__block__deliveryDates__deliveryDate__active dates"
                                  id={"item" + index}
                                  onClick={(e) =>
                                    this.changeActive("item", index, e, {
                                      day: item.format("DD"),
                                      year: item.format("YYYY"),
                                      month: item.format("MM"),
                                    })
                                  }
                                >
                                  <div
                                    className="Checkout__block__deliveryDates__deliveryDate__active__up ups"
                                    id={"itemUp" + index}
                                  >
                                    {item.format("dddd")}
                                  </div>
                                  <div
                                    className="Checkout__block__deliveryDates__deliveryDate__active__down downs"
                                    id={"itemDown" + index}
                                  >
                                    {item.format("DD")}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="Checkout__block__deliveryDates__deliveryDate dates"
                                  id={"item" + index}
                                  onClick={(e) =>
                                    this.changeActive("item", index, e, {
                                      day: item.format("DD"),
                                      year: item.format("YYYY"),
                                      month: item.format("MM"),
                                    })
                                  }
                                >
                                  <div
                                    className="Checkout__block__deliveryDates__deliveryDate__up ups"
                                    id={"itemUp" + index}
                                  >
                                    {item.format("dddd")}
                                  </div>
                                  <div
                                    className="Checkout__block__deliveryDates__deliveryDate__down downs"
                                    id={"itemDown" + index}
                                  >
                                    {item.format("DD")}
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItems"
                        id="element1"
                        onClick={(e) =>
                          this.changeActive("element", 1, e, "09")
                        }
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseTime"
                            id="radio1"
                            value="1"
                            onChange={(e) =>
                              this.changeActive("element", 1, e, "09")
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          9am - 11am
                        </div>
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItems"
                        id="element2"
                        onClick={(e) =>
                          this.changeActive("element", 2, e, "11")
                        }
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseTime"
                            id="radio2"
                            value="2"
                            onChange={(e) =>
                              this.changeActive("element", 2, e, "11")
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          11am - 1pm
                        </div>
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItems"
                        id="element3"
                        onClick={(e) =>
                          this.changeActive("element", 3, e, "13")
                        }
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseTime"
                            id="radio3"
                            value="3"
                            onChange={(e) =>
                              this.changeActive("element", 3, e, "13")
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          1pm - 3pm
                        </div>
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItems"
                        id="element4"
                        onClick={(e) =>
                          this.changeActive("element", 4, e, "15")
                        }
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseTime"
                            id="radio4"
                            value="4"
                            onChange={(e) =>
                              this.changeActive("element", 4, e, "15")
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          3pm - 5pm
                        </div>
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItems"
                        id="element5"
                        onClick={(e) =>
                          this.changeActive("element", 5, e, "17")
                        }
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseTime"
                            id="radio5"
                            value="5"
                            onChange={(e) =>
                              this.changeActive("element", 5, e, "17")
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          5pm - 7pm
                        </div>
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItems"
                        id="element6"
                        onClick={(e) =>
                          this.changeActive("element", 6, e, "19")
                        }
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseTime"
                            id="radio6"
                            value="6"
                            onChange={(e) =>
                              this.changeActive("element", 6, e, "19")
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          7pm - 9pm
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"Checkout__block"}>
                    <div className="container">
                      <div className="Checkout__block__sectionTitle">
                        Delivery Instructions
                      </div>
                      <div className="hrLine"></div>
                      <div className="Checkout__block__subTitle">
                        {" "}
                        Add to delivery instructions (optional){" "}
                      </div>
                      <div className="Checkout__block__addressInput">
                        {" "}
                        <textarea
                          className="Checkout__block__addressInput__input"
                          rows="5"
                          placeholder="Add to delivery instructions (optional)"
                          onChange={(event) => {
                            this.setState({ orderNotes: event.target.value });
                          }}
                        ></textarea>{" "}
                      </div>
                      <div className="Checkout__block__addressInput">
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              this.setState({ leaveMyDoor: e.target.checked })
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          Leave at my door if i am not around
                        </div>
                      </div>
                      <div className="Checkout__block__infoBox">
                        By selecting this option you accept full responsibility
                        for your order after it has been delivered unattended,
                        including any loss due to theft or damage due to
                        temperature sensitivity.
                      </div>
                      <a href="javascript:;">
                        <div className="Checkout__block__standartButton ">
                          <span className="Checkout__block__standartButton__text">
                            {" "}
                            Continue{" "}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className={"Checkout__block"}>
                    {/* <div className="container">
                      <div className="Checkout__block__sectionTitle">
                        Mobile Number
                      </div>
                      <div className="hrLine"></div>
                      <div className="Checkout__block__subTitle">
                        {" "}
                        We use your number to text or call you about your order{" "}
                      </div>
                      <div className="Checkout__block__subTitle">
                        {" "}
                        Mobile number (10-digit){" "}
                      </div>
                      <div className="Checkout__block__addressInput">
                        {" "}
                        <MaskedInput
                          mask={[
                            "(",
                            /[1-9]/,
                            /\d/,
                            /\d/,
                            ")",
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            " ",
                            /\d/,
                            /\d/,
                            " ",
                            /\d/,
                            /\d/,
                          ]}
                          className="Notifications__block__addressInput__input"
                          value={this.state.mobileNumber}
                          placeholder="+1 ### ### ## ##"
                        />{" "}
                      </div>
                      {/* <a href="javascript:;">
                                                    <div className="Checkout__block__standartButton ">
                                                        <span className="Checkout__block__standartButton__text"> Save </span>
                                                    </div>
                                                </a> 
                    </div> */}
                  </div>
                  <div className={"Checkout__block"}>
                    <div className="container">
                      <div className="Checkout__block__sectionTitle">
                        Payment
                      </div>
                      <div className="hrLine"></div>
                      <div
                        className="Checkout__block__deliveryItem blockItem"
                        id="element15"
                        onClick={(e) => this.changeActive("element", 15, e)}
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseEbt"
                            id="radio15"
                            value="true"
                            onChange={(e) =>
                              this.changeActive("element", 15, e)
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          I have an EBT Card
                        </div>
                      </div>
                      <div
                        className="Checkout__block__deliveryItem blockItem"
                        id="element16"
                        onClick={(e) => this.changeActive("element", 16, e)}
                      >
                        <div className="Checkout__block__deliveryItem__input">
                          <input
                            type="radio"
                            name="chooseEbt"
                            id="radio16"
                            value="false"
                            onChange={(e) =>
                              this.changeActive("element", 16, e)
                            }
                          />
                        </div>
                        <div className="Checkout__block__deliveryItem__time">
                          Use Credit Card
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Add to a payment method
                            <br />
                            We support many payment methods, and more.{" "}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="Checkout__block__cardImages">
                            <img
                              src={amex}
                              className="Checkout__block__cardImages__cardImage"
                            />
                            <img
                              src={visa}
                              className="Checkout__block__cardImages__cardImage"
                            />
                            <img
                              src={mastercard}
                              className="Checkout__block__cardImages__cardImage"
                            />
                            <img
                              src={maestro}
                              className="Checkout__block__cardImages__cardImage"
                            />
                            <img
                              src={debit}
                              className="Checkout__block__cardImages__cardImage"
                            />
                            <img
                              src={paypal}
                              className="Checkout__block__cardImages__cardImage"
                            />
                            <img
                              src={cirrus}
                              className="Checkout__block__cardImages__cardImage"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Card number{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <MaskedInput
                              mask={[
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                " ",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                " ",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                " ",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                              ]}
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({
                                  creditCard: event.target.value,
                                });
                              }}
                              placeholder="1234 ####  #### ##22"
                            />{" "}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="Checkout__block__subTitle">
                            {" "}
                            Expiration{" "}
                          </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <MaskedInput
                              mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({
                                  expiration: event.target.value,
                                });
                              }}
                              placeholder="09/25"
                            />{" "}
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="Checkout__block__subTitle"> CVC </div>
                          <div className="Checkout__block__addressInput">
                            {" "}
                            <MaskedInput
                              mask={[/\d/, /\d/, /\d/]}
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              placeholder="212"
                              onChange={(event) => {
                                this.setState({ cvv: event.target.value });
                              }}
                            />{" "}
                          </div>
                        </div>
                      </div>
                      <div className="Checkout__block__subTitle">
                        {" "}
                        Billing Address{" "}
                      </div>
                      <div className="Checkout__block__addressInput">
                        <select
                          className="form-control"
                          onChange={(event) => {
                            this.setState({
                              selectedBillingAddress: event.target.value,
                            });
                          }}
                        >
                          {this.state.addressList !== null &&
                            this.state.addressList.map((item, index) => (
                              <>
                                <option value={item.id}>
                                  {item.tag} : {item.address}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                      {/* <a href="javascript:;">
                                                    <div className="Checkout__block__standartButton ">
                                                        <span className="Checkout__block__standartButton__text"> Continue </span>
                                                    </div>
                                                </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-5 responsiveCol">
                  <div className={"Checkout__block"}>
                    <div className="container">
                      <Link
                        to="#"
                        onClick={(e) => {
                          this.placeOrder(e);
                        }}
                      >
                        <div className="Checkout__block__itemPlaceBox">
                          <span className="Checkout__block__itemPlaceBox__price">
                            {" "}
                            Place Order{" "}
                          </span>
                        </div>
                      </Link>
                      <div className="row mt30">
                        <div className="col-8 text-left">
                          <span className="Checkout__block__leftPart">
                            Subtotal
                          </span>
                        </div>
                        <div className="col-4 text-right">
                          <span className="Checkout__block__rightPart">
                            ${" "}
                            {this.state.total !== null &&
                              Number(this.state.total).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="row mt10">
                        <div className="col-8 text-left">
                          <span className="Checkout__block__leftPart">
                            Service fee
                          </span>
                        </div>
                        <div className="col-4 text-right">
                          <span className="Checkout__block__rightPart">
                            ${" "}
                            {this.state.restaurant !== null &&
                              this.state.restaurant.delivery_charges}
                          </span>
                        </div>
                      </div>
                      {/* <div className="row mt10">
                                                    <div className="col-8 text-left">
                                                        <span className="Checkout__block__leftPart">
                                                            Estimated taxed and fees
                                                        </span>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <span className="Checkout__block__rightPart">
                                                            $21.19
                                                        </span>
                                                    </div>
                                                </div> */}
                      <div className="hrLine"></div>
                      <div className="row mt30">
                        <div className="col-8 text-left">
                          <span className="Checkout__block__leftPart">
                            Delivery Tip
                          </span>
                          <Link
                            to="#"
                            className="Checkout__block__change"
                            onClick={() =>
                              this.setState({
                                deliveryChange: !this.state.deliveryChange,
                              })
                            }
                          >
                            Change
                          </Link>
                        </div>
                        <div className="col-4 text-right Checkout__block__rightPart">
                          <span>
                            ${" "}
                            {this.state.deliveryTip !== null &&
                              Number(this.state.deliveryTip).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="row mt30">
                        {this.state.deliveryChange && (
                          <div className="Checkout__block__addressInput pl-3 pr-3">
                            <input
                              type="text"
                              className="Checkout__block__addressInput__input"
                              rows="5"
                              onChange={(event) => {
                                this.setState({
                                  deliveryTip: event.target.value,
                                });
                              }}
                              value={this.state.deliveryTip}
                              placeholder=""
                            />{" "}
                          </div>
                        )}
                      </div>
                      <div className="row mt30">
                        <div className="col-12">
                          Want to recognize your delivery person's efforts?
                          Consider a larger tip to qualify their job
                        </div>
                      </div>
                      <div className="hrLine"></div>
                      <div className="row mt30">
                        <div className="col-8 text-left">
                          <span className="Checkout__block__leftPart__total">
                            Total
                          </span>
                        </div>
                        <div className="col-4 text-right">
                          <span className="Checkout__block__rightPart__totalPrice">
                            ${" "}
                            {this.state.total !== null &&
                              this.state.deliveryTip !== null &&
                              this.state.restaurant !== null &&
                              (
                                Number(this.state.deliveryTip) +
                                Number(this.state.total) +
                                Number(this.state.restaurant.delivery_charges)
                              ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {/* <div className="row mt10">
                                                    <div className="col-8 ">
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <span className="Checkout__block__rightPart oranged">
                                                            You saved $2.00
                                                    </span>
                                                    </div>
                                                </div> */}
                      <a href="javascript:;">
                        <div className="Checkout__block__itemPromoBox">
                          <span className="Checkout__block__itemPromoBox__price">
                            {" "}
                            Add Promo Code{" "}
                          </span>
                        </div>
                      </a>
                      <div className="row mt30">
                        <div className="col-12 ">
                          <p>
                            By placing your order, you agree to be bound by the
                            HarvestTrolley{" "}
                            <span
                              className="oranged cursorPointer"
                              onClick={() =>
                                (window.location.href = "/Privacy")
                              }
                            >
                              Terms of Service
                            </span>{" "}
                            and Privacy Policy.
                          </p>
                        </div>
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

export default Checkout;
