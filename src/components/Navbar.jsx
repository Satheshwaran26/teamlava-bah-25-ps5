import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // Default font size percentage
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isAppPage = location.pathname === '/app';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 70) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  };

  // Set initial font size on component mount
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, []);

  // Function to handle navigation with smooth scrolling
  const handleNavigation = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all border-b duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#000080] to-[#0066cc] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-[#000080]">TEAM LAVA</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={decreaseFontSize}
                className="text-gray-600 hover:text-[#000080] transition-colors font-bold text-lg px-3 py-1 rounded border border-gray-300 hover:border-[#000080]  bg-white"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={resetFontSize}
                className="text-gray-600 hover:text-[#000080] transition-colors font-bold text-lg px-3 py-1 rounded border border-gray-300 hover:border-[#000080] bg-white "
                title="Reset font size to default"
              >
                A
              </button>
              <button
                onClick={increaseFontSize}
                className="text-gray-600 hover:text-[#000080] transition-colors font-bold text-lg px-3 py-1 rounded border border-gray-300 hover:border-[#000080]  bg-white"
                title="Increase font size"
              >
                A+
              </button>
            </div>
            
            {isAppPage ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-[#000080] transition-colors">
                  {t.backTo} {t.home}
                </Link>
                <button
                  onClick={toggleLanguage}
                  className="text-gray-600 bg-white border-2 border-[#000080] hover:text-[#000080] transition-colors font-medium px-3 py-1 rounded"
                >
                  {language === 'en' ? 'हिंदी' : 'English'}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavigation('home')}
                  className="text-gray-600 hover:text-[#000080] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {t.home}
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="text-gray-600 hover:text-[#000080] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {t.about}
                </button>
                <button 
                  onClick={() => handleNavigation('team')}
                  className="text-gray-600 hover:text-[#000080] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {t.team}
                </button>
             
                <button
                  onClick={toggleLanguage}
                  className="text-gray-600 bg-white border-2 border-[#000080] hover:text-[#000080] transition-colors font-medium px-3 py-1 rounded"
                >
                  {language === 'en' ? 'हिंदी' : 'English'}
                </button>
                <Link 
                  to="/app"
                  className="bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-[#000060] transition-colors"
                >
                  {t.launchApp}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 bg-white border border-gray-200  transition-colors"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
     {isMobileMenuOpen && (
  <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
    <div className="flex flex-col items-center justify-center px-4 py-3 space-y-3 text-center">
      {/* Font Size Controls for Mobile */}
      <div className="flex items-center space-x-4 mb-3">
        <button
          onClick={decreaseFontSize}
          className="text-gray-600 hover:text-[#000080] transition-colors font-bold text-lg px-3 py-2 rounded border border-gray-300 hover:border-[#000080]"
          title="Decrease font size"
        >
          A-
        </button>
        <button
          onClick={resetFontSize}
          className="text-gray-600 hover:text-[#000080] transition-colors font-bold text-lg px-3 py-2 rounded border border-gray-300 hover:border-[#000080] bg-gray-50"
          title="Reset font size to default"
        >
          A
        </button>
        <button
          onClick={increaseFontSize}
          className="text-gray-600 hover:text-[#000080] transition-colors font-bold text-lg px-3 py-2 rounded border border-gray-300 hover:border-[#000080]"
          title="Increase font size"
        >
          A+
        </button>
      </div>
      
      {isAppPage ? (
        <>
          <Link 
            to="/" 
            className="block text-gray-600 hover:text-[#000080] transition-colors py-2"
            onClick={closeMobileMenu}
          >
            {t.backTo} {t.home}
          </Link>
          <button
            onClick={() => {
              toggleLanguage();
              closeMobileMenu();
            }}
            className="block w-full text-gray-600 bg-white border-2 border-[#000080] hover:text-[#000080] transition-colors font-medium px-3 py-2 rounded"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </>
      ) : (
        <>
          <button 
            onClick={() => {
              handleNavigation('home');
              closeMobileMenu();
            }}
            className="block text-gray-600 hover:text-[#000080] transition-colors py-2 bg-transparent border-none cursor-pointer"
          >
            {t.home}
          </button>
          <button 
            onClick={() => {
              handleNavigation('about');
              closeMobileMenu();
            }}
            className="block text-gray-600 hover:text-[#000080] transition-colors py-2 bg-transparent border-none cursor-pointer"
          >
            {t.about}
          </button>
          <button 
            onClick={() => {
              handleNavigation('team');
              closeMobileMenu();
            }}
            className="block text-gray-600 hover:text-[#000080] transition-colors py-2 bg-transparent border-none cursor-pointer"
          >
            {t.team}
          </button>
          <Link 
            to="/how-it-works" 
            className="block text-gray-600 hover:text-[#000080] transition-colors py-2"
            onClick={closeMobileMenu}
          >
            How it Works
          </Link>
          <button
            onClick={() => {
              toggleLanguage();
              closeMobileMenu();
            }}
            className="block  text-gray-600 bg-white border-2 border-[#000080] hover:text-[#000080] transition-colors font-medium px-3 py-2 rounded mb-3"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
          <Link 
            to="/app"
            className="block bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-[#000060] transition-colors text-center"
            onClick={closeMobileMenu}
          >
            {t.launchApp}
          </Link>
        </>
      )}
    </div>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar; 