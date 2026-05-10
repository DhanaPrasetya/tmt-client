import axios from "axios";
import type {
	ShortingUrl,
	StandarizedResponse,
} from "../interfaces/global.interface";

const API_URL = import.meta.env.VITE_API_URL;

const getOriginalUrl = async (
	customAlias: string,
): Promise<StandarizedResponse> => {
	try {
		const response = await axios.get(`${API_URL}/?custom_alias=${customAlias}`);
		return response.data as StandarizedResponse;
	} catch (err) {
		console.error(err);
		// Preserve the status code in the error
		const error = new Error("Failed to fetch original URL") as Error & {
			status?: number;
		};
		if (axios.isAxiosError(err)) {
			error.status = err.response?.status;
		}
		throw error;
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
