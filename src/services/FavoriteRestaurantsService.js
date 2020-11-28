import Api from "./api.js";
import ToastService from "./ToastDisplayService.js";

export default class FavoriteRestaurantsService {
  constructor() {
    this.api = new Api();
    this.toast = new ToastService();
  }
  // optional : ?limit, ?page
  // returns all lists by all users
  async getFavorites() {
    const response = await this.api.get("/favorites/");
    return await response.json();
  }
  // returns list with provided Id
  async getFavoriteListById(favoriteListId) {
    const response = await this.api.get("/favorites/" + favoriteListId);
    return await response.json();
  }
  // body requires owner value if no token is used
  // creates favorite list
  async createFavoriteList(name, owner) {
    let body = {
      name: name,
      owner: owner
    };
    const response = await this.api.post("/favorites/", body);
    if (!response.ok) {
      this.toast.fail("Error creating list, please try again");
    } else {
      this.toast.success("List created successfully");
    }
    return await response.json();
  }
  // updates favorite list with provided Id
  async updateFavoriteList(favoriteListId, name, owner) {
    let body = {
      name: name,
      owner: owner
    };
    const response = await this.api.put("/favorites/" + favoriteListId, body);
    if (!response.ok) {
      this.toast.fail("Error updating name, please try again");
    } else {
      this.toast.success("List updated successfully");
    }

    return await response.json();
  }
  // deletes favorite list with provided Id
  async deleteFavoriteList(favoriteListId) {
    const response = await this.api.delete("/favorites/" + favoriteListId);
    if (!response.ok) {
      this.toast.fail("Error deleting list, please try again");
    } else {
      this.toast.success("List removed successfully");
    }
    return await response.json();
  }
  // add restaurant to list with provided Id
  async addRestaurantToList(favoriteListId, restaurantId) {
    let body = {
      id: restaurantId
    };

    const response = await this.api.post(
      "/favorites/" + favoriteListId + "/restaurants",
      body
    );

    return await response.json();
  }
  // delete restaurant with given Id from list with given Id
  async deleteRestaurantFromList(favoriteListId, restaurantId) {
    const response = await this.api.delete(
      "/favorites/" + favoriteListId + "/restaurants/" + restaurantId
    );
    console.log(response);
    if (!response.ok) {
      this.toast.fail("Error deleting restaurant from list, please try again");
    } else {
      this.toast.success("Restaurant removed from list successfully");
    }
    return await response.json();
  }
}
