import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';

export const useFormatPriceBlock = () => {
  const format = useCallback((product: ProductModel): string => {
    // Assuming input is like "?699" or "699"
    const rawPrice = product.price.replace(/[^0-9.]/g, '');
    const currency = product.price.includes('?') ? '?' : '$'; // Default to INR based on input symbol or $
    
    return `Retail Price: ${currency}${rawPrice} (Tax included). Excellent value for a ${product.concentration} formulation.`;
  }, []);

  return { format };
};