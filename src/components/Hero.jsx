import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Hero = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div id="home" className="w-screen bg-white py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block border border-[#FF4500] text-blue-950 font-semibold text-lg px-6 py-2 rounded-full mb-10">
          {t.teamLava}
        </div>
        
        <h1 className="text-5xl font-bold text-[#000080] mb-8">
          {t.hackathonTitle}
        </h1>
        
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            {t.projectTitle}
          </h2>
          
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            {t.projectDescription}
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/app')}
          className="bg-[#000080] text-white px-12 py-4 text-lg rounded-md font-medium hover:bg-[#000066] transition-colors"
        >
          {t.launchApp}
        </button>
      </div>
    </div>
  );
};

export default Hero; 