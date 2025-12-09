import { GeneratedFAQPage, FAQItem } from '../types';

export const renderFAQTemplate = (
    productName: string, 
    items: FAQItem[]
): GeneratedFAQPage => {
    return {
        title: `Frequently Asked Questions - ${productName}`,
        meta_description: `Find answers to common questions about ${productName}, including usage, safety, and benefits.`,
        faqs: items
    };
};