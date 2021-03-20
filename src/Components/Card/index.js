import React, { Component } from "react";
import PropTypes from "prop-types";

/*** Styles ***/
import styles from "./card.scss";

class Card extends Component {
  render() {
    let { type, header, children, iconName, backgroundColor = '#fff', posts } = this.props;
    var className = "Card";
    if(iconName == "bell"){
      className += " bellDropDown";
    }
    if(type == "jobPost" || type == "pricing"){
      if(typeof this.props.anim === "undefined"){
        className += " boxAnimation";
      }
    }
    return (
      <div className={`${className} ${type} ${posts.length > 1 && "multiple"}`} style={{ backgroundColor }}>
        <div
          v-if={header}
          className={`${"cardHeader"}`}
          style={{ backgroundColor }}
        >
        </div>
        {children}
      </div>
    );
  }
}

export default Card;

Card.propTypes = {
  type: PropTypes.string,
  externalData: PropTypes.array,
  posts: PropTypes.array,
  sections: PropTypes.array,
  profileObject: PropTypes.object,
  header: PropTypes.object,
  title: PropTypes.string,
};

Card.defaultProps = {
  type: "",
  posts: [],
  sections: [],
  externalData: [],
  title: "",
};
