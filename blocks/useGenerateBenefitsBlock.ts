import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';

export const useGenerateBenefitsBlock = () => {
  const generate = useCallback((product: ProductModel): string => {
    const rawBenefits = product.benefits.split(',').map(b => b.trim());
    
    // Rule-based text expansion
    const expandedBenefits = rawBenefits.map(b => {
      if (b.toLowerCase().includes('brightening')) {
        return `actively works to brighten skin tone for a radiant complexion`;
      }
      if (b.toLowerCase().includes('dark spots')) {
        return `clinically proven ingredients help fade stubborn dark spots over time`;
      }
      return b;
    });

    return `Experience the power of ${product.product_name}. This formula ${expandedBenefits.join(' and ')}, delivering visible results.`;
  }, []);

  return { generate };
};