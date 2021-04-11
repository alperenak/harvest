import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import LoadingModal from "../../Components/LoadingModal";
import trash from "../../icons/trash.svg";
import BreadImage from "../../assets/bread.jpg";
import GroceryImage from "../../assets/grocery.jpg";
import ProduceImage from "../../assets/homeout.jpg";
import HouseholdImage from "../../assets/household.jpg";
import HomeOutdoorImage from "../../assets/homeout.jpg";
import BabyCareImage from "../../assets/babycare.jpg";
import DairyEggsImage from "../../assets/dairyeggs.jpg";
import WineImage from "../../assets/wine.jpg";
import MiquerenciaImage from "../../assets/mique.jpg";
import BazaarIstanbulImage from "../../assets/bazaar.jpg";
import ReadyToEatImage from "../../assets/readyeat.jpg";
import InternationalImage from "../../assets/bread.jpg";
import HealthyImage from "../../assets/healthy.jpg";
import PetsImage from "../../assets/pets.jpg";
import BeveragesImage from "../../assets/beverages.jpg";
import FrozenImage from "../../assets/frozenfoods.jpg";
import MeatsImage from "../../assets/meats.jpg";
import FruitsImage from "../../assets/fruits.jpg";
import karefoto from "../../assets/karefoto.jpg";
import gutShots from "../../assets/gut_shots.jpg";
import viewMore from "../../icons/view-more-icon.svg";
import store from "../../store";
import $ from "jquery";
import styles from "./home.scss";
import { getCookie } from "../../utils/cookie";

class Home extends Component {
  state = {
    mainCategories: [],
    items: [],
    recommended: [],
    processing: true,
  };
  async componentDidMount() {
    await this.getItems();
    window.scrollTo(0, 0);
  }
  getItems = async () => {
    if (getCookie("slug") !== null) {
      let payload = {};
      let res = await store.getRestaurantFoodItems(payload, getCookie("slug"));
      if (res) {
        this.setState({
          mainCategories: res.data.mainCategories,
          items: res.data.items,
          recommended: res.data.recommended,
          processing: false,
        });
      }
      this.setState({
        processing: false,
      });
    } else {
      let res = await store.getFoodItems();
      if (res) {
        this.setState({
          mainCategories: res.data.mainCategories,
          items: res.data.items,
          recommended: res.data.recommended,
          processing: false,
        });
      }
      this.setState({
        processing: false,
      });
    }
  };
  setItem(item) {
    this.setState({
      processing: true,
    });
    localStorage.setItem("foodCourtItem", null);
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems !== null) {
      let control = 0;
      cartItems.find(function (value) {
        if (value.id == item.id) {
          value.quantity += 1;
          control++;
        }
      });
      if (control == 0) {
        var myObject = {};
        myObject.id = item.id;
        myObject.name = item.name;
        myObject.image = item?.item_image[0]?.path;
        myObject.quantity = 1;
        myObject.price = item.price;
        cartItems.push(myObject);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      var objectArray = [];
      var myObject = {};
      myObject.id = item.id;
      myObject.name = item.name;
      myObject.image = item?.item_image[0]?.path;
      myObject.quantity = 1;
      myObject.price = item.price;
      objectArray.push(myObject);
      localStorage.setItem("cartItems", JSON.stringify(objectArray));
    }
    this.setState({
      processing: false,
    });
  }
  removeItem(item) {
    this.setState({
      processing: true,
    });
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems !== null) {
      let control = 0;
      cartItems = cartItems.filter(function (value) {
        return item.id != value.id;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    this.setState({
      processing: false,
    });
  }
  getItemCount(item) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems != null) {
      let count = 0;
      cartItems.find(function (value) {
        if (value.id == item.id) {
          count = value.quantity;
        }
      });
      return count;
    } else {
      return 0;
    }
  }

