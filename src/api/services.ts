import { apiClient } from './axios';
import { ApiResponse, ApiCategory, ApiProduct, ApiProductBranchCategory, ApiProductModel, ApiProductType } from './types';

// Categories API (product branches)
export const categoriesApi = {
	getAll: async (): Promise<ApiResponse<ApiCategory>> => {
		const response = await apiClient.get<ApiResponse<ApiCategory>>('/product-branch/public');
		return response.data;
	},
};

// Product branch categories (kategoriya turi)
export const branchCategoriesApi = {
	getAll: async (): Promise<ApiResponse<ApiProductBranchCategory>> => {
		const response = await apiClient.get<ApiResponse<ApiProductBranchCategory> | ApiProductBranchCategory[]>(
			'/product-branch-category/public',
		);
		const data = response.data;
		if (Array.isArray(data)) {
			return { results: data, pagination: {} as any, filters: {} };
		}
		return data;
	},
};

// Product models
export const productModelsApi = {
	getPublic: async (): Promise<ApiResponse<ApiProductModel>> => {
		const response = await apiClient.get<ApiResponse<ApiProductModel> | ApiProductModel[]>('/product-model/public');
		const data = response.data;
		if (Array.isArray(data)) {
			return { results: data, pagination: {} as any, filters: {} };
		}
		return data;
	},
};

// Product types (filter by model when model selected)
export const productTypesApi = {
	getPublic: async (): Promise<ApiResponse<ApiProductType>> => {
		const response = await apiClient.get<ApiResponse<ApiProductType> | ApiProductType[]>('/product-type/public');
		const data = response.data;
		if (Array.isArray(data)) {
			return { results: data, pagination: {} as any, filters: {} };
		}
		return data;
	},
};

// Products API
export const productsApi = {
	getAll: async (
		categoryId?: number,
		page?: number,
		limit?: number,
		search?: string,
		branchCategoryId?: number,
		modelId?: number,
		productTypeId?: number,
	): Promise<ApiResponse<ApiProduct>> => {
		const params: Record<string, any> = {};
		if (categoryId) params.branch = categoryId;
		if (page) params.page = page;
		if (limit) params.limit = limit;
		if (search && search.trim()) params.search = search.trim();
		if (branchCategoryId) params.branch_category = branchCategoryId;
		if (modelId) params.model = modelId;
		if (productTypeId) params.product_type = productTypeId;
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
