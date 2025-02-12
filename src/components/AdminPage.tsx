import { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { termApi } from '../services/api';
import { Term } from '../types';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  // Mavjud atamalarni yuklash
  useEffect(() => {
    const loadTerms = async () => {
      try {
        const data = await termApi.getAll();
        setTerms(data);
      } catch (err) {
        console.error('Error loading terms:', err);
      }
    };
    loadTerms();
  }, []);

  // Yangi atama qo'shish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await termApi.create({ title });
      setSuccess("Atama muvaffaqiyatli qo'shildi");
      setTitle('');
      // Ro'yxatni yangilash
      const updatedTerms = await termApi.getAll();
      setTerms(updatedTerms);
    } catch (err) {
      if (err instanceof Error && err.message.includes('already exists')) {
        setError('Bu atama allaqachon mavjud');
      } else {
        setError("Xatolik yuz berdi. Bu atama allaqachon mavjud");
      }
    } finally {
      setLoading(false);
    }
  };

  // Atamani o'chirish
  const handleDelete = async (term: Term) => {
    if (!term.id || !window.confirm(`"${term.title.uz}" atamasini o'chirishni xohlaysizmi?`)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await termApi.delete(term.id);
      setSuccess("Atama muvaffaqiyatli o'chirildi");
      setSelectedTerm(null);
      // Ro'yxatni yangilash
      const updatedTerms = await termApi.getAll();
      setTerms(updatedTerms);
    } catch (err) {
      setError("Atamani o'chirishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <h1>Atamalarni boshqarish</h1>
      
      {/* Yangi atama qo'shish */}
      <form onSubmit={handleSubmit} className="admin-form">
        <TextField
          fullWidth
          label="Yangi atama nomi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <Button 
          type="submit"
          variant="contained"
          disabled={loading || !title.trim()}
          className="submit-button"
        >
          {loading ? "Qo'shilyapti..." : "Qo'shish"}
        </Button>
      </form>

      {/* Mavjud atamalar */}
      <div className="existing-terms">
        <h2>Mavjud atamalar</h2>
        <Autocomplete
          value={selectedTerm}
          onChange={(_, newValue) => setSelectedTerm(newValue)}
          options={terms}
          getOptionLabel={(option) => option.title.uz || ''}
          renderInput={(params) => (
            <TextField {...params} label="Mavjud atamani tanlang" />
          )}
        />
        
        {selectedTerm && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(selectedTerm)}
            disabled={loading}
            className="delete-button"
          >
            {loading ? "O'chirilmoqda..." : "Atamani o'chirish"}
          </Button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
}

export default AdminPage; 