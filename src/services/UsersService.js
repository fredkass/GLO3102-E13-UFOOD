import Api from "./api.js";
import Vue from "vue";

export default class UsersService {
  constructor() {
    this.api = new Api();
    this.token = this.getTokenCookie();
  }
  // optional : ?limit, ?page, ?q=name
  // returns all users
  async getUsers() {
    const response = await this.api.get("/users/");
    return await response.json();
  }
  // returns user with provided Id
  async getUserById(userId) {
    const response = await this.api.get("/users/" + userId);
    return await response.json();
  }
  // optional : ?limit, ?page
  // gets favorites lists of user with provided Id list
  async getFavoritesListsByUserId(userId) {
    const response = await this.api.get("/users/" + userId + "/favorites");
    return await response.json();
  }
  // follow user with provided Id (in body for some reason)
  async followUser(body) {
    const response = await this.api.post("/follow/", body);
    return await response.json();
  }
  // deletes favorite list with provided Id
  async unFollowUser(userId) {
    const response = await this.api.delete("/follow/" + userId);
    return await response.json();
  }
  async signUp(body) {
    const response = await this.api.post("/signup/", body);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Username already exists");
    }
  }
  async signUpAndLogin(body) {
    const responseSignUp = await this.signUp(body);
    const { email, password } = body;
    if (!(responseSignUp instanceof Error)) {
      const user = await this.logIn({ email, password });
      return user;
    } else {
      return responseSignUp;
    }
  }
  async logIn(body) {
    const response = await this.api.post("/login/", body);
    const data = await response.json();
    console.log(data);
    this.setTokenCookie(data);
    return data;
  }
  async logOut() {
    const response = await this.api.post("/logout/");
    return await response.json();
  }

  setTokenCookie(response) {
    Vue.$cookies.set("token", response.token);
  }

  getTokenCookie() {
    return Vue.$cookies.get("token");
  }
}
