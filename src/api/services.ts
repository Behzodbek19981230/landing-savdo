import { apiClient } from './axios';
import { ApiResponse, ApiCategory, ApiProduct } from './types';

// Categories API
export const categoriesApi = {
	getAll: async (): Promise<ApiResponse<ApiCategory>> => {
		const response = await apiClient.get<ApiResponse<ApiCategory>>('/product-branch/public');
		return response.data;
	},
};

// Products API
export const productsApi = {
	getAll: async (
		categoryId?: number,
		page?: number,
		limit?: number,
		search?: string,
	): Promise<ApiResponse<ApiProduct>> => {
		const params: Record<string, any> = {};
		if (categoryId) params.branch = categoryId;
		if (page) params.page = page;
		if (limit) params.limit = limit;
		if (search && search.trim()) params.search = search.trim();
		const response = await apiClient.get<ApiResponse<ApiProduct>>('/product/public', { params });
		return response.data;
	},

	getById: async (id: number): Promise<ApiProduct> => {
		const response = await apiClient.get<ApiProduct>(`/product/public/${id}`);
		return response.data;
	},

	getAttachments: async (productId: number): Promise<ApiResponse<any>> => {
		const response = await apiClient.get<ApiResponse<any>>(`/product/public/${productId}/attachments`);
		return response.data;
	},
};
