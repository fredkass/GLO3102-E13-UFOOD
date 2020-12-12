import md5 from "md5";

export default class GravatarService {
  constructor(email) {
    this.email = email;
    this.hash = md5(email.trim());
    this.baseURL = "https://www.gravatar.com/avatar/";
  }
  getAvatarURL(size) {
    return this.baseURL + this.hash + "?s=" + size;
  }
}
