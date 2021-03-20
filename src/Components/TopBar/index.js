import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
/*** Components ***/
import Button from "../Button";
import { getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./topBar.scss";

/*** Icons ***/
import logo from "../../assets/logo.png";
import ordersIcon from "../../icons/orders-icon.svg";
import Profile from "../../assets/pp.jpg";
import closeIcoon from "../../icons/popup-close.svg";
import shoppingCartIcon from "../../icons/shopping-cart-icon.svg";
import harvestTrolleyIcon from "../../icons/HarvestTrolley-icon.svg";
import SearchIcon from "../../icons/search.svg";
import trash from "../../icons/trash_white.svg";
import downArrowIcon from "../../icons/down-arrow.svg";
import { eraseCookie } from "../../utils/cookie";
import {
  AccountIcon,
  AddressesIcon,
  GiftCardsIcon,
  HelpIcon,
  InviteFriendsIcon,
  LogoutIcons,
  NotificationIcon,
  OrdersIcon,
  PaymentIcon,
} from "../../icons";

class TopBar extends Component {
  state = {
    cartOpened: false,
    scrollTop: 0,
    pathname: "",
    searchValue: "",
    isScrolled: window.scrollY > 1 ? true : false,
    ourDropdown: false,
    isOpenDropdown: false,
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
    let pathname = window.location.pathname;
    return (
      <div className={topBarClass}>
        <div className={"topBar__tile"}>
          <div className="container"></div>
        </div>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            {/* <div className="col-lg-2 col-md-2 col-xs-2"> */}
            <div className={"topBar__logo"}>
              <Link to={"/"}>
                <img src={logo} alt={"logo"} />
              </Link>
            </div>
            {/* </div> */}
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
            <div className="col-lg-4 col-md-4 col-xs-7 topBar__rightSide">
              <div className={"topBar__links"}>
                {getCookie("user") != null && (
                  <Fragment>
                    <div className={"topBar__links__dropdownContainer"}>
                      <div
                        onClick={() => {
                          this.setState({
                            ourDropdown: !this.state.ourDropdown,
                          });
                          if (this.state.isOpenDropdown) {
                            setTimeout(() => {
                              this.setState({
                                isOpenDropdown: false,
                              });
                            }, 220);
                          } else {
                            this.setState({
                              isOpenDropdown: !this.state.isOpenDropdown,
                            });
                          }
                        }}
                      >
                        {/* <Button
                          type={"link"}
                          text={getCookie("user")}
                          icon={Profile}
                          leftRounded={true}
                          rightIcon={downArrowIcon}
                          sizeName={"tiny"}
                          iconPosition={"left"}
                          textClass={
                            this.state.isScrolled
                              ? "topBar__links__scroll"
                              : "topBar__links__nonscroll"
                          }
                        /> */}
                        <div
                          className={`topBarMenuButton ${
                            this.state.isScrolled
                              ? "topBar__links__scroll"
                              : "topBar__links__nonscroll"
                          }`}
                        >
                          <div className="topBarMenuButtonLeftSide">
                            <img
                              src={Profile}
                              alt=""
                              className="topBarMenuButtonLeftSideIcon"
                            />
                          </div>
                          <div className="topBarMenuButtonTitle">
                            {getCookie("user")}
                          </div>
                          <div className="topBarMenuButtonRightSide">
                            <img
                              src={downArrowIcon}
                              alt=""
                              className="topBarMenuButtonRightSideIcon"
                            />
                          </div>
                        </div>
                      </div>
                      {this.state.isOpenDropdown && (
                        <div
                          className={
                            "topBar__links__dropdownContainer__dropdown"
                          }
                        >
                          <ul
                            className={` ${
                              !this.state.ourDropdown
                                ? "dropDownWrapperScaleOut"
                                : "dropDownWrapper"
                            }`}
                          >
                            <li>
                              <div className={"title"}>
                                Hi, {getCookie("user")}
                              </div>
                            </li>
                            <li></li>
                            <li
                              className="active"
                              onClick={() => {
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                                this.setState({ ourDropdown: false });
                              }}
                            >
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
                                <div
                                  className={`title ${
                                    pathname.includes("Orders") && "active"
                                  }`}
                                >
                                  Your Orders
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                this.setState({ ourDropdown: false });
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                              }}
                            >
                              <Link to="/AccountSettings">
                                <div className={"dropDownImage"}>
                                  <AccountIcon
                                    className={
                                      pathname.includes("AccountSettings")
                                        ? "activeDropdownIcon"
                                        : "topBarDropdownImage"
                                    }
                                  />
                                </div>
                                <div
                                  className={`title ${
                                    pathname.includes("AccountSettings") &&
                                    "active"
                                  }`}
                                >
                                  Account Settings
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                                this.setState({ ourDropdown: false });
                              }}
                            >
                              <Link to="/Addresses">
                                <div className={"dropDownImage"}>
                                  <AddressesIcon
                                    className={
                                      pathname.includes("Addresses")
                                        ? "activeDropdownIcon"
                                        : "topBarDropdownImage"
                                    }
                                  />
                                </div>
                                <div
                                  className={`title ${
                                    pathname.includes("Addresses") && "active"
                                  }`}
                                >
                                  Addresses
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                this.setState({ ourDropdown: false });
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                              }}
                            >
                              <Link to="/PaymentMethods">
                                <div className={"dropDownImage"}>
                                  <PaymentIcon
                                    className={
                                      pathname.includes("PaymentMethods")
                                        ? "activeDropdownIcon"
                                        : "topBarDropdownImage"
                                    }
                                  />
                                </div>
                                <div
                                  className={`title ${
                                    pathname.includes("PaymentMethods") &&
                                    "active"
                                  }`}
                                >
                                  Payment Methods
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                                this.setState({ ourDropdown: false });
                              }}
                            >
                              <Link to="/Notifications">
                                <div className={"dropDownImage"}>
                                  <NotificationIcon
                                    className={
                                      pathname.includes("Notifications")
                                        ? "activeDropdownIcon"
                                        : "topBarDropdownImage"
                                    }
                                  />
                                </div>
                                <div
                                  className={`title ${
                                    pathname.includes("Notifications") &&
                                    "active"
                                  }`}
                                >
                                  Notification
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                this.setState({ ourDropdown: false });
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                              }}
                            >
                              <Link to="/Gifts">
                                <div className={"dropDownImage"}>
                                  <GiftCardsIcon
                                    className={
                                      pathname.includes("Gifts")
                                        ? "activeDropdownIcon"
                                        : "topBarDropdownImage"
                                    }
                                  />
                                </div>
                                <div
                                  className={`title ${
                                    pathname.includes("Gifts") && "active"
                                  }`}
                                >
                                  Credits, promos & gift cards
                                </div>
                              </Link>
                            </li>
                            <li></li>
                            <li
                              onClick={() => {
                                this.setState({ ourDropdown: false });
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                              }}
                            >
                              <Link>
                                <div className={"dropDownImage"}>
                                  <InviteFriendsIcon
                                    className={"topBarDropdownImage"}
                                  />
                                </div>
                                <div className={`title`}>Invite Friends</div>
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                                this.setState({ ourDropdown: false });
                              }}
                            >
                              <Link>
                                <div className={"dropDownImage"}>
                                  <HelpIcon className={"topBarDropdownImage"} />
                                </div>
                                <div className={"title"}>Help</div>
                              </Link>
                            </li>
                            <li></li>
                            <li
                              onClick={() => {
                                this.setState({ ourDropdown: false });
                                setTimeout(() => {
                                  this.setState({
                                    isOpenDropdown: false,
                                  });
                                }, 220);
                              }}
                            >
                              <Link to="#" onClick={this.logout}>
                                <div className={"dropDownImage"}>
                                  <LogoutIcons className="topBarDropdownImage" />
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
                      className={"topBar__links__dropdownContainer withBorder"}
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
                  className={"topBar__links__dropdownContainer withBorder"}
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
