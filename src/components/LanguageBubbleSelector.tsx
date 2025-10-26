import { useState } from "react";
import { Button } from "@/components/ui/button";

const LanguageBubbleSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('English');

  const languages = [
    { label: 'English', native: 'English' },
    { label: 'Hindi', native: 'हिन्दी' }
  ];

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'English' ? 'हिन्दी' : 'English');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="rounded-full px-4 py-2 border-2 border-primary/20 hover:border-primary/40 bg-white/80 backdrop-blur-sm"
      >
        <span className="text-sm font-medium">
          {currentLanguage}
        </span>
      </Button>
    </div>
  );
};

export default LanguageBubbleSelector;