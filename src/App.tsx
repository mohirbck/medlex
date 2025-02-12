import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage'; // Asosiy sahifani alohida komponentga ajratamiz

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/12022025" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;