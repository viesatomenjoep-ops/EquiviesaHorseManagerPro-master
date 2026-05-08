import { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'nl', name: 'Nederlands' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'sv', name: 'Svenska' },
  { code: 'da', name: 'Dansk' },
  { code: 'pt', name: 'Português' },
  { code: 'ar', name: 'العربية' },
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('nl');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if google translate cookie exists to set initial language
    const match = document.cookie.match(/googtrans=\/nl\/(.*?)(;|$)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }

    // Click outside listener
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    document.cookie = `googtrans=/nl/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/nl/${langCode}; path=/`;
    
    window.location.reload();
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-white hover:bg-slate-50 flex items-center justify-center rounded-full text-slate-600 transition-colors border border-slate-200 shadow-sm"
        aria-label="Select Language"
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                currentLang === lang.code ? 'bg-[#C2A878]/10 text-[#C2A878] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
