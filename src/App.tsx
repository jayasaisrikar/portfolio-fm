import { Routes, Route } from 'react-router-dom';
import { VisualMotionProvider, useVisualMotion } from './components/VisualMotion';
import { MotionConfig } from 'motion/react';
import Landing from './pages/Landing';
import DetailedProfile from './pages/DetailedProfile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PortfolioMotion from './components/PortfolioMotion';
import './notebook.css';
import './premium.css';
import Seo from './components/Seo';
import NotFound from './pages/NotFound';

function Portfolio() {
  const { paused } = useVisualMotion();
  return <MotionConfig reducedMotion={paused ? "always" : "user"}><div className="notebook-site" data-motion-paused={paused}>
    <Seo />
    <PortfolioMotion />
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

export default function App() { return <VisualMotionProvider><Portfolio /></VisualMotionProvider>; }
