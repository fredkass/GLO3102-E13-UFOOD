export default class Api {
  constructor() {
    this.baseURL = "https://ufoodapi.herokuapp.com/unsecure";
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
      if (!response.ok) {
        return Error("Problem in post request");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Problem in post request.");
      console.error(error);
      return error;
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

  // quickly written, not sure it works yet -> test before pushing
  async delete(route) {
    try {
      const response = await fetch(this.baseURL + route, {
        method: "DELETE"
      });
      const data = await response.json();
      return data; // should contain confirmation of deletion message
    } catch (error) {
      console.error("problem in delete request.");
      console.error(error);
    }
  }
}
