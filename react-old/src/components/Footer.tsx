import React from 'react';
import { Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const languages = [
  // European languages
  { code: 'fr', name: 'Français', title: 'Solitaire', flag: '🇫🇷' },
  { code: 'en', name: 'English', title: 'Solitaire', flag: '🇬🇧' },
  { code: 'es', name: 'Español', title: 'Solitario', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', title: 'Solitario', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', title: 'Solitário', flag: '🇵🇹' },
  { code: 'de', name: 'Deutsch', title: 'Solitär', flag: '🇩🇪' },
  { code: 'nl', name: 'Nederlands', title: 'Solitaire', flag: '🇳🇱' },
  { code: 'ro', name: 'Română', title: 'Solitar', flag: '🇷🇴' },
  { code: 'cs', name: 'Čeština', title: 'Solitaire', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', title: 'Solitaire', flag: '🇸🇰' },
  
  // Asian languages
  { code: 'zh', name: '中文', title: '纸牌接龙', flag: '🇨🇳' },
  { code: 'id', name: 'Indonesia', title: 'Solitaire', flag: '🇮🇩' },
  { code: 'ms', name: 'Melayu', title: 'Solitaire', flag: '🇲🇾' },
  { code: 'hi', name: 'हिन्दी', title: 'सॉलिटेयर', flag: '🇮🇳' },
  { code: 'tl', name: 'Filipino', title: 'Solitaire', flag: '🇵🇭' }
];

export function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Logo and Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            {/* Logo */}
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg transform hover:scale-105 transition-transform">♥</div>
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg transform hover:scale-105 transition-transform">♦</div>
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg transform hover:scale-105 transition-transform">♠</div>
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg transform hover:scale-105 transition-transform">♣</div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">SLTR.com</h1>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              <Link to="/articles" onClick={handleLinkClick} className="text-sm text-white/70 hover:text-white transition-colors">Articles</Link>
              <Link to="/about" onClick={handleLinkClick} className="text-sm text-white/70 hover:text-white transition-colors">About Us</Link>
              <Link to="/terms" onClick={handleLinkClick} className="text-sm text-white/70 hover:text-white transition-colors">Terms of Use</Link>
              <Link to="/privacy" onClick={handleLinkClick} className="text-sm text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
              <a href="#" className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
            </nav>
          </div>

          {/* Language Selection */}
          <div className="w-full">
            <h2 className="text-white/70 text-sm mb-4 text-center">Available Languages</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className="text-sm font-medium">{lang.name}</div>
                    <div className="text-xs opacity-70">{lang.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

          {/* Copyright and Cookie Notice */}
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-sm text-white/70">
              © 2024 SLTR.com, All rights reserved
            </p>

            <div className="text-center">
              <Link to="/privacy" onClick={handleLinkClick} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                Paramètres concernant la confidentialité et les cookies
              </Link>
              <p className="text-xs text-white/50 mt-2">
                Géré par Google. Conforme au TCF de l'IAB. ID de CMP : 300
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}