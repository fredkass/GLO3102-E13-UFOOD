import Api from "./api.js";

export default class RestaurantService {
  constructor() {
    this.api = new Api();
  }
  getRestaurants(page, searchTerms = "", limit = "") {
    return this.api.get(
      "/restaurants?" +
        new URLSearchParams({
          page: page,
          q: searchTerms,
          limit:limit
        })
    );
  }
  getSingleRestaurant(id) {
    return this.api.get("/restaurant/" + id);
  }
}
