import React, { useState, useEffect, useRef } from 'react';
import { ProductData, AgentLog, PipelineStatus } from '../types';
import { useDataParserAgent } from './DataParserAgent';
import { useQuestionGeneratorAgent } from './QuestionGeneratorAgent';
import { useContentAssemblerAgent } from './ContentAssemblerAgent';
import { useTemplateRendererAgent } from './TemplateRendererAgent';
import OutputDisplay from '../components/OutputDisplay';

// Input Data (Simulating Fetch)
const RAW_INPUT: ProductData = {
  "product_name": "GlowBoost Vitamin C Serum",
  "concentration": "10% Vitamin C",
  "skin_type": "Oily, Combination",
  "key_ingredients": "Vitamin C, Hyaluronic Acid",
  "benefits": "Brightening, Fades dark spots",
  "how_to_use": "Apply 2–3 drops in the morning before sunscreen",
  "side_effects": "Mild tingling for sensitive skin",
  "price": "?699"
};

const OrchestratorAgent: React.FC = () => {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [status, setStatus] = useState<PipelineStatus>('idle');
  const [outputs, setOutputs] = useState<{faq?: any, product?: any, comparison?: any}>({});
  
  // Guard to prevent double execution in StrictMode
  const hasStartedRef = useRef(false);

  // Agents (Hooks)
  const parser = useDataParserAgent();
  const questionGen = useQuestionGeneratorAgent();
  const assembler = useContentAssemblerAgent();
  const renderer = useTemplateRendererAgent();

  const addLog = (agent: string, message: string, status: AgentLog['status'] = 'info') => {
    setLogs(prev => [...prev, { timestamp: Date.now(), agent, message, status }]);
  };

  useEffect(() => {
    if (hasStartedRef.current) return;
    
    const runPipeline = async () => {
        hasStartedRef.current = true;
        try {
            // STEP 1: PARSING
            setStatus('parsing');
            addLog('Orchestrator', 'Starting pipeline...', 'info');
            
            await new Promise(r => setTimeout(r, 600)); // Simulating processing time
            const productModel = parser.parse(RAW_INPUT);
            addLog('DataParserAgent', `Parsed product: ${productModel.product_name}`, 'success');

            // STEP 2: QUESTION GENERATION
            setStatus('generating_questions');
            await new Promise(r => setTimeout(r, 600));
            const questionCategories = questionGen.generateQuestions(productModel);
            const totalQs = questionCategories.reduce((acc, cat) => acc + cat.questions.length, 0);
            addLog('QuestionGeneratorAgent', `Generated ${totalQs} questions across ${questionCategories.length} categories`, 'success');

            // STEP 3: ASSEMBLING & RENDERING (Simulating Parallel Processing)
            setStatus('assembling');
            await new Promise(r => setTimeout(r, 800));

            // 3a. FAQ Page
            // Flatten categories and pick top 5 for the page (Simulation of selection logic)
            const selectedQuestions = [
                ...questionCategories[0].questions.slice(0, 2),
                ...questionCategories[1].questions.slice(0, 2),
                ...questionCategories[2].questions.slice(0, 1)
            ];
            const faqItems = assembler.assembleFAQAnswers(selectedQuestions, productModel);
            const faqPage = renderer.renderFAQ(productModel.product_name, faqItems);
            addLog('ContentAssemblerAgent', 'Assembled FAQ answers', 'success');

            // 3b. Product Page
            const { description, sections } = assembler.assembleProductSections(productModel);
            const productPage = renderer.renderProduct(
                productModel.product_name,
                description,
                sections
            );
            addLog('ContentAssemblerAgent', 'Assembled Product sections', 'success');

            // 3c. Comparison Page
            const compData = assembler.assembleComparisonData(productModel);
            const compPage = renderer.renderComparison(
                compData.productNames,
                compData.table,
                compData.summary
            );
            addLog('ContentAssemblerAgent', 'Assembled Comparison data', 'success');

            // FINAL STEP: OUTPUT
            setOutputs({
                faq: faqPage,
                product: productPage,
                comparison: compPage
            });
            setStatus('complete');
            addLog('Orchestrator', 'Pipeline completed successfully. Assets generated.', 'success');

        } catch (e: any) {
            setStatus('error');
            addLog('Orchestrator', `Pipeline Failed: ${e.message}`, 'error');
            hasStartedRef.current = false; // Reset on error to allow retry if we added a retry button
        }
    };

    runPipeline();
  }, [parser, questionGen, assembler, renderer]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logs Panel */}
        <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    System Logs
                </h2>
                <div className="h-[500px] overflow-y-auto space-y-2 pr-2 font-mono text-xs">
                    {logs.map((log, i) => (
                        <div key={i} className={`p-2 rounded border-l-2 ${
                            log.status === 'error' ? 'border-red-500 bg-red-50' : 
                            log.status === 'success' ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'
                        }`}>
                            <span className="text-gray-400">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                            <span className="font-bold text-gray-700 ml-1">{log.agent}:</span>
                            <p className="text-gray-600 mt-1">{log.message}</p>
                        </div>
                    ))}
                    {status === 'complete' && (
                        <div className="p-2 text-center text-green-600 font-bold animate-pulse">
                            Processing Complete
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Generated Assets</h2>
            {status !== 'complete' ? (
                 <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-dashed border-gray-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-500">Agents are working...</p>
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <OutputDisplay title="FAQ Page Model" jsonData={outputs.faq} filename="faq.json" />
                    <OutputDisplay title="Product Page Model" jsonData={outputs.product} filename="product_page.json" />
                    <div className="md:col-span-2">
                         <OutputDisplay title="Comparison Page Model" jsonData={outputs.comparison} filename="comparison_page.json" />
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default OrchestratorAgent;