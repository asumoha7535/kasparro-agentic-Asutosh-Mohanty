import { useCallback } from 'react';
import { ProductData } from '../types';
import { ProductModel, createProductModel } from '../models/ProductModel';

export const useDataParserAgent = () => {
  const parse = useCallback((rawData: ProductData): ProductModel => {
    // Validation logic
    if (!rawData.product_name || !rawData.price) {
        throw new Error("Validation Error: Missing critical product fields.");
    }
    
    // Transformation
    return createProductModel(rawData);
  }, []);

  return { parse };
};