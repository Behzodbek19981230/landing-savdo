import { useQuery } from '@tanstack/react-query';
import { productModelsApi } from '../api/services';

export function useProductModels() {
	return useQuery({
		queryKey: ['productModels'],
		queryFn: productModelsApi.getPublic,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
