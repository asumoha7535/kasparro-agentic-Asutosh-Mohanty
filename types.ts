export interface ProductData {
    product_name: string;
    concentration: string;
    skin_type: string;
    key_ingredients: string;
    benefits: string;
    how_to_use: string;
    side_effects: string;
    price: string;
}

export interface Question {
    category: string;
    questions: string[];
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface GeneratedFAQPage {
    title: string;
    meta_description: string;
    faqs: FAQItem[];
}

export interface GeneratedProductPage {
    title: string;
    product_name: string;
    description: string;
    sections: {
        ingredients: string;
        benefits: string;
        usage: string;
        safety: string;
        price: string;
    };
}

export interface ComparisonItem {
    feature: string;
    product_a_value: string;
    product_b_value: string;
    verdict: string;
}

export interface GeneratedComparisonPage {
    title: string;
    products_compared: string[];
    comparison_table: Record<string, string>; 
    summary: string;
}

export type PipelineStatus = 'idle' | 'parsing' | 'generating_questions' | 'assembling' | 'rendering' | 'complete' | 'error';

export interface AgentLog {
    timestamp: number;
    agent: string;
    message: string;
    status: 'info' | 'success' | 'error';
}