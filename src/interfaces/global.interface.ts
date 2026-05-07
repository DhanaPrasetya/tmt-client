export interface StandarizedResponse {
	code: number;
	status: string;
	message: string;
	data: unknown;
}

export interface ShortingUrl {
	original_url: string;
	custom_alias: string;
}
