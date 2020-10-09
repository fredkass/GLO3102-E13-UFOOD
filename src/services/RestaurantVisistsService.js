import Api from "./api.js";

export default class RestaurantVisistsService {
  constructor(userId) {
    this.api = new Api();
    this.userId = userId;
  }
  getAllRestaurantsVisits() {
    return this.api.get("/users/" + this.userId + "/restaurants/visits");
  }
  getRestaurantVisit(visitId) {
    return this.api.get(
      "/users/" + this.userId + "/restaurants/visits/" + visitId
    );
  }
  createRestaurantVisit(body) {
    return this.api.post(
      "/users/" + this.userId + "/restaurants/visits/",
      body
    );
  }
}
