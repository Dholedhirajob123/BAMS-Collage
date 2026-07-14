import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Index } from './pages/Index';
import { SlugPage } from './pages/SlugPage';
import { AdminPage } from './pages/AdminPage';
import logoAsset from "@/assets/mainlogo.png"; // Import your logo

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Optional: Add a small logo watermark or favicon-like display */}
      <div className="fixed bottom-4 right-4 opacity-10 z-50 pointer-events-none">
        <img src={logoAsset} alt="Logo" className="w-16 h-16 object-contain" />
      </div>
      
      <Header />
      <main className="flex-1 bg-white">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/:slug" element={<SlugPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;