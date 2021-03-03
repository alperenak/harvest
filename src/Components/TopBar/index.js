import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
/*** Components ***/
import Button from "../Button";
import { getCookie, setCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./topBar.scss";

/*** Icons ***/
import logo from "../../assets/logo.png";
import ordersIcon from "../../icons/orders-icon.svg";
import accountIcon from "../../icons/account-icon.svg";
import addressesIcon from "../../icons/addresses-icon.svg";
import paymentIcon from "../../icons/payment-icon.svg";
import notificationIcon from "../../icons/notification-icon.svg";
import giftCardsIcon from "../../icons/gift-cards-icon.svg";
import inviteFriendsIcon from "../../icons/invite-friends-icon.svg";
import helpIcon from "../../icons/help-icon.svg";
import logoutIcon from "../../icons/logout-icons.svg";
import closeIcoon from "../../icons/popup-close.svg";
import shoppingCartIcon from "../../icons/shopping-cart-icon.svg";
import harvestTrolleyIcon from "../../icons/HarvestTrolley-icon.svg";
import SearchIcon from "../../icons/search.svg";
import meats from "../../assets/meats.jpg";
import trash from "../../icons/trash_white.svg";
import downArrowIcon from "../../icons/down-arrow.svg";
import { eraseCookie } from "../../utils/cookie";

class TopBar extends Component {
  state = {
    cartOpened: false,
    scrollTop: 0,
    pathname: "",
    searchValue: "",
    isScrolled: window.scrollY > 1 ? true : false,
    ourDropdown: false,
    cartItems: [],
  };

  async componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (!Object.is(prevProps.location.pathname, this.props.location.pathname)) {
      this.setSelectedPage();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }
  logout() {
    eraseCookie(["token", "user", "user_id", "address"]);
    window.location.pathname = `/`;
  }
  setSelectedPage = () => {
    this.setState({
      pathname: this.props.location.pathname,
    });
  };
  submitForm() {
    if (this.state.searchValue != "") {
      window.location.pathname = `/Search/` + this.state.searchValue;
    }
  }
  loginClick() {
    window.location.pathname = `/Login`;
  }
  onSubmitInput(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }
  handleScroll = () => {
    if (window.scrollY > 1) {
      this.setState({ isScrolled: true });
    } else {
      this.setState({ isScrolled: false });
    }
  };
  removeItem(item) {
    this.setState({
      processing: true,
    });
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    console.log(cartItems);
    if (cartItems !== null) {
      let control = 0;
      cartItems = cartItems.filter(function (value) {
        return item.id != value.id;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    this.setState({
      processing: false,
    });
  }
  getTotalPrice() {
    return 12;
  }
  render() {
    console.log(this.state.isScrolled);
    let topBarClass = "";

    //burasi birakildi
    topBarClass = this.state.isScrolled
      ? `${"topBar"} ${"topBar__fullScreen"} ${"topBar__scroll"}`
      : `${"topBar"} ${"topBar__fullScreen"} ${"topBar__nonscroll"}`;

    return (
      <div className={topBarClass}>
        <div className={"topBar__tile"}>
          <div className="container"></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-2 col-xs-2">
              <div className={"topBar__logo"}>
                <Link to={"/"}>
                  <img src={logo} alt={"logo"} />
                </Link>
              </div>
            </div>
            <div className="col-lg-6  col-md-6 col-xs-12 linksSearch">
              <div className={"topBar__links"}>
                <div className={"topBar__inputWrapper"}>
                  <img
                    src={SearchIcon}
                    alt={SearchIcon}
                    className={"topBar__inputIcon"}
                  />
                  <form
                    action={"../Search/" + this.state.searchValue}
                    onSubmit={this.submitForm}
                    style={{ width: "100%" }}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => {
                        this.onSubmitInput(e);
                      }}
                      className={"topBar__input "}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-xs-10 topBar__rightSide">
              <div className={"topBar__links"}>
                {getCookie("user") != null && (
                  <Fragment>
                    <div className={"topBar__links__dropdownContainer"}>
                      <div
                        onClick={() =>
                          this.setState({
                            ourDropdown: !this.state.ourDropdown,
                          })
                        }
                      >
                        <Button
                          type={"link"}
                          sizeName={"default"}
                          text={getCookie("user")}
                          icon={ordersIcon}
                          rightIcon={downArrowIcon}
                          sizeName={"tiny"}
                          iconPosition={"left"}
                          textClass={
                            this.state.isScrolled
                              ? "topBar__links__scroll"
                              : "topBar__links__nonscroll"
                          }
                        />
                      </div>
                      {this.state.ourDropdown == true && (
                        <div
                          className={
                            "topBar__links__dropdownContainer__dropdown"
                          }
                        >
                          <ul className={"dropDownWrapper"}>
                            <li>
                              <div className={"title"}>
                                Hi, {getCookie("user")}
                              </div>
                            </li>
                            <li></li>
                            <li>
                              <Link to="/Orders">
                                <div className={"dropDownImage"}>
                                  <img src={ordersIcon} alt={ordersIcon} />
                                </div>
                                <div className={"title"}>Your Orders</div>
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
                                  <img
                                    src={addressesIcon}
                                    alt={addressesIcon}
                                  />
                                </div>
                                <div className={"title"}>Addresses</div>
                              </Link>
                            </li>
                            <li>
                              <Link to="/PaymentMethods">
                                <div className={"dropDownImage"}>
                                  <img src={paymentIcon} alt={paymentIcon} />
                                </div>
                                <div className={"title"}>Payment Methods</div>
                              </Link>
                            </li>
                            <li>
                              <Link to="/Notifications">
                                <div className={"dropDownImage"}>
                                  <img
                                    src={notificationIcon}
                                    alt={notificationIcon}
                                  />
                                </div>
                                <div className={"title"}>Notification</div>
                              </Link>
                            </li>
                            <li>
                              <Link to="/Gifts">
                                <div className={"dropDownImage"}>
                                  <img
                                    src={giftCardsIcon}
                                    alt={giftCardsIcon}
                                  />
                                </div>
                                <div className={"title"}>
                                  Credits, promos & gift cards
                                </div>
                              </Link>
                            </li>
                            <li></li>
                            <li>
                              <Link>
                                <div className={"dropDownImage"}>
                                  <img
                                    src={inviteFriendsIcon}
                                    alt={inviteFriendsIcon}
                                  />
                                </div>
                                <div className={"title"}>Invite Friends</div>
                              </Link>
                            </li>
                            <li>
                              <Link>
                                <div className={"dropDownImage"}>
                                  <img src={helpIcon} alt={helpIcon} />
                                </div>
                                <div className={"title"}>Help</div>
                              </Link>
                            </li>
                            <li></li>
                            <li>
                              <Link to="#" onClick={this.logout}>
                                <div className={"dropDownImage"}>
                                  <img src={logoutIcon} alt={logoutIcon} />
                                </div>
                                <div className={"title"}>Logout</div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
                {getCookie("user") == null && (
                  <Fragment>
                    <div
                      className={"topBar__links__dropdownContainer"}
                      onClick={this.loginClick}
                    >
                      <Button
                        type={"link"}
                        sizeName={"default"}
                        text={"Login"}
                        sizeName={"tiny"}
                        textClass={
                          this.state.isScrolled
                            ? "topBar__links__scroll"
                            : "topBar__links__nonscroll"
                        }
                      />
                    </div>
                  </Fragment>
                )}
                <div
                  className={"topBar__links__dropdownContainer"}
                  onClick={() => {
                    this.setState({ cartOpened: true });
                    console.log(this.state.cartItems);
                  }}
                >
                  <Button
                    type={"link"}
                    sizeName={"default"}
                    text={""}
                    icon={shoppingCartIcon}
                    sizeName={"tiny"}
                    iconPosition={"left"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.cartOpened == true && (
          <div className={"shoppingCart"}>
            <div className={"shoppingCart__cartHeader"}>
              <div className={"shoppingCart__cartHeader__link"}>My Cart</div>
              <div className={"shoppingCart__cartHeader__text"}>
                <div className={"shoppingCart__cartHeader__text__bold"}>
                  Personal Cart
                </div>
                Shopping in CA 32324 San Fr.
              </div>
              <div
                className={"shoppingCart__cartHeader__icon"}
                onClick={() => {
                  this.setState({ cartOpened: false });
                }}
              >
                <a href="javascript:;">
                  <img src={closeIcoon} alt={closeIcoon} />
                </a>
              </div>
            </div>
            <div className={"shoppingCart__cartContent"}>
              <div className={"cartRow"}>
                <div className={"shoppingCart__cartContent__icon"}>
                  <img
                    src={harvestTrolleyIcon}
                    alt={harvestTrolleyIcon}
                    className={"shoppingCart__cartContent__icon__image"}
                  />
                </div>
                <div className={"shoppingCart__cartContent__text"}>
                  <div className={"shoppingCart__cartContent__text__bold"}>
                    HarvesTrolley
                  </div>
                  Delivery time: Within 4 hours
                </div>
                {/* <div className={"shoppingCart__cartContent__price"}>
                $39.90
              </div> */}
              </div>
              {/* <div className={"cartRow"}>
              <div className={"shoppingCart__cartContent__freeDelivery"}>
                Add <strong>$13.81</strong> for <strong>Free Delivery</strong> with HarvesTrolley!
              </div>
            </div> */}
              {JSON.parse(localStorage.getItem("cartItems")) != null &&
                JSON.parse(localStorage.getItem("cartItems")).map(
                  (item, index) => (
                    <>
                      <div className={"cartRow"}>
                        <div className={"shoppingCart__cartContent__item"}>
                          <div
                            className={"shoppingCart__cartContent__item__icon"}
                          >
                            {item.image !== null && (
                              <img
                                src={`http://3.80.123.181${item.image}`}
                                alt={item.name}
                                className={
                                  "shoppingCart__cartContent__item__icon__image"
                                }
                              />
                            )}
                          </div>
                          <div
                            className={"shoppingCart__cartContent__item__text"}
                          >
                            <div
                              className={
                                "shoppingCart__cartContent__item__text__bold"
                              }
                            >
                              {item.name}
                            </div>
                          </div>
                          <div
                            className={
                              "shoppingCart__cartContent__item__option"
                            }
                          >
                            <select className={"form-control"}>
                              <option value={item.quantity}>
                                {item.quantity}
                              </option>
                            </select>
                          </div>
                          <div
                            className={"shoppingCart__cartContent__item__price"}
                          >
                            {(
                              Number(item.quantity) * Number(item.price)
                            ).toFixed(2)}
                          </div>
                          <div
                            className={
                              "shoppingCart__cartContent__item__deleteIcon"
                            }
                          >
                            <Link
                              to="#"
                              onClick={(e) => {
                                this.removeItem(item);
                              }}
                            >
                              <img
                                src={trash}
                                alt={trash}
                                className={
                                  "shoppingCart__cartContent__item__deleteIcon__image"
                                }
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )}
              <div className={"cartRow"}>
                <Link to="/Checkout">
                  <div className={"shoppingCart__cartContent__checkout"}>
                    Go to Total Checkout
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TopBar;
