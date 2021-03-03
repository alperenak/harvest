import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Styles ***/
import styles from "./footerAlternative.scss";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo-white.png";
import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import appStore from "../../icons/app-store-badge.svg";
import googlePlay from "../../icons/google-play-badge.svg";
import EarthGrid from "../../icons/earth-grid-symbol.svg";

class FooterAlternative extends Component {
	render() {
		return (
			<div className={"footerSection2"}>
				<div class="container">
					<div class="row">
						<div class="col-md-4">
							<div className={"footerSection2__rights"}>
								2020 • INTERNY Inc. © All rights reserved.
							</div>
						</div>
						<div class="col-md-8">


							<div className={"footerSection2__options"}>
								<ul className={"footerSection2__options__links"}>
									<li>
										<Link to="/aboutUs">About Us</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/faq">Careers</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/helpCenter">Help Center</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/faq">Internships</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/faq">FAQ</Link>
									</li>
								</ul>
							</div>


						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FooterAlternative;
