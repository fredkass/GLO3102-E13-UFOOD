import Api from "./api.js";
import Vue from "vue";
import ToastService from "./ToastDisplayService.js";

export default class UsersService {
  constructor(token) {
    this.api = new Api(token);
    this.token = this.getTokenCookie();
    this.toast = new ToastService();
  }
  // optional : ?limit, ?page, ?q=name
  // returns all users
  async getUsers(page) {
    let querystrings = new URLSearchParams();
    page && querystrings.append("page", page);
    console.log(page);
    const response = await this.api.get("/users?"+ querystrings);
    return await response.json();
  }
  // returns users which names contain "terms"
  async search(terms, page) {
    let querystrings = new URLSearchParams();
    page && querystrings.append("page", page);
    querystrings.append('q', terms);
    const response = await this.api.get("/users?" + querystrings);
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
      this.toast.fail("Username already exists");
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
    if(!response.ok){
      return new Error("Invalid credentials");      
    }
    const data = await response.json();
    this.setTokenCookie(data);
    return data;
  }
  async logOut() {
    const response = await this.api.post("/logout");
    return response.ok;
  }

  async getUserFromToken() {
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
