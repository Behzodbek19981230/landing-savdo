import { useQuery } from '@tanstack/react-query';
import { branchCategoriesApi } from '../api/services';

export function useBranchCategories() {
	return useQuery({
		queryKey: ['branchCategories'],
		queryFn: branchCategoriesApi.getAll,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
