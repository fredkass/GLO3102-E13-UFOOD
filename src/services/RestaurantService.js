import Api from "./api.js";

export default class RestaurantService {
  constructor() {
    this.api = new Api();
  }
  getRestaurants(
    page,
    searchTerms = "",
    limit = "",
    genres = "",
    price_range = ""
  ) {
    let querystrings = new URLSearchParams({
      page: page
    });

    searchTerms && querystrings.append("q", searchTerms);
    limit && querystrings.append("limit", limit);
    (genres.length > 0) && querystrings.append("genres", genres);
    (price_range.length > 0) && querystrings.append("price_range", price_range);

    return this.api.get("/restaurants?" + querystrings);
  }
  getRestaurant(id) {
    return this.api.get("/restaurants/" + id);
  }
}
