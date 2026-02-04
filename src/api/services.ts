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
	getAll: async (categoryId?: number): Promise<ApiResponse<ApiProduct>> => {
		const params = categoryId ? { branch: categoryId } : {};
		const response = await apiClient.get<ApiResponse<ApiProduct>>('/product/public', { params });
		return response.data;
	},

	getById: async (id: number): Promise<ApiProduct> => {
		const response = await apiClient.get<ApiProduct>(`/product/public/${id}`);
		return response.data;
	},
};
