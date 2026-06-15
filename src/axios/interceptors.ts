import { api } from "./api";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
let isInterceptorAttached = false;

export const setUpInterceptors = (
  getAccessToken: () => string,
  setAccessToken: (t: string) => void,
)  => {
  if (isInterceptorAttached) return;
  isInterceptorAttached = true;
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error?.config;
      if (!originalRequest._retry && error.response?.status === 401) {
        originalRequest._retry = true;
        try {
          const res = await api.get("/refresh");
          const newAccessToken = res.data.accessToken;
          setAccessToken(newAccessToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );
};
