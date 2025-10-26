import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroAnimationProps {
  onAnimationComplete: () => void;
}

const HeroAnimation = ({ onAnimationComplete }: HeroAnimationProps) => {
  const [showDot, setShowDot] = useState(false);
  const [showHandprints, setShowHandprints] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Typewriter animation duration: 3s
    const dotTimer = setTimeout(() => {
      setShowDot(true);
    }, 3000);

    // Dot falls and becomes semicolon: 4s
    const handprintTimer = setTimeout(() => {
      setShowHandprints(true);
    }, 4500);

    // Complete animation: 5.5s
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      onAnimationComplete();
    }, 6000);

    return () => {
      clearTimeout(dotTimer);
      clearTimeout(handprintTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bubble animate-float opacity-30" />
        <div className="absolute top-40 right-32 w-24 h-24 bubble animate-float opacity-20" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bubble animate-float opacity-25" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bubble animate-float opacity-20" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Hero Content */}
      <div className="text-center z-10 px-8">
        <div className="relative inline-block">
          <h1 className="text-6xl md:text-8xl font-bold text-white typewriter mb-8">
            HeyBabyy
          </h1>
          
          {/* Falling Dot Animation */}
          {showDot && (
            <div className="absolute -right-4 top-4 md:-right-6 md:top-6">
              <span className="text-4xl md:text-6xl text-white falling-dot">
                {showHandprints ? ";" : "."}
              </span>
            </div>
          )}
        </div>

        {/* Baby Handprints */}
        {showHandprints && (
          <div className="mt-8 baby-handprint">
            <div className="flex justify-center space-x-4">
              <div className="relative">
                <div className="w-16 h-20 bg-gradient-primary rounded-full rotate-12 shadow-glow opacity-90" />
                <div className="absolute top-2 left-2 w-3 h-3 bg-white/50 rounded-full" />
                <div className="absolute top-4 left-1 w-2 h-2 bg-white/30 rounded-full" />
              </div>
              <div className="relative">
                <div className="w-16 h-20 bg-gradient-secondary rounded-full -rotate-12 shadow-glow opacity-90" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-white/50 rounded-full" />
                <div className="absolute top-4 right-1 w-2 h-2 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Subtitle */}
        {animationComplete && (
          <div className="mt-8 animate-fade-in">
            <p className="text-xl md:text-2xl text-white/80 font-light">
              {t('heroSubtitle')}
            </p>
          </div>
        )}
      </div>

      {/* Sparkle effects */}
      {animationComplete && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse-soft" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        </div>
      )}
    </div>
  );
};

export default HeroAnimation;