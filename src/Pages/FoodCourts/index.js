import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import LoadingModal from "../../Components/LoadingModal";
import shoppingCartIcon from "../../icons/shopping-cart-icon.svg";
import store from "../../store";
import { getCookie } from "../../utils/cookie";

import styles from "./foodCourts.scss";

class FoodCourts extends Component {
  state = {
    items: null,
    mainCategories: null,
    processing: true,
    subCategories: null,
    selectedCategory: null,
    selectedCategoryName: null,
  };
  async componentDidMount() {
    await this.getFoodCourts();
    window.scrollTo(0, 0);
  }
  getFoodCourts = async () => {
    this.setState({ processing: true });
    let res = await store.getFoodCourts(getCookie("slug"));
    if (res) {
      this.setState({
        items: res.data.items,
        processing: false,
      });
    }
  };
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
                <div className="col-12">
                  <div className={"home__postsSection"}>
                    <div className="container">
                      <div className="row">
                        <div className="col-6 home__postsSection__sectionTitle text-left">
                          {this.state.selectedCategoryName}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {this.state.items !== null &&
                        this.state.items.map((item, index) => {
                          console.log(item);
                          return (
                            <>
                              <div className="col-lg-4 col-md-6 col-xs-12">
                                <div className="foodCourts__postsSection__categoryBoxes">
                                  <div className="foodCourts__postsSection__categoryBoxes__basket">
                                    <Link to={`/FoodCourt/${item.id}`}>
                                      <div className="foodCourts__postsSection__categoryBoxes__basket__addNew float-right">
                                        <img
                                          src={shoppingCartIcon}
                                          alt={shoppingCartIcon}
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="foodCourts__postsSection__categoryBoxes__itemImageBox">
                                    <img
                                      src={`https://3.80.123.181${item.item_image[0].path}`}
                                      alt={item.name}
                                      className="foodCourts__postsSection__categoryBoxes__itemImageBox__image"
                                    />
                                  </div>
                                  <div className="foodCourts__postsSection__categoryBoxes__itemTitleBox">
                                    <span className="foodCourts__postsSection__categoryBoxes__itemTitleBox__title">
                                      {" "}
                                      <Link to={`/FoodCourt/${item.id}`}>
                                        {item.name}
                                      </Link>{" "}
                                    </span>
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

export default FoodCourts;
