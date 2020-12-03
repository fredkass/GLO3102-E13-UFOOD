export default class Api {
  constructor() {
    this.baseURL = "https://ufoodapi.herokuapp.com";
  }

  async put(route, body) {
    try {
      const response = await fetch(this.baseURL + route, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
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
        headers: {
          "Content-Type": "application/json"
        },
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
      const response = await fetch(this.baseURL + route);
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
        method: "DELETE"
      });
      return response;
    } catch (error) {
      console.error("problem in delete request.");
      console.error(error);
    }
  }
}
