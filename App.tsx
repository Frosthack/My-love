import React, { useRef } from 'react';
import StarryBackground from './components/StarryBackground';
import PoemCard from './components/PoemCard';
import AIPoemGenerator from './components/AIPoemGenerator';
import { POEMS } from './constants';
import { ChevronDown, Star } from 'lucide-react';

const App: React.FC = () => {
  const poemRef = useRef<HTMLDivElement>(null);
  const generatorRef = useRef<HTMLDivElement>(null);

  const scrollToPoem = () => {
    poemRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-starlight selection:bg-rose/30">
      <StarryBackground />

      {/* Navigation / Header - Minimalist */}
      <nav className="fixed top-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference opacity-0 animate-[fadeIn_2s_ease-in_forwards]">
        <span className="font-display font-bold text-lg tracking-widest text-white">SAAYA</span>
        <div className="flex gap-4">
           {/* Placeholder for future links */}
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center relative px-4 text-center">
          <div className="space-y-6 animate-[float_6s_ease-in-out_infinite]">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-rose animate-twinkle" fill="currentColor" />
            </div>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-starlight via-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              さあやへ
            </h1>
            <p className="font-serif font-light text-lg md:text-2xl text-gray-400 max-w-lg mx-auto leading-relaxed">
              私が紡ぐ言葉はすべて、君のもとへ還る。
            </p>
          </div>
          
          <button 
            onClick={scrollToPoem}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-500 hover:text-rose transition-colors duration-500 animate-bounce cursor-pointer"
            aria-label="Read Poem"
          >
            <ChevronDown className="w-10 h-10" />
          </button>
        </section>

        {/* Poems Section */}
        <div ref={poemRef} className="flex flex-col gap-20 py-20">
          {POEMS.map((poem, index) => (
            <section key={poem.id} className="min-h-[80vh] flex items-center justify-center px-4 md:px-8">
              <PoemCard poem={poem} isMain={true} />
            </section>
          ))}
        </div>

        {/* AI Generator Section */}
        <section ref={generatorRef} className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="mb-12 text-center max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl mb-4">言葉の宇宙</h2>
            <p className="font-serif text-gray-400 text-lg">
              心がいっぱいで言葉にならない時、星たちが新しい詩を紡ぎます。
            </p>
          </div>
          <AIPoemGenerator />
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-gray-600 font-sans text-xs tracking-widest uppercase">
          <p>愛と星屑を込めて</p>
        </footer>
      </main>
    </div>
  );
};

export default App;