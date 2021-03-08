import http from "../utils/httpHelper";
import config from "./appConfig";
import { getCookie } from "../utils/cookie";

const errorMessageBuilder = (response) => {
  return (response.errorData && response.errorData.code) || "0";
};

let store = {
  async login(objData) {
    let baseUrl = config.baseUrl;
    let tokenCookieName = "token";
    let path = `/login`;
    let payload = objData;
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async register(objData) {
    let baseUrl = config.baseUrl;
    let tokenCookieName = "token";
    let path = `/register`;
    let payload = objData;
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async createAddress(objData) {
    let baseUrl = config.baseUrl;
    let tokenCookieName = "token";
    let path = `/save-address`;
    let payload = objData;
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getFoodItems() {
    let baseUrl = config.baseUrl;
    let path = `/get-restaurant-items/dsadsa-oibXRr32h7VUYXJ`;
    let tokenCookieName = "token";
    let payload = {};
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getRestaurant(payload) {
    let baseUrl = config.baseUrl;
    var marketType = localStorage.getItem("marketType");
    if (!marketType || marketType == "harvest-market")
      var path = `/get-harvestmarket`;
    else var path = `/get-harvestmarket`;
    let tokenCookieName = "token";
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getFoodCourts(slug) {
    let baseUrl = config.baseUrl;
    let path = `/get-restaurant-food-courts/` + slug;
    let tokenCookieName = "token";
    let payload = {};
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async placeOrder(orderObject) {
    let baseUrl = config.baseUrl;
    let path = `/place-order`;
    let tokenCookieName = "token";
    let payload = orderObject;
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getSingleItem(id) {
    let baseUrl = config.baseUrl;
    let path = `/get-single-item`;
    let tokenCookieName = "token";
    let payload = {
      id,
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getRestaurantFoodItems(payload, slug) {
    let baseUrl = config.baseUrl;
    let path = `/get-restaurant-items/` + slug;
    let tokenCookieName = "token";
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getFoodItemsW(payload, slug) {
    let baseUrl = config.baseUrl;
    let path = `/get-restaurant-items/` + slug;
    let tokenCookieName = "token";
    return await http.makeGetRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getOrders() {
    let baseUrl = config.baseUrl;
    let path = `/get-orders`;
    let tokenCookieName = "token";
    let payload = {
      user_id: getCookie("user_id"),
      token: getCookie("token"),
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getCards() {
    let baseUrl = config.baseUrl;
    let path = `/payment/getCards`;
    let tokenCookieName = "token";
    let payload = {
      user_id: getCookie("user_id"),
      token: getCookie("token"),
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getCoupons() {
    let baseUrl = config.baseUrl;
    let path = `/user/getCoupons`;
    let tokenCookieName = "token";
    let payload = {
      user_id: getCookie("user_id"),
      token: getCookie("token"),
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async updateUser(payload) {
    let baseUrl = config.baseUrl;
    let path = `/user/updateUserInfo`;
    let tokenCookieName = "token";
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async changePass(payload) {
    let baseUrl = config.baseUrl;
    let path = `/user/changePass`;
    let tokenCookieName = "token";
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async deleteAddress(id) {
    let baseUrl = config.baseUrl;
    let path = `/delete-address`;
    let tokenCookieName = "token";
    let payload = {
      address_id: id,
      user_id: getCookie("user_id"),
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async deleteCard(id) {
    let baseUrl = config.baseUrl;
    let path = `/payment/deleteCard`;
    let tokenCookieName = "token";
    let payload = {
      card_id: id,
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getUser() {
    let baseUrl = config.baseUrl;
    let path = `/user/getUser`;
    let tokenCookieName = "token";
    let payload = {
      user_id: getCookie("user_id"),
      token: getCookie("token"),
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
  async getCoupons() {
    let baseUrl = config.baseUrl;
    let path = `/user/getCoupons`;
    let tokenCookieName = "token";
    let payload = {
      user_id: getCookie("user_id"),
      token: getCookie("token"),
    };
    return await http.makePostRequest(
      path,
      baseUrl,
      tokenCookieName,
      payload,
      errorMessageBuilder
    );
  },
};

export default store;
