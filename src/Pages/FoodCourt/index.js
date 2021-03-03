import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import LoadingModal from "../../Components/LoadingModal";
import shoppingCartIcon from "../../icons/shopping-cart-icon.svg";
import store from "../../store";
import { setCookie } from "../../utils/cookie";

import styles from "./foodCourt.scss";

class FoodCourt extends Component {
    state = {
        items: null,
        steps:null,
        quantity: 1,
        deliveryTip: 2.00,
        foodCourtData: {},
        total: 0.00,
        processing:true
    };
    async componentDidMount() {
        await this.getFoodCourt();
        window.scrollTo(0, 0);
    }
    applyCoupon(){
        this.props.createModal({
            header: "Error",
            declaration: "Apply Coupon!",
            buttons: [
              {
                type: "primary",
                text: "OK",
                sizeName: "default",
                onButtonClick: () => {
                  this.props.closeModal();
                },
              },
            ],
          });
    }
    placeOrder(event){
        event.preventDefault();
        var orderItem = {}
        orderItem.total = Number(this.state.total).toFixed(2)
        orderItem.foodCourtData = this.state.foodCourtData
        orderItem.deliveryTip = Number(this.state.deliveryTip).toFixed(2)
        orderItem.quantity = this.state.quantity
        localStorage.setItem('foodCourtItem', JSON.stringify(orderItem));
        localStorage.setItem("cartItems", null);
        window.location.pathname = `/Checkout`;
    }
    getFoodCourt = async () => {
        this.setState({processing:true});
        let res = await store.getSingleItem(this.props.match.params.id);
        if (res) {
            this.setState({
                items: res.data,
                total: res.data.price,
                steps: JSON.parse(res.data.desc).steps,
                foodCourtData: {"item_id": res.data.id, "name":res.data.name, "price":res.data.price, "quantity": 1},
                processing: false
            });
        }
    };
    changeActive(type, id, e, price, item, step) {
        var element = document.getElementById(type + id);
        if (type == "element") {
            var radio = document.getElementById('radio' + id);
            var foodCourtObject = this.state.foodCourtData;
            var blockItems = document.getElementById('radio' + id).closest('.container').querySelectorAll('.blockItems');
            for (var i = 0; i < blockItems.length; i++) {
                blockItems.item(i).classList.remove("FoodCourt__block__deliveryItem__active");
                blockItems.item(i).classList.add("FoodCourt__block__deliveryItem");
            }
            
            if(typeof foodCourtObject[step] === "undefined"){
                foodCourtObject[step] = []
                foodCourtObject[step].push(item)
                this.setState({
                    foodCourtData: foodCourtObject,
                    total: Number(this.state.total) + (Number(price))
                });
            }
            else{
                var oldPrice = this.state.foodCourtData[step][0].price
                foodCourtObject[step] = []
                foodCourtObject[step].push(item)
                this.setState({
                    total: Number(this.state.total) + (Number(price))  - (Number(oldPrice)),
                    foodCourtData: foodCourtObject
                });
            }
            radio.checked = true;
            element.classList.remove("FoodCourt__block__deliveryItem");
            element.classList.add("FoodCourt__block__deliveryItem__active");
        }
        else if (type == "check") {
            var checkbox = document.getElementById('checkbox' + id);
            var checkBlock = document.getElementById('check' + id);
            var foodCourtObject = this.state.foodCourtData;
            this.setState({
                foodCourtData: foodCourtObject
            });
            if(checkbox.checked === true){
                checkbox.checked = false;
                checkBlock.classList.remove("FoodCourt__block__deliveryItem2__active");
                checkBlock.classList.add("FoodCourt__block__deliveryItem2");
                this.setState({
                    total: Number(this.state.total) - (Number(price)) 
                });
                foodCourtObject[step] = foodCourtObject[step].filter(function(value) {
                    return item !== value
                })
                this.setState({
                    foodCourtData: foodCourtObject
                });
            }
            else{
                checkbox.checked = true;
                checkBlock.classList.add("FoodCourt__block__deliveryItem2__active");
                checkBlock.classList.remove("FoodCourt__block__deliveryItem2");
                this.setState({
                    total: Number(this.state.total) + (Number(price)) 
                });
                if(typeof foodCourtObject[step] === "undefined"){
                    foodCourtObject[step] = []
                    foodCourtObject[step].push(item)
                    this.setState({
                        foodCourtData: foodCourtObject
                    });
                }
                else{
                    foodCourtObject[step].push(item)
                    this.setState({
                        foodCourtData: foodCourtObject
                    });
                }
            }
            console.log(this.state.foodCourtData)
        }
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
        let { items } = this.state;
        return (
            <>
            {
                this.state.processing === true &&
                <LoadingModal text="Loading" />
            }
            {
                this.state.processing !== true &&
            <div className={"FoodCourt"}>
                <div className="container">
                <form id="myForm">
                    <div className="row">
                        <div className="col-lg-7 col-md-7 col-xs-12">
                        <div className={"FoodCourt__block"}>
                            <div className="container">
                                <div className="FoodCourt__block__sectionTitle">
                                {this.state.items !== null && this.state.items.name}
                                </div>
                            </div>
                        </div>
                        {this.state.steps !== null && this.state.steps.map((item, index) => (
                            <>
                            {item.upTo == 1 &&            
                            <div className={"FoodCourt__block"}>
                                <div className="container">
                                    <div className="FoodCourt__block__sectionTitle">
                                        <div className="FoodCourt__block__sectionTitle__step">STEP {index+1}</div>
                                            {item.name}
                                        </div>
                                    <div className="hrLine"></div>
                                    <div className="FoodCourt__block__subTitle oranged"> {item.name} </div>
                                    {item.stepItems !== null && item.stepItems.map((item2, index2) => (
                                    <div className="FoodCourt__block__deliveryItem blockItems" id={"element"+index+""+index2} onClick={(e) => this.changeActive("element", index+""+index2, e, item2.price, item2, "step"+index)}>
                                        <div className="FoodCourt__block__deliveryItem__input">
                                            <input type="radio" name={"radioGroup"+index} id={"radio"+index+""+index2} value={item2.label} />
                                        </div>
                                        <div className="FoodCourt__block__deliveryItem__text">
                                            {item2.label}
                                            <div className="FoodCourt__block__deliveryItem__text__subText">
                                                {item2.description}
                                                {/* Tomato <span className="dot grayed">·</span> Onion <span className="dot grayed">·</span> Chicken Meat */}
                                            </div>
                                        </div>
                                        <div className="FoodCourt__block__deliveryItem__price">
                                            $ {item2.price}
                                        </div>
                                    </div>
                                    ))
                                    }
                                     {/*<div className="hrLine"></div>
                                    <div className="FoodCourt__block__subTitle oranged"> Select Size </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="FoodCourt__block__deliveryItem2">
                                                <div className="FoodCourt__block__deliveryItem2__input">
                                                    <input type="radio" name="chooseSize" />
                                                </div>
                                                <div className="FoodCourt__block__deliveryItem2__time">
                                                    Medium
                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="FoodCourt__block__deliveryItem2__active">
                                                <div className="FoodCourt__block__deliveryItem2__input">
                                                    <input type="radio" name="chooseSize" checked />
                                                </div>
                                                <div className="FoodCourt__block__deliveryItem2__time">
                                                    Large (+ $0.80)
                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:;">
                                        <div className="Checkout__block__standartButton ">
                                            <span className="Checkout__block__standartButton__text"> Continue </span>
                                        </div>
                                    </a>
                                 */}
                                </div>
                            </div>
                            }
                            {item.upTo > 1 || item.upTo == 0 &&
                            <div className={"FoodCourt__block"}>
                                <div className="container">
                                    <div className="FoodCourt__block__sectionTitle">
                                        <div className="FoodCourt__block__sectionTitle__step">STEP {index+1}</div>
                                        {item.name}
                                    </div>
                                    <div className="hrLine"></div>
                                    <div className="FoodCourt__block__subTitle oranged"> 
                                    {item.name} 
                                    {
                                        item.upTo > 0 &&
                                        <>
                                            ( Up to {item.upTo} )
                                        </>
                                    }
                                    </div>
                                    <div className="row">
                                        {item.stepItems !== null && item.stepItems.map((item2, index2) => (
                                        <div className="col-lg-6 col-md-6 col-xs-12">
                                            <div className="FoodCourt__block__deliveryItem2 blockItems" id={"check"+index+""+index2} onClick={(e) => this.changeActive("check", index+""+index2, e, item2.price, item2, "step"+index)}>
                                                <div className="FoodCourt__block__deliveryItem2__input">
                                                    <input type="checkbox" value={item2.label} id={"checkbox"+index+""+index2} onClick={(e) => this.changeActive("check", index+""+index2, e, item2.price, item2, "step"+index)}/>
                                                </div>
                                                <div className="FoodCourt__block__deliveryItem2__time">
                                                    {item2.label}
                                                </div>
                                                <div className="FoodCourt__block__deliveryItem2__rightPrice">
                                                    $ {item2.price}
                                                </div>
                                            </div>
                                        </div>
                                            ))
                                        }
                                    </div>
                                    {/* <a href="javascript:;">
                                        <div className="Checkout__block__standartButton ">
                                            <span className="Checkout__block__standartButton__text"> Continue </span>
                                        </div>
                                    </a> */}
                                </div>
                            </div>
                            }
                            </>
                            ))
                        }
                        </div>
                        <div className="col-lg-5 col-md-5 col-xs-12">
                            <div className={"FoodCourt__block"}>
                                <div className="container">
                                    <Link to="#" onClick={(e) => {this.placeOrder(e)}}>
                                        <div className="FoodCourt__block__itemPlaceBox">
                                            <span className="FoodCourt__block__itemPlaceBox__price"> Place Order </span>
                                        </div>
                                    </Link>
                                    <div className="row mt30">
                                        <div className="col-8 text-left">
                                            <span className="FoodCourt__block__leftPart">
                                                Subtotal
                                            </span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="FoodCourt__block__rightPart">
                                               $ { this.state.total !== null && (this.state.total * this.state.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className="row mt10">
                                        <div className="col-8 text-left">
                                            <span className="FoodCourt__block__leftPart">
                                                Service fee
                                            </span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="FoodCourt__block__rightPart">
                                                $21.19
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt10">
                                        <div className="col-8 text-left">
                                            <span className="FoodCourt__block__leftPart">
                                                Estimated taxed and fees
                                            </span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="FoodCourt__block__rightPart">
                                                $21.19
                                            </span>
                                        </div>
                                    </div> */}
                                    <div className="hrLine"></div>
                                    <div className="row mt30">
                                        <div className="col-8 text-left">
                                            <span className="FoodCourt__block__leftPart">
                                                Delivery Tip
                                </span>
                                            <Link to="#" className="FoodCourt__block__change">
                                                Change
                                </Link>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="FoodCourt__block__rightPart">
                                            $ { this.state.deliveryTip !== null && (this.state.deliveryTip).toFixed(2)}
                                </span>
                                        </div>
                                    </div>
                                    <div className="row mt30">
                                        <div className="col-12">
                                            Want to recognize your delivery person's efforts?
                                            Consider a larger tip as a thank you 100% of the tip
                                            goes to them.
                            </div>
                                    </div>
                                    <div className="hrLine"></div>
                                    <div className="row mt30">
                                        <div className="col-8 text-left">
                                            <span className="FoodCourt__block__leftPart__total">
                                                Total
                                </span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="FoodCourt__block__rightPart__totalPrice">
                                            $ { this.state.total !== null && this.state.deliveryTip !== null && ((this.state.total * this.state.quantity) + this.state.deliveryTip).toFixed(2) }
                                </span>
                                        </div>
                                    </div>
                                    {/* <div className="row mt10">
                                    <div className="col-8 ">
                                        </div>
                                        <div className="col-4 text-right">
                                            <span className="FoodCourt__block__rightPart oranged">
                                                You saved $2.00
                                            </span>
                                        </div>
                                    </div> */}
                                    <a onClick={() => this.applyCoupon}>
                                        <div className="FoodCourt__block__itemPromoBox" >
                                            <span className="FoodCourt__block__itemPromoBox__price"> Add Promo Code </span>
                                        </div>
                                    </a>
                                    <div className="row mt30">
                                        <div className="col-12 ">
                                            <p>
                                                By placing your order, you agree to be bound by the
                            HarvestTrolley <span className="oranged">Terms of Service</span> and Privacy Policy.
                            </p>
                                            <p>
                                                Your credit/debit card will be temporarily authorized
                                                for $35. Your statement will reflect the final order
                                                total after order completion.
                            </p>
                                            <p>
                                                Learn more A bag fee may be added to your final
                                                total if required by law or the retailer. The fee will be
                                                visible on your receipt after delivery.
                            </p>
                                            <p className="oranged">
                                                Learn more about pricing
                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
                <Footer />
            </div>
            }
            </>
        );
    }
}

export default FoodCourt;