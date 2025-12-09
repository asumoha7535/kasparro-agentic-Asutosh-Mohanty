import { GeneratedComparisonPage } from '../types';

export const renderComparisonTemplate = (
    productNames: string[],
    comparisonTable: Record<string, string>,
    summary: string
): GeneratedComparisonPage => {
    return {
        title: `Compare: ${productNames[0]} vs ${productNames[1]}`,
        products_compared: productNames,
        comparison_table: comparisonTable,
        summary
    };
};