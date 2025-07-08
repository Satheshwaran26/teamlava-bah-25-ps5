import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 py-8">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-xl font-semibold text-[#002147] mb-2">{t.footerTitle}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {t.footerDesc}
        </p>
        <p className="text-xs text-gray-500">
          {typeof t.footerCopyright === 'function' ? t.footerCopyright(year) : t.footerCopyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
