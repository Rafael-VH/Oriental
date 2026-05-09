import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import PublicWebsite from '@/presentation/pages/PublicWebsite';
import Dashboard from '@/presentation/pages/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicWebsite />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Toaster position="top-right" richColors closeButton duration={4000} />
    </>
  );
}

export default App;
