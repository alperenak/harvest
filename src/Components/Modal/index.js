import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Styles ***/
import styles from './modal.scss';
import cancelIcon from "../../assets/cancel.png";
class Modal extends Component {
    render() {
        let { closeModal, width, backgroundColor = '#fff', header, declaration, content, buttons, modalSize = 'small' } = this.props;
        const modalSizeClass = modalSize === 'small' ? "modalWrapper__modalSmall" : "modalWrapper__modalLarge";

        return (
            <div className={"modalWrapper"} onClick={() => closeModal()}>
                <div onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className={modalSizeClass}>
					<div class={"modalWrapper__closeIcon"} id="modalWrapper__closeIcon" onClick={() => closeModal()}>
						<img src={cancelIcon} />
					</div>
                    <Card type={'modal_2'} backgroundColor={backgroundColor}>

                        <div style={{ width }} className={"modalWrapper__modal"}>
							<div class="row">
								<div class="col-md-12">
									<div v-if={header} className={"modalWrapper__modal__header"}>
		                                {header}
		                            </div>
								</div>
								<div class="col-md-12">
									<div v-if={declaration} className={"modalWrapper__modal__declaration"}>
										{declaration}
									</div>
								</div>
								<div class="col-md-12">
									<div v-if={buttons} className={"modalWrapper__modal__buttons"}>
										{buttons.map((btn, i) => {
											return <Button
												key={i}
												type={btn.type}
												text={btn.text}
												sizeName={btn.sizeName}
												width={btn.width}
												onButtonClick={btn.onButtonClick}
												to={btn.to}
												loading={btn.loading}
											/>;
										})}
									</div>
								</div>
							</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Modal;

Modal.propTypes = {
    closeModal: PropTypes.func,
    content: PropTypes.any,
    buttons: PropTypes.array,
    declaration: PropTypes.string,
    header: PropTypes.string,
    width: PropTypes.string
};
