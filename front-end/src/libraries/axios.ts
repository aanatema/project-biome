import axios from "axios";

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