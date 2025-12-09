// A simple utility hook to demonstrate template processing logic
// In this system, it acts as a helper for string interpolation
import { useCallback } from 'react';

export const useTemplateEngine = () => {
    const process = useCallback((templateStr: string, data: Record<string, string>) => {
        let result = templateStr;
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, data[key]);
        });
        return result;
    }, []);

    return { process };
};