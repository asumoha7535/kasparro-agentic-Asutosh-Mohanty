import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';

export const useCompareIngredientsBlock = () => {
  const compare = useCallback((productA: ProductModel, productB: ProductModel): string => {
    const ingA = productA.concentration;
    const ingB = productB.concentration;

    const valA = parseInt(ingA.replace(/[^0-9]/g, ''));
    const valB = parseInt(ingB.replace(/[^0-9]/g, ''));

    let comparisonText = `${productA.product_name} contains ${ingA}, whereas ${productB.product_name} offers ${ingB}. `;

    if (isNaN(valA) || isNaN(valB)) {
        // Fallback if parsing fails
        comparisonText += `Both products offer effective concentrations for their target skin types.`;
    } else if (valA < valB) {
        comparisonText += `${productA.product_name} is milder, making it an excellent choice for beginners or sensitive skin types.`;
    } else if (valA > valB) {
        comparisonText += `${productA.product_name} is more potent, designed for experienced users seeking rapid results.`;
    } else {
        comparisonText += `Both products offer similar potency levels.`;
    }

    return comparisonText;
  }, []);

  return { compare };
};