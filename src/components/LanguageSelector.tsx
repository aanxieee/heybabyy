import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelector = ({ onLanguageSelect }: LanguageSelectorProps) => {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleLanguageClick = (language: Language) => {
    setSelectedLang(language.code);
    setTimeout(() => {
      onLanguageSelect(language);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
          {t('chooseLanguage')}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t('selectLanguageDesc')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">
        {languages.map((language, index) => (
          <button
            key={language.code}
            onClick={() => handleLanguageClick(language)}
            className={`bubble p-6 text-center transition-all duration-500 hover:shadow-glow ${
              selectedLang === language.code ? 'scale-110 shadow-hero' : ''
            }`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'fade-in 0.6s ease-out forwards'
            }}
          >
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {language.nativeName}
            </div>
            <div className="text-sm text-muted-foreground">
              {language.name}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {t('dontSeeLanguage')}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bubble animate-float opacity-20" />
      <div className="absolute top-20 right-16 w-16 h-16 bubble animate-float opacity-30" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bubble animate-float opacity-25" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-16 right-10 w-24 h-24 bubble animate-float opacity-20" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export default LanguageSelector;