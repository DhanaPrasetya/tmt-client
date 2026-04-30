import axios from "axios";

const API_URL = import.meta.env.API_URL;
const M_URL = import.meta.env.M_URL;

const getOriginalUrl = async (shortUrl: string) => {
	const response = axios
		.get(`${API_URL}/?short_url=${shortUrl}`)
		.then((res) => res)
		.catch((err) => {
			console.error(err);
			throw new Error("Failed to fetch original URL");
		});
	console.log(response);
	return response;
};

const getProducts = async () => {
	try {
		const response = await axios.get(`${M_URL}/products`);
		console.log("Products data:", response.data);
		return response.data;
	} catch (err) {
		console.error("Failed to get products:", err);
		throw new Error("Failed to get products");
	}
};

export { getOriginalUrl, getProducts };
