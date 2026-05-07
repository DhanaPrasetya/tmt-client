import axios from "axios";
import type {
	ShortingUrl,
	StandarizedResponse,
} from "../interfaces/global.interface";

const API_URL = import.meta.env.VITE_API_URL;

const getOriginalUrl = async (
	shortUrl: string,
): Promise<StandarizedResponse> => {
	try {
		const response = await axios.get(`${API_URL}/?short_url=${shortUrl}`);
		return response.data as StandarizedResponse;
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch original URL");
	}
};

const createShortUrl = async (shortingUrl: ShortingUrl) => {
	try {
		const response = await axios.post(`${API_URL}/shorten`, shortingUrl);
		return response.data;
	} catch (err) {
		console.error("Failed to create short URL:", err);
		throw new Error("Failed to create short URL");
	}
};

export { getOriginalUrl, createShortUrl };
