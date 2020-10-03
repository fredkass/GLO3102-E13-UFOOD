import Api from "./api.js";

export default class RestaurantService {
  constructor() {
    this.api = new Api();
  }
  getRestaurants() {
    return this.api.get("/restaurants");
  }
  getSingleRestaurant(id) {
    return this.api.get("/restaurant/" + id);
  }
}
