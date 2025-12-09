import { useCallback } from 'react';
import { ProductModel } from '../models/ProductModel';
import { 
    useGenerateBenefitsBlock, 
    useExtractUsageBlock, 
    useCompareIngredientsBlock, 
    useFormatPriceBlock, 
    useSafetyWarningBlock 
} from '../blocks';
import { useTemplateEngine } from '../utils/useTemplateEngine';
import { FAQItem } from '../types';

// Hardcoded competitor for comparison requirements
const COMPETITOR_PRODUCT: ProductModel = {
    id: "comp_001",
    product_name: "RadiantGlow Serum",
    concentration: "15% Vitamin C",
    skin_type: "Dry, Normal",
    key_ingredients: "Vitamin C, Niacinamide",
    benefits: "Hydrating, Reduces wrinkles",
    how_to_use: "Apply 1-2 drops at night",
    side_effects: "None reported",
    price: "?899",
    parsedAt: Date.now(),
    tags: ["dry", "normal"]
};

export const useContentAssemblerAgent = () => {
  const benefitsBlock = useGenerateBenefitsBlock();
  const usageBlock = useExtractUsageBlock();
  const compareBlock = useCompareIngredientsBlock();
  const priceBlock = useFormatPriceBlock();
  const safetyBlock = useSafetyWarningBlock();
  const templateEngine = useTemplateEngine();

  const assembleFAQAnswers = useCallback((questions: string[], product: ProductModel): FAQItem[] => {
    // Simple rule-based answer generation based on keywords in question
    return questions.map(q => {
        const qLower = q.toLowerCase();
        let answer = "";
        
        if (qLower.includes('how many drops') || qLower.includes('apply')) {
            answer = usageBlock.extract(product);
        } else if (qLower.includes('side effects') || qLower.includes('safe')) {
            answer = safetyBlock.generateWarning(product);
        } else if (qLower.includes('concentration') || qLower.includes('contain')) {
            answer = `${product.product_name} features a high-grade ${product.concentration} concentration.`;
        } else if (qLower.includes('price') || qLower.includes('cost')) {
            answer = priceBlock.format(product);
        } else {
            answer = benefitsBlock.generate(product);
        }

        return { question: q, answer };
    });
  }, [benefitsBlock, usageBlock, priceBlock, safetyBlock]);

  const assembleProductSections = useCallback((product: ProductModel) => {
    // Use the Custom Template Engine for the main description
    const descriptionTemplate = "Discover {{product_name}}, a premium skincare solution featuring {{concentration}}. Specifically formulated for {{skin_type}}, it actively targets {{benefits}}.";
    
    // Flatten benefits for the template
    const simpleBenefits = product.benefits.toLowerCase();

    const description = templateEngine.process(descriptionTemplate, {
        product_name: product.product_name,
        concentration: product.concentration,
        skin_type: product.skin_type,
        benefits: simpleBenefits
    });

    return {
        description, // Returned separately to be passed to the renderer as the main desc
        sections: {
            ingredients: `Key Active Components: ${product.key_ingredients}. Formulated for ${product.skin_type}.`,
            benefits: benefitsBlock.generate(product),
            usage: usageBlock.extract(product),
            safety: safetyBlock.generateWarning(product),
            price: priceBlock.format(product)
        }
    };
  }, [benefitsBlock, usageBlock, safetyBlock, priceBlock, templateEngine]);

  const assembleComparisonData = useCallback((productA: ProductModel) => {
    const productB = COMPETITOR_PRODUCT;
    
    return {
        productNames: [productA.product_name, productB.product_name],
        table: {
            "Concentration": `${productA.concentration} vs ${productB.concentration}`,
            "Price": `${productA.price} vs ${productB.price}`,
            "Ideal Skin Type": `${productA.skin_type} vs ${productB.skin_type}`,
            "Key Ingredients": `${productA.key_ingredients} vs ${productB.key_ingredients}`
        },
        summary: compareBlock.compare(productA, productB)
    };
  }, [compareBlock]);

  return { assembleFAQAnswers, assembleProductSections, assembleComparisonData };
};