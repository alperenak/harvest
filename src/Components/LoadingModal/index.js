import React from "react";
import "./LoadingModal.scss";
import Logo from "../../icons/loading.svg";
import LoadingIcon from "../../assets/tinyLogo.png";
export default function Loading({ noBackground, fullscreen }) {
  return (
    <div
      className={`loadingContainer fullscreen ${
        noBackground ? "noBackground" : ""
      }
      ${fullscreen ? "fullscreen" : ""}
      `}
    >
      <div>
        <img alt="sadasd" src={LoadingIcon} className={"loading"} />
      </div>
      <div style={{ margin: 20 }}>
        <img alt="asd" width="50" height="50" src={Logo} />
      </div>
    </div>
  );
}
