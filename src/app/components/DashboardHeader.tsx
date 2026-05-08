import { Search, Bell, X, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function DashboardHeader() {
  const { t, i18n } = useTranslation();
  const currentHour = new Date().getHours();
  
  // Use translated greetings based on time
  const greetingKey = currentHour < 12 ? 'greeting.morning' : currentHour < 18 ? 'greeting.afternoon' : 'greeting.evening';
  const greeting = t(greetingKey);

  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  if (!isVisible) return null;

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 gap-6 shadow-sm mb-6 z-40">
      {/* Dismiss Button for Mobile */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full lg:hidden"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        <div 
          className="w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden transition-transform duration-75 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img 
            src="/viesa-logo.png" 
            alt="Equivest Logo" 
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">{greeting}, Thomas</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">{t('header.helpText')}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
          <input
            type="text"
            placeholder={t('header.searchPlaceholder')}
            className="w-full md:w-96 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
          />
        </div>

        {/* Language Switcher */}
        <div className="relative" ref={langMenuRef}>
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 flex items-center gap-2"
            title="Change Language"
          >
            <Globe className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
            <span className="hidden md:inline-block text-sm font-medium text-slate-600 uppercase">
              {i18n.language.substring(0, 2)}
            </span>
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Language</p>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 ${i18n.language.startsWith(lang.code) ? 'bg-slate-50 text-[#8C7345] font-semibold' : 'text-slate-700'}`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </div>
  );
}
