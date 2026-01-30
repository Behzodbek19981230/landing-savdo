import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/services';

export const useProducts = (categoryId?: number) => {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => productsApi.getAll(categoryId),
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
