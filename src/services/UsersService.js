import Api from "./api.js";

export default class UsersService {
  constructor() {
    this.api = new Api();
  }
  // optional : ?limit, ?page, ?q=name
  // returns all users
  getUsers() {
    return this.api.get("/users/");
  }
  // returns user with provided Id
  getUserById(userId) {
    return this.api.get("/users/" + userId);
  }
  // optional : ?limit, ?page
  // gets favorites lists of user with provided Id list
  getFavoritesListsByUserId(userId) {
    return this.api.get("/users/" + userId + "/favorites");
  }
  // follow user with provided Id (in body for some reason)
  followUser(body) {
    return this.api.post("/follow/", body);
  }
  // deletes favorite list with provided Id
  unFollowUser(userId) {
    return this.api.delete("/follow/" + userId);
  }
  signUp(body) {
    return this.api.post("/signup/", body);
  }
  logIn(body) {
    return this.api.post("/login/", body);
  }
  logOut() {
    return this.api.post("/logout/");
  }
}
