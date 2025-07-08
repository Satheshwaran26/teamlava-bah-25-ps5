import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const features = t.aboutFeatures;

  return (
    <section className=" bg-white" id="about">
      <div className="container mx-auto px-4">
        {/* Main About Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase mb-2 block">{t.aboutSectionLabel}</span>
          <h2 className="text-4xl font-bold text-[#000080] mb-8">
            {t.aboutSectionTitle}
          </h2>
          <div className="w-20 h-1 bg-[#000080] mx-auto mb-10 rounded-full"></div>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.aboutSectionP1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.aboutSectionP2}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#000080] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}

        {/* Technical Details */}
    
      </div>
    </section>
  );
};

export default AboutSection; 