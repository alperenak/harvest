import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Styles ***/
import styles from "./footer.scss";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";

/*** Icons ***/ 
import EarthGrid from "../../icons/earth-grid-symbol.svg";
import returnBox from "../../icons/return-box.svg";
import bestSeller from "../../icons/best-seller.svg";
import insurance from "../../icons/insurance.svg";
import shoppingStore from "../../icons/shopping-store.svg";
import at from "../../icons/at.svg";
import send from "../../icons/send.svg";

class Footer extends Component {
	render() {
		return (
			<div className={"footerSection"}>
				<div className="container">
					<div className={"footerSection__footerTop"}>
						<div className="row footerRow">
							<div className="col-xl-12 col-xs-12 col-lg-12 col-12">
								<div className={"footerSection__options"}>
									<div className="row">
										<div className="col-md-6">
											<div className={"footerSection__options__sectionDiv"}>
												<img src={insurance} alt={insurance} className={"footerSection__options__sectionImage"} />
												<h2 className={"footerSection__options__sectionMidTitle"}>Can't find answer? Don’t worry, our support team will help you :)</h2>
											</div>
										</div>
										<div className="col-md-6">
											<div className={"footerSection__options__sectionDiv float-right"}>
												<div className={"footerSection__options__inputWrapper"}>
													<img src={at} alt={at} className={"footerSection__options__inputIcon"} />
													<input type="text" placeholder="mail@gmail.com" className={"footerSection__options__input "} />
													<img src={send} alt={send} className={"footerSection__options__inputIcon float-right"} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row footerRow">
							<div className="col-xl-12 col-lg-12 col-xs-12 col-12">
								<div className={"footerSection__options"}>
									<div className="row">
										<div className="col-md-3 col-xs-12">
											<div className={"footerSection__options__sectionDiv"}>
												<img src={insurance} alt={insurance} className={"footerSection__options__sectionImage"} />
												<h2 className={"footerSection__options__sectionTitle"}>Safe Shopping</h2>
											</div>
										</div>
										<div className="col-md-3 col-xs-12">
											<div className={"footerSection__options__sectionDiv"}>
												<img src={returnBox} alt={returnBox} className={"footerSection__options__sectionImage"} />
												<h2 className={"footerSection__options__sectionTitle"}>Refund Guarantee</h2>
											</div>
										</div>
										<div className="col-md-3 col-xs-12">
											<div className={"footerSection__options__sectionDiv"}>
												<img src={shoppingStore} alt={shoppingStore} className={"footerSection__options__sectionImage"} />
												<h2 className={"footerSection__options__sectionTitle"}>Free Shipping</h2>
											</div>
										</div>
										<div className="col-md-3 col-xs-12">
											<div className={"footerSection__options__sectionDiv"}>
												<img src={bestSeller} alt={bestSeller} className={"footerSection__options__sectionImage"} />
												<h2 className={"footerSection__options__sectionTitle"}>High Quality Products</h2>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row footerRow">
							<div className="col-xl-12 col-lg-12 col-12">
								<div className={"footerSection__options"}>
									<div className="row">
										<div className="col-md-3">
											<div className={styles.knowUs}>
												<h2 className={"footerSection__options__optionTitle"}>Categories</h2>
												<ul>
													<li>
													<Link to="#">Organic</Link>
													</li>
													<li>
													<Link to="#">Grocery</Link>
													</li>
													<li>
													<Link to="#">Kitchen</Link>
													</li>
													<li>
													<Link to="#">Furniture</Link>
													</li>
												</ul>
											</div>
										</div>
										<div className="col-md-3">
											<div className={styles.knowUs}>
												<h2 className={"footerSection__options__optionTitle"}>Our Company</h2>
												<ul>
													<li>
														<Link to="#">About Us</Link>
													</li>
													<li>
														<Link to="#">Company</Link>
													</li>
												</ul>
											</div>
										</div>
										<div className="col-md-3">
											<div className={styles.knowUs}>
												<h2 className={"footerSection__options__optionTitle"}>Latest News</h2>
												<ul>
													<li>
														<Link to="#">Offers & Deals</Link>
													</li>
													<li>
														<Link to="#">My Account</Link>
													</li>
													<li>
														<Link to="#">My Products</Link>
													</li>
													<li>
														<Link to="#">Favorites</Link>
													</li>
												</ul>
											</div>
										</div>
										<div className="col-md-3">
											<div className={styles.knowUs}>
												<h2 className={"footerSection__options__optionTitle"}>Customer Support</h2>
												<ul>
													<li>
														<Link to="#">Conditions</Link>
													</li>
													<li>
														<Link to="#">Privacy</Link>
													</li>
													<li>
														<Link to="#">Blog</Link>
													</li>
													<li>
														<Link to="#">FAQs</Link>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
