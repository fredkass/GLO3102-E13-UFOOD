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
      const data = await response.json();
      return data;
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Problem in post request.");
      console.error(error);
    }
  }

  async get(route) {
    try {
      const response = await fetch(this.baseURL + route);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Problem in get request.");
      console.error(error);
    }
  }
}
