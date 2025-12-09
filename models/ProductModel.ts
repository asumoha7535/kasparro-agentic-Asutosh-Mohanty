import { ProductData } from '../types';

export interface ProductModel extends ProductData {
    id: string;
    parsedAt: number;
    tags: string[];
}

export const createProductModel = (data: ProductData): ProductModel => {
    // Simple logic to tag based on skin type
    const tags = data.skin_type.split(',').map(s => s.trim().toLowerCase());
    
    return {
        ...data,
        id: `prod_${Date.now()}`,
        parsedAt: Date.now(),
        tags
    };
};