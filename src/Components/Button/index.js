import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from './button.scss';

/*** Icons **/
import loadingIcon from '../../icons/loading.svg';

class Button extends Component {
    onClick = () => {
        let {disabled, onButtonClick} = this.props;
        if(!disabled) {
            onButtonClick();
        }
    };

    renderContent() {
        let {disabled, hoverIcon, loading, icon, iconAutoWidth, iconPosition, text, textClass, rightIcon} = this.props;
        return (
            <Fragment>
                {(icon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${iconPosition+'-icon'} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {(icon && hoverIcon && iconPosition.includes('left') && !disabled) && <img src={hoverIcon} alt="" className={`${iconPosition+'-icon'} ${"hoverIcon"} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {(icon && !hoverIcon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${iconPosition+'-icon'} ${"hoverIcon"} ${(iconAutoWidth?"autoWidth":'')}`} />}
                <img hidden={!loading} src={loadingIcon} alt={'loading'} />
                {(icon && iconPosition.includes('center')) && <img src={icon} alt="" className={`${iconPosition+'-icon'} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {(icon && hoverIcon && iconPosition.includes('center') && !disabled) && <img src={hoverIcon} alt="" className={`${iconPosition+'-icon'} ${"hoverIcon"} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {(icon && !hoverIcon && iconPosition.includes('center')) && <img src={icon} alt="" className={`${iconPosition+'-icon'} ${"hoverIcon"} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {!loading && <span className={textClass}>{text}</span>}
                {rightIcon && hoverIcon && <span className="rightClass"> <img src={rightIcon} alt="" /> </span>}
                {rightIcon && !hoverIcon &&  <span className="rightClass"> <img src={rightIcon} alt="" /> </span>}
                {(icon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${iconPosition+'-icon'} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {(icon && hoverIcon && iconPosition.includes('right') && !disabled) && <img src={hoverIcon} alt="" className={`${iconPosition+'-icon'} ${"hoverIcon"} ${(iconAutoWidth?"autoWidth":'')}`} />}
                {(icon && !hoverIcon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${iconPosition+'-icon'} ${"hoverIcon"} ${(iconAutoWidth?"autoWidth":'')}`} />}
            </Fragment>
        );
    }
    responsiveConverter(responsive){
        if(responsive==='post'){
            return "responsivePost"
        }
        else if (responsive === 'auth'){
            return "responsiveAuth"
        }
        else if (responsive === 'link'){
            return "responsiveLink"
        }
        else if (responsive === 'hamburger'){
            return "responsiveHamburger"
        }
        else return ''
    }

    render() {
        let {disabled, to, onButtonClick, loading, width, sizeName, type, onMouseOver, onMouseLeave,responsive,isLink} = this.props;
        return (
            <Fragment>
                <button style={{width: width}} v-if={!to && !isLink} onClick={onButtonClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
                    className={`${"btn"} ${loading ? "loading" : ''} ${sizeName} ${type} ${this.responsiveConverter(responsive)} ${(disabled?"disabled":'')}`}>
                    {this.renderContent()}
                </button>
            </Fragment>
        );
    }
}

export default Button;

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  hoverIcon: PropTypes.string,
  icon: PropTypes.string,
  iconAutoWidth: PropTypes.bool,
  iconPosition: PropTypes.string,
  onButtonClick: PropTypes.func,
  to: PropTypes.string,
  sizeName: PropTypes.string,
  rightIcon: PropTypes.bool,
  responsive:PropTypes.string,
  text: PropTypes.string,
  textClass : PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  rightIcon: false,
  hoverIcon: "",
  icon: "",
  iconAutoWidth: false,
  iconPosition: "",
  sizeName: "default",
  type: "primary",
  textClass: "nonscroll",
  responsive:"",
};
