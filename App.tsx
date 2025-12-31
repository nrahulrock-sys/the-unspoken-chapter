
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppSection } from './types';
import { MEMORIES, ASSETS } from './constants';
import Welcome from './components/Welcome';
import MemoryView from './components/MemoryView';
import FinalLetter from './components/FinalLetter';

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.WELCOME);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [isFadedOut, setIsFadedOut] = useState(false);
  
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const letterAudioRef = useRef<HTMLAudioElement | null>(null);

  const startJourney = useCallback(() => {
    setIsAudioStarted(true);
    setSection(AppSection.MEMORIES);
    if (bgmRef.current) {
      bgmRef.current.volume = 0;
      bgmRef.current.play().then(() => {
          // Fade in music
          let vol = 0;
          const interval = setInterval(() => {
              if (bgmRef.current && vol < 0.5) {
                  vol += 0.05;
                  bgmRef.current.volume = vol;
              } else {
                  clearInterval(interval);
              }
          }, 100);
      }).catch(e => console.error(e));
    }
  }, []);

  const nextMemory = useCallback(() => {
    if (memoryIndex < MEMORIES.length - 1) {
      setMemoryIndex(prev => prev + 1);
    } else {
      setSection(AppSection.FINAL);
      if (bgmRef.current) {
          // Fade out music
          let vol = bgmRef.current.volume;
          const interval = setInterval(() => {
              if (bgmRef.current && vol > 0) {
                  vol -= 0.05;
                  bgmRef.current.volume = Math.max(0, vol);
              } else {
                  if (bgmRef.current) bgmRef.current.pause();
                  clearInterval(interval);
                  if (letterAudioRef.current) {
                      letterAudioRef.current.play().catch(e => console.error(e));
                  }
              }
          }, 100);
      }
    }
  }, [memoryIndex]);

  useEffect(() => {
    const handleLetterEnd = () => {
      setIsFadedOut(true);
    };
    const letterAudio = letterAudioRef.current;
    if (letterAudio) {
      letterAudio.addEventListener('ended', handleLetterEnd);
      return () => letterAudio.removeEventListener('ended', handleLetterEnd);
    }
  }, []);

  const progress = section === AppSection.MEMORIES 
    ? ((memoryIndex + 1) / MEMORIES.length) * 100 
    : section === AppSection.FINAL ? 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-neutral-100 overflow-hidden px-4 selection:bg-rose-500/30">
      <audio ref={bgmRef} src={ASSETS.BGM_URL} loop />
      <audio ref={letterAudioRef} src={ASSETS.LETTER_VOICE_URL} />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-neutral-900 z-[110]">
          <div 
            className="h-full bg-rose-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(244,63,94,0.8)]"
            style={{ width: `${progress}%` }}
          />
      </div>

      <div 
        className={`fixed inset-0 bg-black z-[100] transition-opacity duration-[5000ms] pointer-events-none ${isFadedOut ? 'opacity-100' : 'opacity-0'}`}
      />

      <main className="w-full max-w-4xl mx-auto relative h-screen flex flex-col items-center justify-center">
        {section === AppSection.WELCOME && (
          <Welcome onStart={startJourney} />
        )}

        {section === AppSection.MEMORIES && (
          <MemoryView 
            memory={MEMORIES[memoryIndex]} 
            onNext={nextMemory} 
            isLast={memoryIndex === MEMORIES.length - 1} 
          />
        )}

        {section === AppSection.FINAL && (
          <FinalLetter />
        )}
      </main>

      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse"></div>
      </div>
    </div>
  );
};

export default App;
