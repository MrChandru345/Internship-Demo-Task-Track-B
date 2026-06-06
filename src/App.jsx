import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { SavedProvider } from './context/SavedContext';
import Home from './pages/Home';
import CollegeDetail from './pages/CollegeDetail';
import ComparePage from './pages/ComparePage';
import SavedPage from './pages/SavedPage';

function App() {
  return (
    <SavedProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0e7ff_0,#f8fafc_34rem)] text-slate-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/college/:id" element={<CollegeDetail />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SavedProvider>
  );
}

export default App;
