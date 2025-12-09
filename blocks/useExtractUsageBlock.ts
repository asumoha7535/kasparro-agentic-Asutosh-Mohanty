import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';

export const useExtractUsageBlock = () => {
  const extract = useCallback((product: ProductModel): string => {
    const usage = product.how_to_use;
    const timeOfDay = usage.toLowerCase().includes('morning') ? 'Morning Routine' : 'Evening Routine';
    
    return `**${timeOfDay}**: ${usage}. Ensure consistent application for best results. Always follow with SPF if applied during the day.`;
  }, []);

  return { extract };
};