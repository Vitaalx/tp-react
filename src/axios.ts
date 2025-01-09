import axios from "axios";

const api = axios.create({
	baseURL: "https://nestjs-pokedex-api.vercel.app"
})

export default api;