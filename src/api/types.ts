// API Response Types
export interface ApiPagination {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
}

export interface ApiResponse<T> {
    pagination: ApiPagination;
    results: T[];
    filters: any;
}

// Category Types
export interface ApiCategory {
    id: number;
    name: string;
    sorting: number;
    is_delete: boolean;
}

// Product Types
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
    category: number;
    category_detail: ApiCategoryDetail;
    model: number;
    model_detail: ApiModelDetail;
    model_type: number;
    model_type_detail: ApiModelTypeDetail;
    model_size: number;
    model_size_detail: ApiModelSizeDetail;
    size: string | null;
    type: string | null;
    count: number;
    real_price: number;
    price: number;
    sorting: number | null;
    is_delete: boolean;
    discription: string | null;
    attachments: ApiProductAttachment[];
}
