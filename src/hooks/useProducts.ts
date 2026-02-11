import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/services';

export const useProducts = (categoryId?: number, page?: number, limit?: number, search?: string) => {
	return useQuery({
		queryKey: ['products', categoryId, page, limit, search],
		queryFn: () => productsApi.getAll(categoryId, page, limit, search),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useProduct = (id: number) => {
	return useQuery({
		queryKey: ['product', id],
		queryFn: () => productsApi.getById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
};

export const useProductAttachments = (productId: number) => {
	return useQuery({
		queryKey: ['productAttachments', productId],
		queryFn: () => productsApi.getAttachments(productId),
		enabled: !!productId,
		staleTime: 5 * 60 * 1000,
	});
};
