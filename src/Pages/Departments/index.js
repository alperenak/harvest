import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import trash from "../../icons/trash.svg";
import elma from "../../assets/elma.jpg";
import downArrow from "../../icons/down-arrow3.svg";
import LoadingModal from "../../Components/LoadingModal";
import store from "../../store";
import { getCookie } from "../../utils/cookie";

import "./departments.scss";

class Departments extends Component {
  state = {
    items: null,
    mainCategories: [],
    processing: true,
    subCategories: null,
    selectedCategory: null,
    selectedCategoryName: null,
  };
  async componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      this.handleClick("", this.props.match.params.id, false);
    } else {
      console.log(this.props.match.params.query);
      await this.getItems();
    }
    window.scrollTo(0, 0);
  }
  async handleClick(event, id, sub) {
    this.setState({ processing: true });
    if (getCookie("slug") !== null) {
      let payload = {};
      var res = await store.getRestaurantFoodItems(
        payload,
        getCookie("slug") ? getCookie("slug") : 1
      );
    } else {
      // var res = await store.getFoodItems();
    }
    if (res) {
      if (this.state.selectedCategory === null) {
        var q = "";
        if (this.props.match.params.query) {
          q = this.props.match.params.query;
        }
        if (q == "?") {
          q = "";
        }
        var myObject = {
          q,
          page: 1,
          category: id,
        };
      } else {
        var q = "";
        if (this.props.match.params.query) {
          q = this.props.match.params.query;
        }
        if (q == "?") {
          q = "";
        }
        var myObject = {
          q,
          page: 1,
          category: id,
        };
      }
      this.setState({
        mainCategories: res.data.mainCategories,
      });
      let res2 = await store.getFoodItemsW(
        myObject,
        getCookie("slug") ? getCookie("slug") : 1
      );
      let payload = {
        q,
        restaurant_id: getCookie("slug"),
        isVintage: false,
      };
      await store.getFoodItemsSearch(payload).then((data) => {
        console.log(data);
      });
      if (res2) {
        if (sub === false) {
          this.setState({
            selectedCategory: res2.data.activeCategory.id,
            subCategories: res2.data.subCategories,
          });
        }
        this.setState({
          selectedCategoryName: res2.data.activeCategory.name,
          items: res2.data.items,
          processing: false,
        });
      }
    }
  }
  getItems = async () => {
    this.setState({ processing: true });
    var payload = {};
    let res = await store.getRestaurantFoodItems(payload, getCookie("slug"));
    if (res) {
      if (this.state.selectedCategory === null) {
        var q = "";
        if (this.props.match.params.query) {
          q = this.props.match.params.query;
        }
        if (q == "?") {
          q = "";
        }
        var myObject = {
          q,
          page: 1,
          category: -1,
        };
      } else {
        var q = "";
        if (this.props.match.params.query) {
          q = this.props.match.params.query;
        }
        if (q == "?") {
          q = "";
        }
        var myObject = {
          q,
          page: 1,
        };
      }
      this.setState({
        mainCategories: res.data.mainCategories,
      });
      let res2 = await store.getFoodItemsW(myObject, getCookie("slug"));
      if (res2) {
        this.setState({
          items: res2.data.items,
          processing: false,
          selectedCategoryName: res.data.mainCategories[0].name,
          selectedCategory: res.data.mainCategories[0].id,
          subCategories: res2.data.subCategories,
        });
      }
    }
  };
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
        myObject.image = item.item_image[0].path;
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
      myObject.image = item.item_image[0].path;
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
            <div className="container">
              <div className={"row"}>
                <div className="col-md-3 col-lg-3 col-xs-12">
                  <div className={"home__postsSection"}>
                    <div className="container">
                      <div className="row">
                        <div className="col-12 home__postsSection__sectionTitle text-left oranged">
                          Categories
                        </div>
                        {this.state.mainCategories !== null &&
                          this.state.mainCategories.map((item, index) => (
                            <>
                              <div className="col-12 home__postsSection__sectionSubTitle text-left ">
                                <Link
                                  to="#"
                                  onClick={(e) => {
                                    this.handleClick(e, item.id, false);
                                  }}
                                  className="blacked"
                                >
                                  {item.name}
                                </Link>
                                {this.state.selectedCategory == item.id && (
                                  <img
                                    onClick={(e) => {
                                      this.handleClick(e, item.id, false);
                                    }}
                                    src={downArrow}
                                    alt={downArrow}
                                    className="home__postsSection__sectionSubTitle__icon text-right "
                                  />
                                )}
                                {this.state.selectedCategory != item.id && (
                                  <img
                                    onClick={(e) => {
                                      this.handleClick(e, item.id, false);
                                    }}
                                    src={downArrow}
                                    alt={downArrow}
                                    className="home__postsSection__sectionSubTitle__icon text-right up"
                                  />
                                )}
                                {this.state.selectedCategory == item.id && (
                                  <ul id={item.id} className="show">
                                    {this.state.subCategories !== null &&
                                      this.state.subCategories.map(
                                        (item2, index2) => (
                                          <li>
                                            <a
                                              href="javascript:;"
                                              onClick={(e) => {
                                                this.handleClick(
                                                  e,
                                                  item2.id,
                                                  true
                                                );
                                              }}
                                            >
                                              {item2.name}
                                            </a>
                                          </li>
                                        )
                                      )}
                                  </ul>
                                )}
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 col-lg-9 col-xs-12">
                  <div className={"home__postsSection"}>
                    <div className="container">
                      <div className="row">
                        <div className="col-6 home__postsSection__sectionTitle text-left">
                          {this.state.selectedCategoryName}
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex align-items-center justify-content-center">
                      {this.state.items !== null &&
                        this.state.items.map((item, index) => {
                          console.log(item);
                          return (
                            <>
                              <div className="DepartmentsItemsBoxWrapper">
                                <div className="DepartmentsItemsBox">
                                  <div className="DepartmentsItemsBoxBasket">
                                    <div
                                      className="DepartmentsItemsBoxBasketTrash"
                                      onClick={(e) => {
                                        this.removeItem(item);
                                      }}
                                    >
                                      <img src={trash} alt={trash} />
                                    </div>
                                    <div className="DepartmentsItemsBoxBasketCount">
                                      {this.getItemCount(item)}
                                    </div>
                                    <div
                                      className="DepartmentsItemsBoxBasketAddNew"
                                      onClick={(e) => {
                                        this.setItem(item);
                                      }}
                                    >
                                      +
                                    </div>
                                  </div>
                                  <div className="DepartmentsItemsBoxBasketAddNewImageBox">
                                    <div
                                      style={{
                                        backgroundImage: `url(${`http://3.80.123.181/${item.item_image[0].path}`})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                      }}
                                      // src={`http://3.80.123.181${item.item_image[0].path}`}
                                      className="DepartmentsItemsBoxBasketAddNewImageBoxImage"
                                    />
                                  </div>
                                  <div className="DepartmentsItemsBoxBasketTitleBox">
                                    <span className="home__postsSection__categoryBoxes__itemTitleBox__title">
                                      {" "}
                                      <Link to={`/ProductDetail/${item.id}`}>
                                        {item.name}
                                      </Link>{" "}
                                    </span>
                                  </div>
                                  <div className="DepartmentsItemsBoxBasketAddNewPriceBox">
                                    {" "}
                                    $ {item.price}{" "}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
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

export default Departments;
