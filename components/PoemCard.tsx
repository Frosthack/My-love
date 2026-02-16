import React from 'react';
import { Poem } from '../types';
import { Heart } from 'lucide-react';

interface PoemCardProps {
  poem: Poem;
  isMain?: boolean;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, isMain = false }) => {
  return (
    <div className={`relative p-8 md:p-12 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl transition-all duration-700 hover:bg-white/10 ${isMain ? 'max-w-3xl' : 'max-w-xl'} mx-auto w-full`}>
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose/50 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose/50 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-rose/50 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose/50 rounded-br-lg"></div>

      <div className="text-center mb-8">
        <Heart className="w-6 h-6 text-rose mx-auto mb-4 animate-pulse" fill="#e17055" />
        <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl text-starlight mb-2 ${isMain ? 'tracking-widest' : ''}`}>
          {poem.title}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mt-4"></div>
      </div>

      <div className="prose prose-invert mx-auto">
        <p className="font-serif text-lg md:text-xl leading-loose text-gray-200 text-center whitespace-pre-line">
          {poem.content}
        </p>
      </div>

      {isMain && (
        <div className="mt-12 text-center">
          <p className="text-sm font-sans text-rose/80 tracking-widest uppercase">Forever Yours</p>
        </div>
      )}
    </div>
  );
};

export default PoemCard;