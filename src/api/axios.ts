import axios from "axios";
import { store } from "@/store/store";
import { logout } from "@/store/auth/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL;
const GRAPHQL_BASE_URL = import.meta.env.VITE_FRONTEND_GRAPHQL_URL;

const API = axios.create({
  baseURL: GRAPHQL_BASE_URL,
  withCredentials: true,
});

const REST = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue: Array<() => void> = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

// Use plain axios here intentionally to avoid interceptor loop
const refreshToken = async () => {
  return axios.post(
    GRAPHQL_BASE_URL,
    {
      query: `
        mutation {
          refreshToken {
            success
          }
        }
      `,
    },
    {
      withCredentials: true,
    },
  );
};

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await refreshToken();

          isRefreshing = false;
          processQueue();

          return API.request(err.config);
        } catch (e) {
          isRefreshing = false;

          store.dispatch(logout());
          window.location.href = "/";

          return Promise.reject(e);
        }
      }

      return new Promise((resolve) => {
        queue.push(() => resolve(API.request(err.config)));
      });
    }

    return Promise.reject(err);
  },
);

export { API, REST };
export default API;
