import Api from "./api.js";

export default class RestaurantVisitsService {
  constructor(userId) {
    this.api = new Api();
    this.userId = userId;
  }
  async getAllRestaurantsVisits(page) {
    let querystrings = new URLSearchParams({
      page: page
    });
    const response = await this.api.get(
      "/users/" + this.userId + "/restaurants/visits?" + querystrings
    );
    return await response.json();
  }
  async getRestaurantVisit(visitId) {
    const response = await this.api.get(
      "/users/" + this.userId + "/restaurants/visits/" + visitId
    );
    return await response.json();
  }
  async createRestaurantVisit(restaurantId, comment, rating, date) {
    let body = {
      restaurant_id: restaurantId,
      comment: comment,
      rating: rating,
      date: date
    };

    const response = await this.api.post(
      "/users/" + this.userId + "/restaurants/visits/",
      body
    );
    
    return await response.json();
  }
}
