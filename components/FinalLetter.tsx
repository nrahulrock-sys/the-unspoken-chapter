
import React, { useEffect, useState } from 'react';
import { LETTER_CONTENT } from '../constants';

const FinalLetter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full max-w-2xl px-6 transition-all duration-[3000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative">
        {/* Elegant Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-rose-500/50 to-transparent"></div>
        
        <div className="space-y-12 text-center py-16">
          <p className="font-handwritten text-4xl text-rose-200 opacity-80">
            {LETTER_CONTENT.header}
          </p>
          
          <div className="space-y-8 text-neutral-300 leading-[2] font-serif text-xl md:text-2xl font-extralight italic max-w-xl mx-auto">
            {LETTER_CONTENT.body.split('\n\n').map((para, idx) => (
              <p key={idx} className="animate-[fadeSlideIn_2s_ease-out_forwards]" style={{ animationDelay: `${idx * 0.8}s` }}>
                {para}
              </p>
            ))}
          </div>
          
          <div className="pt-10 space-y-2 opacity-60">
            <p className="text-neutral-500 font-light text-xs tracking-[0.4em] uppercase">{LETTER_CONTENT.signature}</p>
            <p className="font-handwritten text-3xl text-white">Your Always</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(15px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default FinalLetter;
