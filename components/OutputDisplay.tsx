import React from 'react';

interface OutputDisplayProps {
    title: string;
    jsonData: any;
    filename: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ title, jsonData, filename }) => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    const downloadFile = () => {
        const blob = new Blob([jsonString], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col h-full">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{title}</h3>
                <button 
                    onClick={downloadFile}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Download JSON
                </button>
            </div>
            <div className="p-4 flex-grow bg-slate-900 overflow-auto max-h-96">
                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                    {jsonString}
                </pre>
            </div>
        </div>
    );
};

export default OutputDisplay;