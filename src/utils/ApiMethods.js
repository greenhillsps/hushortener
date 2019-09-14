import LocalStorageIO from "./LocalStorageIO";
import axios from "axios";
import axrequest from "./axiosrequest";
import api from "./greenHillsApi";

export const auth = {
  login(email, password) {
    if (auth.loggedIn()) {
      return Promise.resolve(true);
    }

    return axrequest
      .post(api.login, {
        email,
        password
      })
      .then(response => {
        //store user details in local storage
        console.log("response data", response.data);
        localStorage.token = response.data.token;
        axios.defaults.headers.common[
          "Authorization"
        ] = LocalStorageIO.getToken();
        localStorage.user = JSON.stringify(response.data);
        return Promise.resolve(true);
      });
  },

  loggedIn() {
    return !!localStorage.token;
  },

  logout(history) {
    localStorage.clear();
    history.push("/page/login");
  }
};

export const PostRequest={
 registerUser(data) {
    return axrequest.post(api.register(), data);
  },
shortenLink(data) {
    return axrequest.post(api.shortenLink(), data);
  },
}
export const GetRequest = {
  getAllUrls(params) {
    return axrequest.get(api.getAllUrls(params),);
  },
  getUrlDetails(id) {
    return axrequest.get(api.getUrlDetails(id),);
  },
  getUser() {
    return axrequest.get(api.getUser());
  },
};

export const PutRequest = {
  deleteUrls(id) {
    return axrequest.put(api.deleteUrls(id),);
  },
  updateFeature(id,data) {
    return axrequest.put(api.updateFeature(id),data);
  },
  BuyFeature(id,data) {
    return axrequest.put(api.BuyFeature(id),data);
  },
};


