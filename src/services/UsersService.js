import Api from "./api.js";
import Vue from "vue";

export default class UsersService {
  constructor(token) {
    this.api = new Api(token);
    this.token = this.getTokenCookie();
  }
  // optional : ?limit, ?page, ?q=name
  // returns all users
  async getUsers() {
    const response = await this.api.get("/users/");
    return await response.json();
  }
  // returns users which names contain "terms"
  async search(terms) {
    const response = await this.api.get("/users?q=" + terms);
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
  // follow user with provided Id
  async followUser(userId) {
    let body = {
      id: userId
    };
    const response = await this.api.post("/follow/", body);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Unable to follow user");
    }
  }
  async unfollowUser(userId) {
    const response = await this.api.delete("/follow/" + userId);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Unable to unfollow user");
    }
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
    const response = await this.api.post("/login", body);
    const data = await response.json();
    
    this.setTokenCookie(data);
    return data;
  }
  async logOut() {
    const response = await this.api.post("/logout");
    return response.ok;
  }

  async getUserFromToken(){    
    const response = await this.api.get("/tokeninfo");
    return response;
  }
  setTokenCookie(response) {
    Vue.$cookies.set("token", response.token);
  }

  getTokenCookie() {
    return Vue.$cookies.get("token");
  }

}
