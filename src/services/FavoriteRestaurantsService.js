import Api from "./api.js";

export default class FavoriteRestaurantsService {
  constructor() {
    this.api = new Api();
  }
  // optional : ?limit, ?page
  // returns all lists by all users
  getFavorites() {
    return this.api.get("/favorites/");
  }
  // returns list with provided Id
  getFavoriteListById(favoriteListId) {
    return this.api.get("/favorites/" + favoriteListId);
  }
  // body requires owner value if no token is used
  // creates favorite list
  createFavoriteList(name, owner) {
    let body = {
      name: name,
      owner: owner
    }
    return this.api.post("/favorites/", body);
  }
  // updates favorite list with provided Id
  updateFavoriteList(favoriteListId, name, owner) {
    let body = {
      name: name,
      owner: owner
    }
    return this.api.put("/favorites/" + favoriteListId, body);
  }
  // deletes favorite list with provided Id
  deleteFavoriteList(favoriteListId) {
    return this.api.delete("/favorites/" + favoriteListId);
  }
  // add restaurant to list with provided Id  
  addRestaurantToList(favoriteListId, restaurantId) {
    let body = {
      id: restaurantId
    };

    return this.api.post("/favorites/" + favoriteListId + "/restaurants", body);
  }
  // delete restaurant with given Id from list with given Id
  deleteRestaurantFromList(favoriteListId, restaurantId) {
    return this.api.delete(
      "/favorites/" + favoriteListId + "/restaurants/" + restaurantId
    );
  }
}