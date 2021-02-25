import axios from "axios";

const baseURL = "http://localhost:8080";

const Api = axios.create({
  baseURL,
});

const token = JSON.parse(
  window.localStorage.getItem("@digi-app/autheticatedUserToken/")
);

if (token !== null) {
  console.log('TEM TOKEN')
  Api.interceptors.request.use(function (config) {
    config.headers.Authorization =  token;
    return config;
  });
}


export { Api, baseURL };
