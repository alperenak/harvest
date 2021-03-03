import React, { Component } from 'react';
import ReactDOM from "react-dom"
import styles from "./LoadingModal.scss"

import loadingIcon from '../../assets/tinyLogo.png'

class LoadingModal extends Component {
    state = {}
    render() {
        return ReactDOM.createPortal(
            <div className={"loadingWrapper"}>
				<div className={"la-ball-triangle-path"}>
					<div></div>
					<div></div>
					<div></div>
				</div>
            </div>
            , document.getElementById('modal')
        );
    }
}

export default LoadingModal;
