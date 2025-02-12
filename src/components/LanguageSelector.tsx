import { SwapHoriz } from '@mui/icons-material';
import { Language } from '../utils/types';

interface LanguageSelectorProps {
  selectedLanguage: Language['code'];
  onLanguageChange: (code: Language['code']) => void;
}

function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages: Language[] = [
    { code: 'uz', label: "O'ZBEKCHA" },
    { code: 'ru', label: "РУССКИЙ" },
    { code: 'en', label: "ENGLISH" }
  ];

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`language-button ${selectedLanguage === lang.code ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang.code)}
        >
          {lang.label}
        </button>
      ))}
      <SwapHoriz style={{ color: '#CED4DA' }} />
      <button 
        className="language-button disabled"
        disabled
      >
        LATINUS
      </button>
    </div>
  );
}

export default LanguageSelector;