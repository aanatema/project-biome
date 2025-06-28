import axios from "axios";

const bookApi = axios.create({
	baseURL: "http://localhost:3000/books",
	withCredentials: true,
});

export default bookApi;