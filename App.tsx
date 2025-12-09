import React from 'react';
import OrchestratorAgent from './agents/OrchestratorAgent';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-indigo-600">Kasparro Challenge</h1>
            <p className="text-xs text-gray-500">Agentic Content Generation System</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">System: Online</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Mode: Auto</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <OrchestratorAgent />
      </main>
    </div>
  );
};

export default App;