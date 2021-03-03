import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../icons/close-filled.svg";
/*** Styles ***/
import styles from "./sideBar.scss";

/*** Icons ***/
import internyLogo from "../../assets/tinyLogo.png";

class SideBar extends Component {
  render() {
    let { type, isOpen, children } = this.props;
    return (
      <Fragment>
        {/* sidebar */}

        <div v-if={!type} className={"sideBar"}>
          <div className={"sideBar__logo"}>
            <Link to={"/"}>
              <img src={internyLogo} alt={"logo"} />
            </Link>
          </div>
        </div>

        {/* hamburger menu */}
        <div
          id="hamburger-menu"
          v-if={type === "hamburgerMenu"}
          className={"sideBar__hamburgerMenu"}
        >
          <img
            onClick={() => {
              document.getElementById("hamburger-menu").style.width = "0";
            }}
            src={CloseIcon}
            alt={"close"}
          />
          {children}
        </div>
      </Fragment>
    );
  }
}

export default SideBar;
