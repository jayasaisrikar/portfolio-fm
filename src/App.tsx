import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Landing from './pages/Landing';
import DetailedProfile from './pages/DetailedProfile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FieldBackground from './components/FieldBackground';
import './notebook.css';
import Seo from './components/Seo';
import NotFound from './pages/NotFound';

export default function App() {
  return <MotionConfig reducedMotion="user"><div className="notebook-site">
    <Seo />
    <FieldBackground />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navigation />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/profile" element={<DetailedProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </div></MotionConfig>;
}
