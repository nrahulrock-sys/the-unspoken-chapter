
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="text-center space-y-8 animate-[fadeIn_1.5s_ease-out]">
      <h1 className="text-5xl md:text-7xl font-serif italic mb-4">
        One last time, I speak not to be heard
      </h1>
      <p className="text-neutral-400 font-light tracking-widest uppercase text-sm">
        A small collection of our big moments
      </p>
      
      <div className="pt-10">
        <button
          onClick={onStart}
          className="px-8 py-3 border border-neutral-700 hover:border-neutral-300 transition-all duration-500 rounded-full bg-transparent text-neutral-200 font-light tracking-widest hover:bg-neutral-900"
        >
          Begin the past
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
