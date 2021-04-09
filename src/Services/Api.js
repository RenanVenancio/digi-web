import axios from "axios";

const baseURL = "http://localhost:8080";

const Api = axios.create({
  baseURL,
});

const token = JSON.parse(
  window.localStorage.getItem("@digi-app/autheticatedUser/")
);

if (token !== null) {
  Api.interceptors.request.use(function (config) {
    config.headers.Authorization =  token;
    return config;
  });
}


export { Api, baseURL };
