
import React, { useState, useEffect } from 'react';
import { Memory } from '../types';

interface MemoryViewProps {
  memory: Memory;
  onNext: () => void;
  isLast: boolean;
}

const MemoryView: React.FC<MemoryViewProps> = ({ memory, onNext, isLast }) => {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setVisible(false);
    setImgLoaded(false);
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, [memory]);

  return (
    <div className={`w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 transition-all duration-1000 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      
      {/* Image Side */}
      <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[3/4] group">
        <div className="absolute inset-0 border border-white/10 rounded-2xl -m-4 transition-all duration-700 group-hover:m-[-20px] group-hover:border-white/20"></div>
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-2xl bg-neutral-900">
            <img 
              src={memory.imageUrl} 
              alt={memory.title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-[2000ms] ${imgLoaded ? 'scale-100 grayscale-0' : 'scale-110 grayscale'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="absolute -bottom-6 -right-6 font-serif italic text-white/20 text-6xl select-none pointer-events-none">
            {String(memory.id).padStart(2, '0')}
        </div>
      </div>

      {/* Content Side */}
      <div className="flex flex-col items-start text-left space-y-6 max-w-sm px-4">
        <div className="space-y-2">
            <span className="text-rose-400/60 font-light tracking-[0.3em] uppercase text-[10px] block transition-all delay-300">
              {memory.date}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight font-light italic">
              {memory.title}
            </h2>
        </div>
        
        <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-base border-l border-white/10 pl-6 py-2">
          {memory.description}
        </p>

        <div className="pt-4 w-full">
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-4 py-3 px-1 transition-all duration-300"
          >
            <span className="text-neutral-200 font-light tracking-widest uppercase text-[10px] group-hover:text-rose-300 transition-colors">
              {isLast ? "Begin the finale" : "Next Chapter"}
            </span>
            <div className="w-12 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-rose-500 transition-all duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryView;