  getItemImageSources = ({ itemName }) => {
    if (itemName.includes("Bakery")) {
      return BreadImage;
    } else if (itemName.includes("Grocery")) {
      return GroceryImage;
    } else if (itemName.includes("Deli")) {
      return MeatsImage;
    } else if (itemName.includes("Produce")) {
      return ProduceImage;
    } else if (itemName.includes("Meat")) {
      return MeatsImage;
    } else if (itemName.includes("Dairy")) {
      return DairyEggsImage;
    } else if (itemName.includes("Frozen")) {
      return FrozenImage;
    } else if (itemName.includes("Beverages")) {
      return BeveragesImage;
    } else if (itemName.includes("Household")) {
      return HouseholdImage;
    } else if (itemName.includes("Pets")) {
      return PetsImage;
    } else if (itemName.includes("Health")) {
      return HealthyImage;
    } else if (itemName.includes("Outdoor")) {
      return HomeOutdoorImage;
    } else if (itemName.includes("Baby Care")) {
      return BabyCareImage;
    } else if (itemName.includes("Mi Querencia")) {
      return MiquerenciaImage;
    } else if (itemName.includes("Bazaar")) {
      return BazaarIstanbulImage;
    } else if (itemName.includes("Ready")) {
      return ReadyToEatImage;
    } else if (itemName.includes("International")) {
      return InternationalImage;
    } else if (itemName.includes("Wine")) {
      return WineImage;
    }
  };
  render() {
    const catOptions = {
      items: 5,
      dots: false,
      autoWidth: true,
      autoplayTimeout: 2500,
      rewind: true,
      autoplay: false,
      nav: true,
      startPosition: 1,
      slideBy: 4,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
      },
    };
    const itemsOption = {
      items: 4,
      dots: false,
      nav: true,
      autoplayTimeout: 2500,
      rewind: true,
      autoWidth: true,
      autoplay: false,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 4,
        },
      },
    };
    return (
      <>
        {this.state.processing === true && <LoadingModal text="Loading" />}
        {this.state.processing !== true && (
          <div className={"home"}>
            <div className={"home__postsSection mt-0 bgColored"}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-xs-12">
                    <div className="home__postsSection__postsTitle">
                      All the essentials,
                      <br />
                      one step away from your door
                    </div>
                    <div className="home__postsSection__postsSubTitle">
                      Order online or make an appointment for a private, secure,
                      front door shopping experience
                    </div>
                    <div className="home__postsSection__discoverBtnPrimary">
                      <Link to="/Departments">
                        <Button
                          type={"secondary"}
                          sizeName={"default"}
                          text={"Shop Now"}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xs-12">
                    <div className="homeImageWrapper">
                      <img
                        src={karefoto}
                        alt={karefoto}
                        className={"sectionMainImg"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={"home__postsSection"}>
              <div className="container">
                <div className="row d-flex align=items-center justify-content-center ">
                  <div className="col-6 home__postsSection__sectionTitle text-left textCenter">
                    Browse our hottest categories
                  </div>
                  <div className="col-6 home__postsSection__sectionTitle text-right responsiveRightSpaceSide"></div>
                </div>
                <div className="row p-4">
                  <OwlCarousel ref="categories" options={catOptions}>
                    {this.state.mainCategories !== null &&
                      this.state.mainCategories.map((item, index) => (
                        <>
                          <div className="categoryBoxesHomeWrapper">
                            <div
                              className="categoryBoxesHome"
                              onClick={() => {
                                window.location.href = `/Departments/${item.id}`;
                              }}
                            >
                              <div className="categoryBoxesBackground">
                                <div className="categoryBoxesHomeImageWrapper">
                                  <img
                                    alt=""
                                    // `https://3.80.123.181${item.image}`
                                    src={
                                      item.image && item.image !== ""
                                        ? `https://3.80.123.181${item.image}`
                                        : this.getItemImageSources({
                                            itemName: item.name,
                                          })
                                    }
                                    className="home__postsSection__categoryBoxes__imageBox__image"
                                  />
                                </div>
                              </div>
                              <div
                                style={{ marginTop: 100, padding: 10 }}
                                className="home__postsSection__categoryBoxes__titleBox"
                              >
                                <Link
                                  to={`/Departments/${item.id}`}
                                  className="home__postsSection__sectionLink__link"
                                >
                                  <span className="home__postsSection__categoryBoxes__titleBox__title">
                                    {item.name.length > 14
                                      ? `${item.name.slice(0, 14)}...`
                                      : item.name}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
            <div className={"home__postsSection"}>
              <div className="container">
                <div className="row responsivePadding">
                  <div className="col-6 home__postsSection__sectionTitle text-left">
                    Recommended Items
                  </div>
                  <div className="col-6 home__postsSection__sectionLink text-right">
                    <Link
                      to="/Departments"
                      className="home__postsSection__sectionLink__link"
                    >
                      View More <img src={viewMore} alt={viewMore} />
                    </Link>
                  </div>
                </div>
                <div className="row p-4">
                  <OwlCarousel ref="items" options={itemsOption}>
                    {this.state.recommended !== null &&
                      this.state.recommended.map((item, index) => (
                        <>
                          <div className="RecommendedItemsBoxWrapper">
                            <div className="RecommendedItemsBox">
                              <div className="RecommendedItemsBoxBasket">
                                <div
                                  className="RecommendedItemsBoxBasketTrash"
                                  onClick={(e) => {
                                    this.removeItem(item);
                                  }}
                                >
                                  <img src={trash} alt={trash} />
                                </div>
                                <div className="RecommendedItemsBoxBasketCount">
                                  {this.getItemCount(item)}
                                </div>
                                <div
                                  className="RecommendedItemsBoxBasketAddNew"
                                  onClick={(e) => {
                                    this.setItem(item);
                                  }}
                                >
                                  +
                                </div>
                              </div>
                              <div className="RecommendedItemsBoxBasketAddNewImageBox">
                                <div
                                  style={{
                                    backgroundImage: `url(${`https://3.80.123.181${item?.item_image[0]?.path}`})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                  // src={`http://3.80.123.181${item.item_image[0].path}`}
                                  className="RecommendedItemsBoxBasketAddNewImageBoxImage"
                                />
                              </div>
                              <div className="RecommendedItemsBoxBasketTitleBox">
                                <span className="home__postsSection__categoryBoxes__itemTitleBox__title">
                                  {" "}
                                  <Link to={`/ProductDetail/${item.id}`}>
                                    {item.name}
                                  </Link>{" "}
                                </span>
                              </div>
                              <div className="RecommendedItemsBoxBasketAddNewPriceBox">
                                {" "}
                                $ {item.price}{" "}
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  }
}

export default Home;
