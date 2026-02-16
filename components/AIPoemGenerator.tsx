import React, { useState } from 'react';
import { GeneratorStatus } from '../types';
import { generatePoem } from '../services/geminiService';
import { Sparkles, PenTool, Loader2, Send } from 'lucide-react';
import { SAMPLE_PROMPTS } from '../constants';

const AIPoemGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<GeneratorStatus>(GeneratorStatus.IDLE);
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setStatus(GeneratorStatus.LOADING);
    setGeneratedPoem(null);
    
    try {
      const poem = await generatePoem(prompt);
      setGeneratedPoem(poem);
      setStatus(GeneratorStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(GeneratorStatus.ERROR);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 mb-4">
          <Sparkles className="w-6 h-6 text-indigo-300" />
        </div>
        <h3 className="text-2xl font-display text-white mb-2">詩を紡ぐ</h3>
        <p className="text-gray-400 font-sans font-light">
          想い、思い出、あるいは瞬間を教えてください。あなたのために詩を書きます。
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例：木漏れ日が君の髪に落ちる様子..."
            className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-rose/50 transition-all font-sans"
            disabled={status === GeneratorStatus.LOADING}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button 
            onClick={handleGenerate}
            disabled={status === GeneratorStatus.LOADING || !prompt.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-rose/20 hover:bg-rose/40 text-rose rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === GeneratorStatus.LOADING ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Quick Prompts */}
        {status === GeneratorStatus.IDLE && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {SAMPLE_PROMPTS.map((sample) => (
              <button
                key={sample}
                onClick={() => setPrompt(sample)}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-full transition-all font-sans"
              >
                {sample}
              </button>
            ))}
          </div>
        )}

        {status === GeneratorStatus.ERROR && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg text-sm font-sans">
            何かがうまくいきませんでした。もう一度試してください。
          </div>
        )}

        {status === GeneratorStatus.SUCCESS && generatedPoem && (
          <div className="mt-8 animate-float">
            <div className="relative p-8 rounded-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-white/10">
               <PenTool className="absolute top-4 right-4 w-4 h-4 text-gray-500 opacity-50" />
               <p className="font-serif text-lg leading-loose text-gray-100 whitespace-pre-line text-center italic">
                 {generatedPoem}
               </p>
            </div>
            <div className="text-center mt-4">
              <button 
                onClick={() => { setGeneratedPoem(null); setStatus(GeneratorStatus.IDLE); setPrompt(''); }}
                className="text-sm text-gray-500 hover:text-white transition-colors underline decoration-dotted font-sans"
              >
                もう一度書く
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPoemGenerator;