import http from "../http-common.js";

class AuthDataService {
  currentuser() {
    return http.get("/users/currentuser");
  }

  signin(data) {
    return http.post(`/users/signin`, data);
  }

  signout() {
    return http.post("/users/signout");
  }

  signup(data) {
    return http.post(`/users/signup`, data);
  }
}

export default new AuthDataService();
