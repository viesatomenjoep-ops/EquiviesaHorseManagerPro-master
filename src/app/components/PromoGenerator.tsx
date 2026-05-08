import { useState, useEffect } from 'react';
import { Share2, CheckCircle2, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function PromoGenerator() {
  const fallbackHorse = {
    id: 'demo-123',
    name: 'Luna - Levisto x Balou du Rouet',
    sex: 'Mare',
    age: 5,
    date_of_birth: '2021-06-30',
    sire: 'Levisto',
    dam: 'Balou N',
    sire_sire: 'Leandro',
    sire_dam: 'Hirtin',
    dam_sire: 'Balou du Rouet',
    dam_dam: 'F',
    scout_name: 'Horse Scouting by Patrick Döller',
    scout_phone: '+491705453841'
  };

  const [horses, setHorses] = useState<any[]>([fallbackHorse]);
  const [selectedHorse, setSelectedHorse] = useState<any>(fallbackHorse);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchHorses() {
      try {
        const { data, error } = await supabase.from('horses').select('*');
        if (!error && data && data.length > 0) {
          setHorses(data);
          setSelectedHorse(data[0]);
        }
      } catch (e) {
        console.error('Failed to load horses, using fallback');
      }
    }
    fetchHorses();
  }, []);

  const handleCopyLink = () => {
    if (!selectedHorse) return;
    // Create a mock link that points to a specific promo page (which we can build later)
    const link = `https://equiviesa-horse-manager-pro.vercel.app/promo/${selectedHorse.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
            <Globe className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">Promo Link Generator</h2>
            <p className="text-xs text-slate-500 font-medium">Create public sales pages</p>
          </div>
        </div>
        <select 
          className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2 max-w-[200px]"
          onChange={(e) => setSelectedHorse(horses.find(h => h.id === e.target.value))}
          value={selectedHorse?.id || ''}
        >
          {horses.map(h => (
            <option key={h.id} value={h.id}>{h.name.split(' - ')[0]}</option>
          ))}
        </select>
      </div>

      {selectedHorse && (
        <div className="flex-1 bg-slate-50 rounded-xl p-5 border border-slate-200 relative overflow-hidden group mb-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900">{selectedHorse.name}</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
                  {selectedHorse.sex} • {selectedHorse.age} Years • Born {new Date(selectedHorse.date_of_birth).getFullYear()}
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="inline-block px-2.5 py-1 bg-white border border-slate-200 text-teal-700 text-xs font-bold rounded-full">
                  Verified Data
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm mt-auto">
              <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Pedigree Overview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Sire ♂</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedHorse.sire}</p>
                  <div className="pl-3 mt-1.5 border-l-2 border-slate-100">
                    <p className="text-xs text-slate-600">{selectedHorse.sire_sire}</p>
                    <p className="text-xs text-slate-600">{selectedHorse.sire_dam}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Dam ♀</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedHorse.dam}</p>
                  <div className="pl-3 mt-1.5 border-l-2 border-slate-100">
                    <p className="text-xs text-slate-600">{selectedHorse.dam_sire}</p>
                    <p className="text-xs text-slate-600">{selectedHorse.dam_dam}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={handleCopyLink}
        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
          copied 
            ? 'bg-teal-50 text-teal-700 border border-teal-200' 
            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
        }`}
      >
        {copied ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Link Copied to Clipboard!
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            Generate Public Promo Link
          </>
        )}
      </button>
    </div>
  );
}
