import Api from "./api.js";

export default class RestaurantService {
  constructor(token) {
    this.api = new Api(token);
  }
  async getRestaurants(
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
    genres.length > 0 && querystrings.append("genres", genres);
    price_range.length > 0 && querystrings.append("price_range", price_range);

    const response = await this.api.get("/restaurants?" + querystrings);    
    return await response.json();
  }
  async getRestaurant(id) {
    const response = await this.api.get("/restaurants/" + id);    
    return await response.json();
  }
}
