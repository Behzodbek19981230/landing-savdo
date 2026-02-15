import { useQuery } from '@tanstack/react-query';
import { productTypesApi } from '../api/services';

export function useProductTypes() {
	return useQuery({
		queryKey: ['productTypes'],
		queryFn: productTypesApi.getPublic,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
