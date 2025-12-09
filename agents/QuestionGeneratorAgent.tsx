import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';
import { Question } from '../types';

export const useQuestionGeneratorAgent = () => {
  const generateQuestions = useCallback((product: ProductModel): Question[] => {
    const name = product.product_name;
    const ingredient = product.key_ingredients.split(',')[0];
    
    // Deterministic Rule-based Generation to ensure exactly 15 questions across categories
    
    const informationalQs = [
        `What makes ${name} different from other serums?`,
        `What is the primary concentration of ${ingredient} in this product?`,
        `Is ${name} suitable for daily use?`,
        `Does this product contain ${product.key_ingredients}?`,
        `Where is ${name} manufactured?`
    ];

    const usageQs = [
        `How many drops of ${name} should I apply?`,
        `Can I use ${name} with other skincare products?`,
        `Should I apply sunscreen after using this serum?`,
        `Is it better to use ${name} in the morning or evening?`,
        `How long does a bottle of ${name} typically last?`
    ];

    const safetyQs = [
        `Are there any side effects like ${product.side_effects.toLowerCase()}?`,
        `Is ${name} safe for ${product.skin_type} skin types?`,
        `Can I use this if I am pregnant or breastfeeding?`,
        `Does ${name} contain any harsh parabens?`,
        `What should I do if I experience irritation?`
    ];

    return [
        { category: "Informational", questions: informationalQs },
        { category: "Usage", questions: usageQs },
        { category: "Safety", questions: safetyQs }
    ];
  }, []);

  return { generateQuestions };
};