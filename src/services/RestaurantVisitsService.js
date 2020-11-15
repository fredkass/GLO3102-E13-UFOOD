import Api from "./api.js";

export default class RestaurantVisitsService {
  constructor(userId) {
    this.api = new Api();
    this.userId = userId;
  }
  getAllRestaurantsVisits(page) {
    let querystrings = new URLSearchParams({
      page: page
    });
    return this.api.get(
      "/users/" + this.userId + "/restaurants/visits?" + querystrings
    );
  }
  getRestaurantVisit(visitId) {
    return this.api.get(
      "/users/" + this.userId + "/restaurants/visits/" + visitId
    );
  }
  createRestaurantVisit(restaurantId, comment, rating, date) {
    let body = {
      restaurant_id: restaurantId,
      comment: comment,
      rating: rating,
      date: date
    };

    return this.api.post(
      "/users/" + this.userId + "/restaurants/visits/",
      body
    );
  }
}
