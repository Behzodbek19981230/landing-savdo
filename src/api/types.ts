// API Response Types
export interface ApiPagination {
	currentPage: number;
	lastPage: number;
	perPage: number;
	total: number;
}

export interface ApiResponse<T> {
	pagination: ApiPagination;
	results?: T[];
	filters: any;
}

// Category Types
export interface ApiCategory {
	id: number;
	name: string;
	sorting: number;
	is_delete: boolean;
}

// Product branch category (kategoriya turi) - /product-branch-category/
export interface ApiProductBranchCategoryDetail {
	id: number;
	name: string;
	sorting: number;
	is_delete: boolean;
}

export interface ApiProductBranchCategory {
	id: number;
	product_branch: number;
	product_branch_detail: ApiProductBranchCategoryDetail;
	name: string;
	sorting: number;
	is_delete: boolean;
}

// Product model - /product-model/public
export interface ApiProductModelBranchCategoryDetail {
	id: number;
	product_branch: number;
	name: string;
	sorting: number;
	is_delete: boolean;
}

export interface ApiProductModel {
	id: number;
	name: string;
	branch_name: string;
	branch_category: number;
	branch_category_detail: ApiProductModelBranchCategoryDetail;
	sorting: number;
	is_delete: boolean;
}

// Product type - /product-type/public (filter by model: madel === selectedModelId)
export interface ApiProductTypeBranchCategoryDetail {
	id: number;
	product_branch: number;
	name: string;
	sorting: number;
	is_delete: boolean;
}

export interface ApiProductTypeModelDetail {
	id: number;
	name: string;
	branch_name: string;
	branch_category: number;
	branch_category_detail: ApiProductTypeBranchCategoryDetail;
	sorting: number;
	is_delete: boolean;
}

export interface ApiProductType {
	id: number;
	name: string;
	branch_name: string;
	branch_category_name: string;
	madel: number;
	madel_detail: ApiProductTypeModelDetail;
	sorting: number;
	is_delete: boolean;
}

// Product Types (legacy)
export interface ApiCategoryDetail {
	id: number;
	name: string;
	sorting: number;
	is_delete: boolean;
}

export interface ApiModelDetail {
	id: number;
	name: string;
	categories: number[];
	sorting: number;
	is_delete: boolean;
}

export interface ApiModelTypeDetail {
	id: number;
	name: string;
	model: number;
	sorting: number | null;
	is_delete: boolean;
}

export interface ApiModelSizeDetail {
	id: number;
	model_type: number;
	size: number;
	type: string;
	sorting: number | null;
	is_delete: boolean;
}

export interface ApiProductAttachment {
	id: number;
	product: number;
	file: string;
}

export interface ApiProduct {
	id: number;
	date: string;
	reserve_limit: number;
	filial: number;
	filial_detail?: {
		id: number;
		name: string;
		region?: number;
		region_detail?: {
			id: number;
			code: string;
			name: string;
		};
		district?: number;
		district_detail?: {
			id: number;
			code: string;
			name: string;
			region: number;
		};
		address?: string;
		phone_number?: string;
		logo?: string | null;
		is_active?: boolean;
		is_delete?: boolean;
	};
	branch: number;
	branch_detail?: {
		id: number;
		name: string;
		sorting?: number;
		is_delete?: boolean;
	};
	branch_category: number;
	branch_category_detail?: {
		id: number;
		name: string;
		sorting?: number;
		is_delete?: boolean;
	};
	model: number;
	model_detail?: {
		id: number;
		name: string;
		branch?: number;
		branch_detail?: {
			id: number;
			name: string;
			sorting?: number;
			is_delete?: boolean;
		};
		sorting?: number;
		is_delete?: boolean;
	};
	type: number;
	type_detail?: {
		id: number;
		name: string;
		madel?: number;
		madel_detail?: {
			id: number;
			name: string;
		};
		sorting?: number;
		is_delete?: boolean;
	};
	size: number;
	size_detail?: {
		id: number;
		product_type: number;
		product_type_detail?: {
			id: number;
			name: string;
		};
		unit_code: string;
		size: number;
		type?: number | null;
		type_detail?: unknown;
		sorting?: number;
		is_delete?: boolean;
		unit_detail?: {
			id: number;
			name: string;
			code: string;
		};
	};
	count: number;
	real_price: number | string;
	unit_price: number | string;
	wholesale_price: number | string;
	min_price: number | string;
	note?: string;
	is_delete?: boolean;
	created_at?: string;
	updated_at?: string;
	images?: ApiProductAttachment;
}
