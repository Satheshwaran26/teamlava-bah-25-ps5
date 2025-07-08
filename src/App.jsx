import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import CloudMotionTool from './components/CloudMotionTool';
import './App.css';

// Home page component that shows all sections
const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <TeamSection />
    </>
  );
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<CloudMotionTool />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
