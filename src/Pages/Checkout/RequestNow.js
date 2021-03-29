import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import styles from "./checkout.scss";
import { getCookie } from "../../utils/cookie";
import LoadingModal from "../../Components/LoadingModal";
import moment from "moment";
import store from "../../store";

class RequestNow extends Component {
  state = {
    selectedAddressIndex: -1,
    locationModal: false,
    locationLoading: true,
    selectedAddress: {},
    selectedBillingAddress: {},
    addressList: [],
    deliveryTimeModal: false,
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
    deliveryType: "now",
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
    localStorage.setItem("foodCourtItem", null);
    localStorage.setItem("cartItems", null);
    let restaurant = await store.getRestaurant();
    if (restaurant) {
      let res = await store.getUser();
      if (res) {
        this.setState({
          restaurant: restaurant,
          restaurant: restaurant.data.restaurants,
          addressList: res.data.addresses,
          selectedAddress: res.data.addresses[0].id,
        });
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
      creditCard: null,
      address: this.state.selectedAddress,
      selectedDeliveryDay: this.state.selectedDeliveryDay,
      selectedDeliveryHour: this.state.selectedDeliveryHour,
      selectedDeliveryYear: this.state.selectedDeliveryYear,
      selectedDeliveryMonth: this.state.selectedDeliveryMonth,
      deliveryTime: "Now",
      dType: "leave-door",
      requestNow: true,
      orderNotes: this.state.orderNotes,
      total: 0.0,
      ccType: this.state.ccType,
      method: this.state.ebtCard ? "EBT" : "STRIPE",
      payment_token: this.getReference(),
      orderTip: this.state.deliveryTip,
      taxTotal: 0,
      coupon: this.state.useCoupon ? this.state.activeCoupon : 0,
      isFoodCourt: false,
    };
    let res = await store.placeOrder(dataArray);
    if (res) {
      localStorage.setItem("foodCourtItem", null);
      localStorage.setItem("cartItems", null);
      window.location.pathname = "/Orders";
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
          radio.checked = true;
          element.classList.remove("Checkout__block__deliveryItem");
          element.classList.add("Checkout__block__deliveryItem__active");
        } else {
          radio.checked = false;
          element.classList.remove("Checkout__block__deliveryItem__active");
          element.classList.add("Checkout__block__deliveryItem");
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
              <div className="row">
                <div className="col-7">
                  <div className={"Checkout__block"}>
                    <div className="container">
                      <div className="Checkout__block__sectionTitle">
                        Add delivery address
                      </div>
                      <div className="hrLine"></div>
                      <div className="Checkout__block__subTitle">
                        {" "}
                        Addresses{" "}
                      </div>
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
                </div>
                <div className="col-5">
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
                            $ 0.00
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
                            $ 0.00
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
                          <span className="Checkout__block__leftPart__total">
                            Total
                          </span>
                        </div>
                        <div className="col-4 text-right">
                          <span className="Checkout__block__rightPart__totalPrice">
                            $ 0.00
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

export default RequestNow;
