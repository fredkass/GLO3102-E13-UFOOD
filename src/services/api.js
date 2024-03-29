export default class Api {
  constructor(token) {
    this.baseURL = "https://ufoodapi.herokuapp.com";
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    //if (token != undefined) {
    this.headers.append("Authorization", token);
    //}
  }

  async put(route, body) {
    try {
      const response = await fetch(this.baseURL + route, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      console.error("Problem in put request.");
      console.error(error);
    }
  }
  async post(route, body) {
    try {
      const response = await fetch(this.baseURL + route, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      console.error("Problem in post request.");
      console.error(error);
      return error;
    }
  }

  async get(route) {
    try {
      const response = await fetch(this.baseURL + route, {
        headers: this.headers
      });
      return response;
    } catch (error) {
      console.error("Problem in get request.");
      console.error(error);
    }
  }

  // quickly written, not sure it works yet -> test before pushing
  async delete(route) {
    try {
      const response = await fetch(this.baseURL + route, {
        method: "DELETE",
        headers: this.headers
      });
      return response;
    } catch (error) {
      console.error("problem in delete request.");
      console.error(error);
    }
  }
}
