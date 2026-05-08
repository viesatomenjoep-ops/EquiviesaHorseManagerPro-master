import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('nl');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if google translate cookie exists to set initial language
    const match = document.cookie.match(/googtrans=\/nl\/(.*?)(;|$)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Set the cookie for Google Translate
    // Google translate uses a cookie named 'googtrans' with value '/auto/LANG_CODE' or '/nl/LANG_CODE'
    document.cookie = `googtrans=/nl/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/nl/${langCode}; path=/`;
    
    // Reload to apply translation
    window.location.reload();
  };

  const selectedLang = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-200 shadow-sm"
      >
        <Globe className="w-4 h-4 text-slate-500" />
        <span>{selectedLang.flag} {selectedLang.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                  currentLang === lang.code ? 'bg-amber-50 text-[#8C7345] font-semibold' : 'text-slate-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
