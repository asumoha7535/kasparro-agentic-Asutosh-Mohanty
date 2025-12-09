import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';

export const useSafetyWarningBlock = () => {
  const generateWarning = useCallback((product: ProductModel): string => {
    const effects = product.side_effects;
    const skinTypes = product.skin_type;
    
    let warning = `Dermatologist Note: Reported side effects include ${effects.toLowerCase()}. `;
    
    if (skinTypes.toLowerCase().includes('oily')) {
        warning += "Formulated specifically to be non-comedogenic for oily skin types. ";
    }
    
    warning += "Perform a patch test 24 hours prior to full application.";
    
    return warning;
  }, []);

  return { generateWarning };
};