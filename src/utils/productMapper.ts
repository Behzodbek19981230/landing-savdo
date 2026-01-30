import { ApiProduct } from '../api/types';
import { Product } from '../types';

/**
 * Convert API Product to local Product format
 */
export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
    return {
        id: apiProduct.id,
        name: `${apiProduct.model_detail.name} ${apiProduct.model_type_detail.name}`,
        price: apiProduct.price || apiProduct.real_price || 0,
        category_id: apiProduct.category,
        category_name: apiProduct.category_detail.name,
        description: apiProduct.discription || `${apiProduct.model_detail.name} - ${apiProduct.model_type_detail.name}`,
        images: apiProduct.attachments.map(att => att.file),
        colors: [], // Add if available in your API
        sizes: apiProduct.model_size_detail ? [apiProduct.model_size_detail.type] : [],
        rating: 4.5, // Default rating, update if available in API
        count: apiProduct.count,
        model: apiProduct.model_detail.name,
        model_type: apiProduct.model_type_detail.name,
    };
};

/**
 * Convert array of API Products to local Products
 */
export const mapApiProductsToProducts = (apiProducts: ApiProduct[]): Product[] => {
    return apiProducts
        .filter(product => !product.is_delete && product.count > 0)
        .map(mapApiProductToProduct);
};
