import axios from "axios";

var token;

// Deafult configuration of axios
function user_data() {
  try {
    const data = JSON.parse(localStorage.getItem("user"));

    return data;
  } catch {
    console.log("You are not LogIn");
    return null;
  }
}
function user_token() {
  try {
    const data = JSON.parse(localStorage.getItem("user"));

    return data.token;
  } catch {
    console.log("You are not LogIn");
    return null;
  }
}
let user_detail = user_data();

const myApi = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API || "http://",
  // baseURL: process.env.NEXT_PUBLIC_API || "http://127.0.0.1:8000",
  baseURL: "https://b2bcabsapi.herokuapp.com",
  headers: {
    Authorization: `Token ${user_detail?.token}`,
    // org: user_detail?.org_id ? user_detail?.org_id : 0,
    "content-type": "application/json",
  },
});

myApi.interceptors.request.use(
  (config) => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));

      config.headers.Authorization = `Token ${user_token()}`;
      return config;
    } catch {
      console.log("You are not Log In");
      return null;
    }
  },
  (error) => Promise.reject(error),
  (config) => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));

      config.headers.Authorization = `Token ${user_token()}`;
      // config.headers.org = data?.org_id ? data?.org_id : 0;
      return config;
    } catch {
      console.log("You are not LogIn");
      return null;
    }
  },
  (error) => Promise.reject(error)
);

export default myApi;
