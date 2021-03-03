import React from "react";
import styles from "./ToolbarButton.scss";

export default function ToolbarButton(props) {
  const { icon } = props;
  return <i className={`${`toolbar-button`} ${icon}`} />;
}
