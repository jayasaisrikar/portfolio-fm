import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Landing from './pages/Landing';
import DetailedProfile from './pages/DetailedProfile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FieldBackground from './components/FieldBackground';
import './notebook.css';

export default function App() {
  return <MotionConfig reducedMotion="user"><div className="notebook-site">
    <FieldBackground />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navigation />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/profile" element={<DetailedProfile />} />
      <Route path="*" element={<Landing />} />
    </Routes>
    <Footer />
  </div></MotionConfig>;
}
