import { GeneratedProductPage } from '../types';

export const renderProductTemplate = (
    title: string,
    description: string,
    sections: {
        ingredients: string,
        benefits: string,
        usage: string,
        safety: string,
        price: string
    }
): GeneratedProductPage => {
    return {
        title,
        product_name: title,
        description,
        sections
    };
};