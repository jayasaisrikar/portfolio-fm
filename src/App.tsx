import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Landing from './pages/Landing';
import DetailedProfile from './pages/DetailedProfile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const location = useLocation();
  const isProfile = location.pathname === '/profile';

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans relative overflow-x-hidden">
      <CustomCursor />
      {!isProfile && <Navigation />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<DetailedProfile />} />
        </Routes>
      </AnimatePresence>
      {!isProfile && <Footer />}
    </main>
  );
}
