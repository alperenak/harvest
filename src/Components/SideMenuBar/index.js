import React from "react";
import { Link } from "react-router-dom";
import "./sideMenuBar.scss";
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

export default class SideMenuBar extends React.Component {
  render() {
    let pathname = window.location.pathname;
    return (
      <div className="col-lg-4 col-md-4 col-xs-12">
        <div className={"Orders__newBlock"}>
          <div className="container">
            <ul className={"leftSideMenu"}>
              <li className="sideBarMenuTitleWrapper">
                <Link to="/Orders">
                  <div className={"dropDownImage"}>
                    <OrdersIcon
                      className={`topBarDropdownImage ${
                        pathname.includes("Orders") && "sideMenuIconActive"
                      } `}
                    />
                  </div>
                  <div
                    className={`sideMenuTitle ${
                      pathname.includes("Orders") && "sideMenuTitleActive"
                    }`}
                  >
                    Your Orders
                  </div>
                </Link>
              </li>
              <li className="sideBarMenuTitleWrapper">
                <Link to="/AccountSettings">
                  <div className={"dropDownImage"}>
                    <AccountIcon
                      className={`topBarDropdownImage ${
                        pathname.includes("AccountSettings") &&
                        "sideMenuIconActive"
                      } `}
                    />
                  </div>
                  <div
                    className={`sideMenuTitle ${
                      pathname.includes("AccountSettings") &&
                      "sideMenuTitleActive"
                    }`}
                  >
                    Account Settings
                  </div>
                </Link>
              </li>
              <li className="sideBarMenuTitleWrapper">
                <Link to="/Addresses">
                  <div className={"dropDownImage"}>
                    <AddressesIcon
                      className={`topBarDropdownImage ${
                        pathname.includes("Address") && "sideMenuIconActive"
                      } `}
                    />
                  </div>
                  <div
                    className={`sideMenuTitle ${
                      pathname.includes("Address") && "sideMenuTitleActive"
                    }`}
                  >
                    Addresses
                  </div>
                </Link>
              </li>
              <li className="sideBarMenuTitleWrapper">
                <Link to="/PaymentMethods">
                  <div className={"dropDownImage"}>
                    <PaymentIcon
                      className={`topBarDropdownImage ${
                        (pathname.includes("PaymentMethods") ||
                          pathname.includes("AddCard")) &&
                        "sideMenuIconActive"
                      } `}
                    />
                  </div>
                  <div
                    className={`sideMenuTitle ${
                      (pathname.includes("PaymentMethods") ||
                        pathname.includes("AddCard")) &&
                      "sideMenuTitleActive"
                    }`}
                  >
                    Payment Methods
                  </div>
                </Link>
              </li>

              <li className="sideBarMenuTitleWrapper">
                <Link to="/Gifts">
                  <div className={"dropDownImage"}>
                    <GiftCardsIcon
                      className={`topBarDropdownImage ${
                        pathname.includes("Gifts") && "sideMenuIconActive"
                      } `}
                    />
                  </div>
                  <div
                    className={`sideMenuTitle ${
                      pathname.includes("Gifts") && "sideMenuTitleActive"
                    }`}
                  >
                    Promotions
                  </div>
                </Link>
              </li>
              <li className="sideBarMenuTitleWrapper"></li>
              <li className="sideBarMenuTitleWrapper"></li>
              <li className="sideBarMenuTitleWrapper">
                <Link to="/Login">
                  <div className={"dropDownImage"}>
                    <LogoutIcons className="topBarDropdownImage" />
                  </div>
                  <div className={`sideMenuTitle `}>Logout</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
