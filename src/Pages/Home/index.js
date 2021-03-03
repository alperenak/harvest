import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import LoadingModal from "../../Components/LoadingModal";
import trash from "../../icons/trash.svg";
import fruits from "../../assets/fruits.jpg";
import karefoto from "../../assets/karefoto.jpg";
import gutShots from "../../assets/gut_shots.jpg";
import viewMore from "../../icons/view-more-icon.svg";
import OwlCarousel from 'react-owl-carousel2';
import store from "../../store";

import styles from "./home.scss";
import { getCookie } from "../../utils/cookie";

class Home extends Component {
	state = {
		mainCategories: [],
		items: [],
		recommended: [],
		processing: true
	};
	async componentDidMount() {
		await this.getItems();
		window.scrollTo(0, 0);
	}
	getItems = async () => {
		if(getCookie("slug") !== null){
			let payload = {};
			let res = await store.getRestaurantFoodItems(payload, getCookie("slug"));
			if (res) {
				this.setState({
					mainCategories: res.data.mainCategories,
					items: res.data.items,
					recommended: res.data.recommended,
					processing: false
				});
			}
			this.setState({
				processing: false
			});
		}
		else{
			let res = await store.getFoodItems();
			if (res) {
				this.setState({
					mainCategories: res.data.mainCategories,
					items: res.data.items,
					recommended: res.data.recommended,
					processing: false
				});
			}
			this.setState({
				processing: false
			});
		}
		
			
	};
	setItem(item){
        this.setState({
            processing: true,
        });
        localStorage.setItem('foodCourtItem', null);
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        if(cartItems !== null){
            let control = 0;
            cartItems.find(function(value) {
                if(value.id == item.id){
                    value.quantity += 1
                    control++;
                }
            })
            if(control==0){
                var myObject = {};
                myObject.id = item.id;
                myObject.name = item.name;
                myObject.image = item.item_image[0].path;
                myObject.quantity = 1;
                myObject.price = item.price;
                cartItems.push(myObject);
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
        else{
            var objectArray = [];
            var myObject = {};
            myObject.id = item.id;
            myObject.name = item.name;
            myObject.image = item.item_image[0].path;
            myObject.quantity = 1;
            myObject.price = item.price;
            objectArray.push(myObject);
            localStorage.setItem("cartItems", JSON.stringify(objectArray))
        }
        this.setState({
            processing: false,
        });
    }
    removeItem(item){
        this.setState({
            processing: true,
        });
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        if(cartItems !== null){
            let control = 0;
            cartItems = cartItems.filter(function(value) {
                return item.id != value.id
            })
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
        this.setState({
            processing: false,
        });
    }
    getItemCount(item){
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        if(cartItems != null){
            let count = 0;
            cartItems.find(function(value) {
                if(value.id == item.id){
                    count = value.quantity
                }
            })
            return count;
        }
        else{
            return 0;
        }
    }
	render() {
		const catOptions = {
			items: 7,
			dots: false,
			autoplayTimeout: 2500,
			rewind: true,
			margin: 30,
			autoplay: false,
			responsive: {
				0: {
					items: 2
				},
				768: {
					items: 7
				}
			}
		};
		const itemsOption = {
			items: 4,
			nav: false,
			dots: false,
			autoplayTimeout: 2500,
			rewind: true,
			margin: 20,
			autoplay: false,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 4
				}
			}
		};
		return (

			<>
				{
					this.state.processing === true &&
					<LoadingModal text="Loading" />
				}
				{
					this.state.processing !== true &&
					<div className={"home"}>
						<div className={"home__postsSection mt-0 bgColored"}>
							<div className="container">
								<div className="row">
									<div className="col-lg-6 col-xs-12">
										<div className="home__postsSection__postsTitle">
											Pharetra et neque<br />
							ornare aenean
						</div>
										<div className="home__postsSection__postsSubTitle">
											Laoreet suspendisse interdum consectetur faucibus<br />
						nisl tincidunt eget vulputate ut pharetra sit amet aliquam.
						</div>
										<div className="home__postsSection__discoverBtn">
											<Button
												type={"secondary"}
												sizeName={"default"}
												text={"Primary Button"}
											/>
										</div>
									</div>
									<div className="col-lg-6 col-xs-12">
										<img src={karefoto} alt={karefoto} className={"sectionMainImg"} />
									</div>
								</div>
							</div>
						</div>

						<div className={"home__postsSection"}>
							<div className="container">
								<div className="row">
									<div className="col-6 home__postsSection__sectionTitle text-left">
										Browse our hottest categories
					</div>
									<div className="col-6 home__postsSection__sectionTitle text-right">

									</div>
								</div>
								<div className="row">
									<OwlCarousel ref="categories" options={catOptions}>
										{this.state.mainCategories !== null && this.state.mainCategories.map((item, index) => (
											<div className="home__postsSection__categoryBoxes">
												<div className="home__postsSection__categoryBoxes__imageBox">
													<img src={`http://34.224.26.130${item.image}`} className="home__postsSection__categoryBoxes__imageBox__image" />
												</div>
												<div className="home__postsSection__categoryBoxes__titleBox">
													<Link to={`/Departments/${item.id}`} className="home__postsSection__sectionLink__link"><span className="home__postsSection__categoryBoxes__titleBox__title"> {item.name} </span></Link>
												</div>
											</div>
										))
										}
									</OwlCarousel>
								</div>
							</div>
						</div>
						<div className={"home__postsSection"}>
							<div className="container">
								<div className="row">
									<div className="col-6 home__postsSection__sectionTitle text-left">
										Recommended Items
					</div>
									<div className="col-6 home__postsSection__sectionLink text-right">
										<Link to="/Departments" className="home__postsSection__sectionLink__link">View More <img src={viewMore} alt={viewMore} /></Link>
									</div>
								</div>
								<div className="row">
									<OwlCarousel ref="items" options={itemsOption}>
										{this.state.recommended !== null && this.state.recommended.map((item, index) => (
											<div className="home__postsSection__categoryBoxes">
												<div className="home__postsSection__categoryBoxes__basket">
                                                        <a href="javascript:;" onClick={(e) => { this.removeItem(item) }}>
                                                            <div className="home__postsSection__categoryBoxes__basket__trash">
                                                                <img src={trash} alt={trash} />
                                                            </div>
                                                        </a>
                                                        <div className="home__postsSection__categoryBoxes__basket__count">
                                                            {this.getItemCount(item)}
								                        </div>
                                                        <a href="javascript:;">
                                                            <div className="home__postsSection__categoryBoxes__basket__addNew" onClick={(e) => { this.setItem(item) }}>
                                                                +
									                        </div>
                                                        </a>
                                                    </div>
												<div className="home__postsSection__categoryBoxes__itemImageBox">
													<img src={`http://3.80.123.181${item.item_image[0].path}`} className="home__postsSection__categoryBoxes__itemImageBox__image" />
												</div>
												<div className="home__postsSection__categoryBoxes__itemTitleBox">
													<span className="home__postsSection__categoryBoxes__itemTitleBox__title"> <Link to={`/ProductDetail/${item.id}`}>{item.name}</Link> </span>
												</div>
												<div className="home__postsSection__categoryBoxes__itemPriceBox">
													<span className="home__postsSection__categoryBoxes__itemPriceBox__price"> $ {item.price} </span>
												</div>
											</div>
										))
										}

									</OwlCarousel>
								</div>
							</div>
						</div>
						<Footer />
					</div>
				}
			</>
		);
	}
}

export default Home;
