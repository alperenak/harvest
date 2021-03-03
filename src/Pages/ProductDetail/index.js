import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import downArrow from "../../icons/down-arrow3.svg";
import shareIcon from "../../icons/share.svg";
import LoadingModal from "../../Components/LoadingModal";
import store from "../../store";
import { getCookie } from "../../utils/cookie";
import shoppingCartIcon from "../../icons/shopping-cart-icon.svg";

import styles from "./productDetail.scss";

class ProductDetail extends Component {
    state = {
        item: null,
        processing: true
    };

    async componentDidMount() {
        await this.getItem();
        window.scrollTo(0, 0);
    }
    getItem = async () => {
        this.setState({ processing: true });
        let res = await store.getSingleItem(this.props.match.params.id);
        if (res) {
            this.setState({
                item: res.data,
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
    render() {
        const options = {
            items: 4,
            nav: false,
            dots: false,
            autoplayTimeout: 2500,
            rewind: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 4
                }
            }
        };
        let { item } = this.state;
        return (
            <>
                {
                    this.state.processing === true &&
                    <LoadingModal text="Loading" />
                }
                {
                    this.state.processing !== true &&
                    <div className={"ProductDetail"}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className={"ProductDetail__breadcrumb"}>
                                        <div className={"ProductDetail__breadcrumb__items"}>
                                            <div className={"ProductDetail__breadcrumb__items__item grayed"}>
                                                Home
                        </div>
                                            <div className={"ProductDetail__breadcrumb__items__item grayed"}>
                                                <img src={downArrow} className="right" />
                                            </div>
                                            <div className={"ProductDetail__breadcrumb__items__item grayed"}>
                                                Vegetables
                        </div>
                                            <div className={"ProductDetail__breadcrumb__items__item grayed"}>
                                                <img src={downArrow} className="right" />
                                            </div>
                                            <div className={"ProductDetail__breadcrumb__items__item"}>
                                                Tomatoes
                        </div>
                                        </div>
                                        <div className={"ProductDetail__breadcrumb__share"}>
                                            <img src={shareIcon} />
                                            <span>Share</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-xs-12">
                                    <div className={"ProductDetail__postsSection"}>
                                        <div className={"ProductDetail__postsSection__imageBox"}>
                                            <img src={`http://3.80.123.181${item.item_image[0].path}`} />
                                            <div className={"ProductDetail__postsSection__imageBox"}>
                                                <div className={"ProductDetail__postsSection__imageBox__imgSlides"}>
                                                {item.item_image !== null && item.item_image.map((item_image, image_index) => (
                                                    <img src={`http://3.80.123.181${item_image.path}`} />
                                                ))
                                                }
                                                <img src={`http://3.80.123.181${item.item_image[0].path}`} />
                                            <img src={`http://3.80.123.181${item.item_image[0].path}`} />
                                            <img src={`http://3.80.123.181${item.item_image[0].path}`} />
                                            <img src={`http://3.80.123.181${item.item_image[0].path}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-xs-12">
                                    <div className={"ProductDetail__postsSection"}>
                                        <div className="ProductDetail__postsSection__sectionTitle">
                                            {item.name}
                                        </div>
                                        {/* <div className="ProductDetail__postsSection__sectionMass">
                                    2 kg <span className="dot grayed">·</span> <span className="grayed">$0.37 per kg</span>
                                </div> */}

                                        <div className="ProductDetail__postsSection__itemPriceBox">
                                            <div className="ProductDetail__postsSection__itemPriceBox__price">
                                                <div className="ProductDetail__postsSection__itemPriceBox__price__text">$ {item.price}</div>
                                                {/* <div className="ProductDetail__postsSection__itemPriceBox__price__discount">
                                            25% off
                                        </div> */}
                                            </div>
                                            {/* <div className="ProductDetail__postsSection__itemPriceBox__oldPrice"> $3.60 /
                                        kg </div> */}
                                        </div>
                                        <div className="ProductDetail__postsSection__sectionMass">
                                            Quantity
                    </div>
                                        <div className="ProductDetail__postsSection__quantityBox">
                                            <div className="ProductDetail__postsSection__quantityBox__option">
                                                <select className={"form-control"}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                            <a href="javascript:;" onClick={(e) => { this.setItem(item)}}>
                                                <div className="ProductDetail__postsSection__quantityBox__cartButton">
                                                    <img src={shoppingCartIcon} alt={shoppingCartIcon}
                                                        className="ProductDetail__postsSection__quantityBox__cartButton__icon" />
                                                    <span className="ProductDetail__postsSection__quantityBox__cartButton__price"> Add to cart </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-7 col-lg-7 col-xs-12">
                                    <div className={"ProductDetail__postsSection"}>
                                        <div className="ProductDetail__postsSection__sectionTitle text-left">
                                            Description
                    </div>
                                        {
                                            !item.desc ? (

                                                <div className="ProductDetail__postsSection__sectionParagraph text-left">
                                                    <p>
                                                        Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Eu nisl nunc mi
                                                        Proin fermentum leo vel orci porta non. Blandit massa enim nec dui nunc mattis enim ut.
                        </p>
                                                    <p>
                                                        Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Eu nisl nunc mi
                                                        Proin fermentum leo vel orci porta non. Blandit massa enim nec dui nunc mattis enim ut.
                        </p>
                                                    <p>
                                                        Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Eu nisl nunc mi
                                                        Proin fermentum leo vel orci porta non. Blandit massa enim nec dui nunc mattis enim ut.
                        </p>
                                                </div>
                                            ) : (
                                                    <div className="ProductDetail__postsSection__sectionParagraph text-left">
                                                        <p>

                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                )
                                        }
                                    </div>
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

export default ProductDetail;