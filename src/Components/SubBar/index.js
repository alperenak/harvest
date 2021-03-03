import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "../../utils/cookie";
/*** Components ***/
import Button from "../Button";

/*** Styles ***/
import styles from "./subBar.scss";

/*** Icons ***/
import deliveryLocationIcon from "../../icons/delivery-location-icon.svg";
import harvestTrolleyIcon from "../../icons/HarvestTrolley-icon.svg";
import requestNowIcon from "../../icons/request-now-icon.svg";
import downArrowIcon from "../../icons/down-arrow.svg";
import LoadingModal from "../../Components/LoadingModal";
import store from "../../store";

class SubBar extends Component {
  state = {
    scrollTop: 0,
    pathname: "",
    addresses: [],
    isScrolled: false,
    processing: false,
    selectedAddress: getCookie("address"),
    ourDropdown: false,
    ourDropdown2: false,
    vintageShow: false,
    marketTypes: [
      {
        value: "request-now",
        name: "Request Now",
      },
      {
        value: "harvest-market",
        name: "Harvest Market",
      },
      {
        value: "harvest-trolley",
        name: "Harvest Trolley",
      },
    ],
  };
  async componentDidMount() {
    if (getCookie("user") !== null) {
      await this.getUser();
    }
    if (!getCookie("zipcode")) {
      setCookie("zipcode", "77494", {});
      var payload = {
        zipcode: 77494,
        isVintage: true,
      };
    } else {
      var payload = {
        zipcode: getCookie("zipcode"),
        isVintage: true,
      };
    }
    let res = await store.getRestaurant(payload);
    if (res.data.vintageItems && res.data.vintageItems.length > 0) {
      this.setState({ vintageShow: true });
    } else {
      this.setState({ vintageShow: false });
    }
  }
  async changeMarketType(value) {
    localStorage.setItem("marketType", value);
    if (value === "request-now") {
      window.location.pathname = `/RequestNow`;
    } else {
      window.location.reload(false);
    }
  }
  async changeAddress(id, zipcode) {
    this.setState({
      selectedAddress: id,
    });
    let payload = {
      zipcode,
    };
    let res = await store.getRestaurant(payload);
    if (res) {
      if (res.data.restaurants) {
        setCookie("slug", res.data.restaurants.slug, {});
      }
    }
    setCookie("address", id, {});
    setCookie("zipcode", zipcode, {});
    localStorage.setItem("foodCourtItem", null);
    localStorage.setItem("cartItems", null);
    window.location.reload(false);
  }
  getUser = async () => {
    let res = await store.getUser();
    if (res) {
      this.setState({
        addresses: res.data.addresses,
      });
    }
  };

  render() {
    return (
      <>
        {this.state.processing === true && <LoadingModal text="Loading" />}
        {
          <div className="subBar">
            <div className="container">
              <div className="subBar__container">
                <img
                  src={harvestTrolleyIcon}
                  alt={harvestTrolleyIcon}
                  className="subBar__container__icon"
                />
                <div className="subBar__container__orderFrom">
                  <div className="subBar__container__orderFrom__top">
                    Order from
                    <br />
                  </div>
                  <Fragment>
                    <div className={"topBar__links__dropdownContainer3"}>
                      <div
                        onClick={() =>
                          this.setState({
                            ourDropdown2: !this.state.ourDropdown2,
                          })
                        }
                      ></div>
                      <div
                        className="subBar__container__orderFrom__bottom"
                        onClick={() =>
                          this.setState({
                            ourDropdown2: !this.state.ourDropdown2,
                          })
                        }
                      >
                        <Link
                          to="#"
                          className="subBar__container__orderFrom__bottom"
                        >
                          <div className="subBar__container__orderFrom__bottom">
                            {this.state.marketTypes.map((item, index) => (
                              <>
                                {item.value ===
                                  localStorage.getItem("marketType") && (
                                  <>{item.name}</>
                                )}
                              </>
                            ))}
                          </div>
                        </Link>
                      </div>
                      {this.state.ourDropdown2 == true && (
                        <div
                          className={
                            "topBar__links__dropdownContainer3__dropdown"
                          }
                        >
                          <ul className={"dropDownWrapper"}>
                            {this.state.marketTypes.map((item, index) => (
                              <>
                                <li
                                  onClick={(e) => {
                                    this.changeMarketType(item.value);
                                  }}
                                >
                                  {item.value !=
                                  localStorage.getItem("marketType") ? (
                                    <>{item.name}</>
                                  ) : (
                                    <span className={"strong"}>
                                      {" "}
                                      {item.name}{" "}
                                    </span>
                                  )}
                                </li>
                              </>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Fragment>
                </div>

                <img
                  src={downArrowIcon}
                  alt={downArrowIcon}
                  className="subBar__container__downIcon"
                />
                <img
                  src={requestNowIcon}
                  alt={requestNowIcon}
                  className="subBar__container__requestIcon"
                />
                <div className="subBar__container__menu">
                  <ul>
                    <li className="active">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/Departments">Departments</Link>
                    </li>
                    {this.state.vintageShow && (
                      <li>
                        <a href="/Departments/122">Vintage</a>
                      </li>
                    )}
                    <li>
                      <Link to="/FoodCourts">Food Court</Link>
                    </li>
                    <li>
                      <a href="#">Harvest Club</a>
                    </li>
                  </ul>
                </div>
                <img
                  src={deliveryLocationIcon}
                  alt={deliveryLocationIcon}
                  className="subBar__container__deliveryIcon"
                />
                <div className="subBar__container__orderFrom">
                  <div className="subBar__container__orderFrom__top">
                    Delivery to (30 min):
                  </div>
                  <Fragment>
                    <div className={"topBar__links__dropdownContainer2"}>
                      <div
                        onClick={() =>
                          this.setState({
                            ourDropdown: !this.state.ourDropdown,
                          })
                        }
                      ></div>
                      <div
                        className="subBar__container__orderFrom__bottom"
                        onClick={() =>
                          this.setState({
                            ourDropdown: !this.state.ourDropdown,
                          })
                        }
                      >
                        <Link
                          to="#"
                          className="subBar__container__orderFrom__bottom"
                        >
                          {this.state.addresses !== null &&
                            this.state.addresses.map((item, index) => (
                              <>
                                {item.id == getCookie("address") && (
                                  <>
                                    {item.tag} - {item.zipcode}
                                  </>
                                )}
                              </>
                            ))}
                        </Link>
                      </div>
                      {this.state.ourDropdown == true && (
                        <div
                          className={
                            "topBar__links__dropdownContainer__dropdown"
                          }
                        >
                          <ul className={"dropDownWrapper"}>
                            {this.state.addresses !== null &&
                              this.state.addresses.map((item, index) => (
                                <>
                                  <li
                                    onClick={(e) => {
                                      this.changeAddress(item.id, item.zipcode);
                                    }}
                                  >
                                    {item.id != getCookie("address") ? (
                                      <>
                                        {item.tag} - {item.address}
                                      </>
                                    ) : (
                                      <span className={"strong"}>
                                        {" "}
                                        {item.tag} - {item.address}{" "}
                                      </span>
                                    )}
                                  </li>
                                </>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

export default SubBar;
