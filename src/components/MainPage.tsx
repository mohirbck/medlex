import { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import TermSearch from './TermSearch';
import TermDetails from './TermDetails';
import { Term, LanguageCode } from '../types';

function MainPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('uz');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const handleLanguageChange = (language: LanguageCode) => {
    setSelectedLanguage(language);
  };

  const handleTermSelect = (term: Term | null) => {
    setSelectedTerm(term);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <TermSearch 
          selectedLanguage={selectedLanguage}
          onTermSelect={handleTermSelect}
        />
        {selectedTerm && (
          <TermDetails 
            term={selectedTerm}
            language={selectedLanguage}
          />
        )}
      </div>
    </div>
  );
}

export default MainPage; 