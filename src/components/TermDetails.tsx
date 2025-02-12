import { Term, LanguageCode } from '../types';

interface TermDetailsProps {
  term: Term | null;
  language: LanguageCode;
}

function TermDetails({ term, language }: TermDetailsProps) {
  if (!term) return null;

  // Til bo'yicha matnlar
  const translations = {
    uz: {
      latin: "Lotincha"
    },
    ru: {
      latin: "Латинский"
    },
    en: {
      latin: "Latin"
    },
    la: {
      latin: "Latin"
    }
  };

  return (
    <div className="term-details">
      {term.imageUrl && (
        <img 
          src={term.imageUrl} 
          alt={term.title[language]} 
          className="term-image"
        />
      )}
      <h2 className="term-title">
        {term.title[language]}
      </h2>
      <div className="term-translations">
        <p className="term-latin">
          <strong>{translations[language].latin}: </strong>
          {term.title['la']}
        </p>
      </div>
      <p className="term-description">
        {term.description[language]}
      </p>
    </div>
  );
}

export default TermDetails;