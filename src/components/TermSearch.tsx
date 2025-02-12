import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { termApi } from '../services/api';
import { Term, LanguageCode } from '../types';

interface TermSearchProps {
  selectedLanguage: LanguageCode;
  onTermSelect: (term: Term | null) => void;
}

function TermSearch({ selectedLanguage, onTermSelect }: TermSearchProps) {
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Til bo'yicha xabar matnlari
  const errorMessages = {
    uz: "Ma'lumotlarni yuklashda xatolik yuz berdi",
    ru: "Ошибка при загрузке данных",
    en: "Failed to fetch data"
  };

  // Label'lar
  const labels: Record<LanguageCode, { main: string; latin: string }> = {
    uz: {
      main: "UZ atama",
      latin: "Lotincha atama"
    },
    ru: {
      main: "RU термин",
      latin: "Латинский термин"
    },
    en: {
      main: "EN term",
      latin: "Latin term"
    },
    la: {
      main: "LA term",
      latin: "Latin term"
    }
  };

  useEffect(() => {
    const loadTerms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await termApi.getAll();
        console.log('Loaded terms:', data);
        setTerms(data);
      } catch (err) {
        console.error('Error loading terms:', err);
        setError(errorMessages[selectedLanguage as keyof typeof errorMessages]);
      } finally {
        setLoading(false);
      }
    };

    loadTerms();
  }, [selectedLanguage]);

  const handleSearch = async (query: string) => {
    if (!query) {
      const data = await termApi.getAll();
      setTerms(data);
      setError(null);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const results = await termApi.search(query);
      console.log('Search results:', results);
      setTerms(results);
    } catch (err) {
      console.error('Search error:', err);
      setError(errorMessages[selectedLanguage as keyof typeof errorMessages]);
    } finally {
      setLoading(false);
    }
  };

  const handleTermSelect = async (newTerm: Term | null) => {
    setError(null);
    
    if (newTerm?.id) {
      try {
        setLoading(true);
        const fullTerm = await termApi.getById(newTerm.id);
        setSelectedTerm(fullTerm);
        onTermSelect(fullTerm);
      } catch (err) {
        console.error('Error fetching term details:', err);
        setError(errorMessages[selectedLanguage as keyof typeof errorMessages]);
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedTerm(null);
      onTermSelect(null);
    }
  };

  return (
    <div className="search-container">
      <Autocomplete<Term>
        className="search-field"
        loading={loading}
        value={selectedTerm}
        onChange={(_, newValue) => handleTermSelect(newValue)}
        options={terms}
        getOptionLabel={(option) => option.title[selectedLanguage] || ''}
        onInputChange={(_, value) => handleSearch(value)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={labels[selectedLanguage].main}
          />
        )}
      />
      
      <Autocomplete<Term>
        className="search-field"
        loading={loading}
        value={selectedTerm}
        onChange={(_, newValue) => handleTermSelect(newValue)}
        options={terms}
        getOptionLabel={(option) => option.title['la'] || ''}
        onInputChange={(_, value) => handleSearch(value)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={labels[selectedLanguage].latin}
          />
        )}
      />
      
      {error && !loading && terms.length === 0 && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default TermSearch;