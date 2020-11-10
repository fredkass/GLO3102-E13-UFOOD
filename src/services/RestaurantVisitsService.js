import Api from "./api.js";

export default class RestaurantVisistsService {
  constructor() {
    this.api = new Api();
  }
  getAllRestaurantsVisits(userId) {
    return this.api.get("/users/" + userId + "/restaurants/visits");
  }
  getRestaurantVisit(visitId, userId) {
    return this.api.get("/users/" + userId + "/restaurants/visits/" + visitId);
  }
  createRestaurantVisit(body, userId) {
    return this.api.post("/users/" + userId + "/restaurants/visits/", body);
  }
}
