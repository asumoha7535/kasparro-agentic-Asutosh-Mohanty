import { useCallback } from 'react';
import { renderFAQTemplate, renderProductTemplate, renderComparisonTemplate } from '../templates';
import { FAQItem, GeneratedComparisonPage, GeneratedFAQPage, GeneratedProductPage } from '../types';

export const useTemplateRendererAgent = () => {
    const renderFAQ = useCallback((productName: string, items: FAQItem[]): GeneratedFAQPage => {
        return renderFAQTemplate(productName, items);
    }, []);

    const renderProduct = useCallback((
        title: string, 
        desc: string, 
        sections: any
    ): GeneratedProductPage => {
        return renderProductTemplate(title, desc, sections);
    }, []);

    const renderComparison = useCallback((
        names: string[],
        table: Record<string, string>,
        summary: string
    ): GeneratedComparisonPage => {
        return renderComparisonTemplate(names, table, summary);
    }, []);

    return { renderFAQ, renderProduct, renderComparison };
};