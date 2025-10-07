import axios, { AxiosInstance } from "axios";

export const bookApi = axios.create({
	baseURL: "http://localhost:3000/books",
	withCredentials: true,
});

export const authApi = axios.create({
	baseURL: "http://localhost:3000/api/auth",
	withCredentials: true,
});

export const userApi = axios.create({
	baseURL: "http://localhost:3000/users",
	withCredentials: true,
});

const addAuthInterceptor = (apiInstance: AxiosInstance) => {
	apiInstance.interceptors.request.use((config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});
};

addAuthInterceptor(bookApi);
addAuthInterceptor(authApi);
addAuthInterceptor(userApi);
