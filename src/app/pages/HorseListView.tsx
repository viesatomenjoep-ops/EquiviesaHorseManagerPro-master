import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { 
  Trophy,
  Euro,
  Tent,
  Activity,
  Plus,
  Search,
  MapPin,
  Heart,
  Home
} from 'lucide-react';

const JumperIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L3 11l2 2 3-3 4 4 3-3 2 2 4-4-3-3z"/>
    <path d="M5 22h14"/>
    <path d="M9 18v4"/>
    <path d="M15 18v4"/>
  </svg>
);

const DressageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 10 10h-20"/>
    <path d="M12 6v12"/>
    <path d="M8 12h8"/>
  </svg>
);

const HunterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <circle cx="12" cy="11" r="3"/>
  </svg>
);

const SalesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);


interface Horse {
  id: string;
  name: string;
  discipline: string;
  age: number;
  sex: string;
  image_url?: string;
  sire?: string;
  dam?: string;
}

interface Location {
  id: string;
  name: string;
}

interface Box {
  id: string;
  box_number: string;
  location_id: string;
  horse_id: string | null;
}

export function HorseListView() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [horses, setHorses] = useState<Horse[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeHorseId, setActiveHorseId] = useState<string | null>(null);
  const [selectedBoxId, setSelectedBoxId] = useState('');

  const [showHorseModal, setShowHorseModal] = useState(false);
  const [editingHorse, setEditingHorse] = useState<Partial<Horse> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [horseRes, locRes, boxRes] = await Promise.all([
        supabase.from('horses').select('*'),
        supabase.from('locations').select('*'),
        supabase.from('boxes').select('*')
      ]);

      if (horseRes.data) setHorses(horseRes.data);
      if (locRes.data) setLocations(locRes.data);
      if (boxRes.data) setBoxes(boxRes.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAssignBox(e: React.FormEvent) {
    e.preventDefault();
    if (!activeHorseId || !selectedBoxId) return;

    try {
      // Free old box
      await supabase.from('boxes').update({ horse_id: null, status: 'available' }).eq('horse_id', activeHorseId);
      
      // Assign new box
      const { error } = await supabase.from('boxes').update({ horse_id: activeHorseId, status: 'occupied' }).eq('id', selectedBoxId);
      
      if (!error) {
        setShowAssignModal(false);
        fetchData();
      } else {
        alert(t('products.alert.error'));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSaveHorse(e: React.FormEvent) {
    e.preventDefault();
    if (!editingHorse) return;

    try {
      if (editingHorse.id && !editingHorse.id.startsWith('mock')) {
        // Update
        await supabase.from('horses').update(editingHorse).eq('id', editingHorse.id);
      } else {
        // Insert
        const { id, ...newHorseData } = editingHorse as any;
        await supabase.from('horses').insert([newHorseData]);
      }
      setShowHorseModal(false);
      setEditingHorse(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'equiviesa_upload');
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'daj1lyfgk');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'daj1lyfgk'}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setEditingHorse(prev => prev ? { ...prev, image_url: data.secure_url } : null);
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload mislukt. Controleer je Cloudinary instellingen.');
    } finally {
      setIsUploading(false);
    }
  };

  const horseCategories = [
    { id: 'jumpers', name: 'Jumpers & Hunters', count: horses.filter(h => h.discipline?.toLowerCase().includes('jump') || h.discipline?.toLowerCase().includes('hunt')).length, icon: JumperIcon, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
    { id: 'dressage', name: 'Dressage', count: horses.filter(h => h.discipline?.toLowerCase().includes('dress')).length, icon: DressageIcon, color: 'text-purple-500', bg: 'bg-purple-50', hover: 'hover:bg-purple-50 hover:border-purple-200' },
    { id: 'sales', name: 'Sales & Training', count: horses.filter(h => h.discipline?.toLowerCase().includes('sales') || h.discipline?.toLowerCase().includes('train')).length, icon: SalesIcon, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
    { id: 'rearing', name: 'Rearing & Retirement', count: horses.filter(h => h.discipline?.toLowerCase().includes('rear') || h.discipline?.toLowerCase().includes('retire')).length, icon: HunterIcon, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
  ];

  // 1. Initial Dashboard View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t('horse_list.title')}</h1>
            <p className="text-slate-500 mt-2">{t('horse_list.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {horseCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 group ${cat.hover} hover:-translate-y-1 hover:shadow-md`}
              >
                <div className={`w-20 h-20 rounded-full ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-10 h-10 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 text-center">{cat.name}</h3>
                <div className="mt-3 px-4 py-1.5 bg-slate-100 rounded-full">
                  <span className="text-sm font-semibold text-slate-600">{cat.count} Paarden</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View for a specific category
  const activeCatObj = horseCategories.find(c => c.id === selectedCategory);
  const ActiveIcon = activeCatObj?.icon || Trophy;

  const displayHorses = horses.filter(h => {
    if (!h.discipline) return false;
    const d = h.discipline.toLowerCase();
    if (selectedCategory === 'jumpers') return d.includes('jump') || d.includes('hunt');
    if (selectedCategory === 'dressage') return d.includes('dress');
    if (selectedCategory === 'sales') return d.includes('sales') || d.includes('train');
    if (selectedCategory === 'rearing') return d.includes('rear') || d.includes('retire');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header for Category */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="mr-2 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <span className="text-xl">←</span>
        </button>
        <div className={`p-4 rounded-2xl ${activeCatObj?.bg}`}>
          <ActiveIcon className={`w-8 h-8 ${activeCatObj?.color}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{activeCatObj?.name}</h1>
          <p className="text-slate-500 mt-1">Beheer alle {activeCatObj?.name.toLowerCase()} in de database.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('horse_list.search', { cat: activeCatObj?.name })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
            />
          </div>
          <button 
            onClick={() => {
              setEditingHorse({ 
                discipline: selectedCategory === 'sales' ? 'Sales' : 
                            (selectedCategory === 'dressage' ? 'Dressage' : 'Jumpers'),
                sex: 'Mare'
              }); 
              setShowHorseModal(true); 
            }}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-slate-800 text-[#C2A878] rounded-xl font-bold text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            {t('horse_list.add_horse')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayHorses.map((horse, i) => {
            // Find current box for this horse
            const currentBox = boxes.find(b => b.horse_id === horse.id);
            const currentLocation = currentBox ? locations.find(l => l.id === currentBox.location_id) : null;
            
            return (
              <div key={horse.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-[#C2A878] hover:shadow-lg transition-all flex flex-col">
                {/* Horse Image Header */}
                <div className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer">
                  <img 
                    src={horse.image_url || `https://source.unsplash.com/800x600/?horse,jumping,equestrian&sig=${selectedCategory}${i}`} 
                    alt="Horse"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {selectedCategory === 'sales' ? '€ 45.000' : t('horse_list.card.active')}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#C2A878] transition-colors cursor-pointer">
                      {horse.name}
                    </h3>
                    <button 
                      onClick={() => { setEditingHorse(horse); setShowHorseModal(true); }}
                      className="text-xs font-bold text-slate-400 hover:text-[#C2A878] bg-slate-50 px-2 py-1 rounded-md"
                    >
                      Bewerk
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-1">{horse.discipline || 'Geen discipline'} • {horse.sex} • {horse.age || '?'} Jaar</p>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600 mb-4 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>{t('horse_list.card.healthy')}</span>
                    </div>
                  </div>

                  {/* Stable Assignment Area */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <MapPin className="w-4 h-4 text-[#C2A878]" />
                      <span>{currentBox ? `${currentLocation?.name}, Box ${currentBox.box_number}` : t('horse_list.card.unassigned')}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveHorseId(horse.id);
                        setSelectedBoxId(currentBox?.id || '');
                        setShowAssignModal(true);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                    >
                      {t('horse_list.card.assign_box')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Box Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{t('locations.forms.assign_box')}</h2>
            <form onSubmit={handleAssignBox} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.select_box')}</label>
                <select required value={selectedBoxId} onChange={e => setSelectedBoxId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                  <option value="">{t('horse_list.card.select_box')}</option>
                  {boxes.map(b => {
                    const loc = locations.find(l => l.id === b.location_id);
                    const isCurrent = b.horse_id === activeHorseId;
                    return (
                      <option key={b.id} value={b.id} disabled={b.horse_id !== null && !isCurrent}>
                        {loc?.name} - Box {b.box_number} {b.horse_id ? (isCurrent ? t('horse_list.box.current') : t('horse_list.box.occupied')) : t('horse_list.box.free')}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowAssignModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">{t('locations.forms.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">{t('locations.forms.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Horse Modal */}
      {showHorseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{editingHorse?.id && !editingHorse.id.startsWith('mock') ? 'Bewerk Paard' : t('horse_list.add_horse')}</h2>
            <form onSubmit={handleSaveHorse} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              
              <div className="flex flex-col gap-2 mb-4">
                <label className="block text-sm font-medium">Profielfoto (Cloudinary)</label>
                {editingHorse?.image_url && (
                  <img src={editingHorse.image_url} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-slate-200" />
                )}
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm w-full" disabled={isUploading} />
                  {isUploading && <span className="text-xs text-[#C2A878] font-semibold animate-pulse">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Naam</label>
                <input required type="text" value={editingHorse?.name || ''} onChange={e => setEditingHorse({...editingHorse, name: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Geslacht / Type</label>
                  <select required value={editingHorse?.sex || ''} onChange={e => setEditingHorse({...editingHorse, sex: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md">
                    <option value="">Selecteer...</option>
                    <option value="Mare">Mare (Merrie)</option>
                    <option value="Gelding">Gelding (Ruin)</option>
                    <option value="Stallion">Stallion (Hengst)</option>
                    <option value="Pony">Pony</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discipline</label>
                  <select value={editingHorse?.discipline || ''} onChange={e => setEditingHorse({...editingHorse, discipline: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md">
                    <option value="">Selecteer...</option>
                    <option value="Jumpers">Jumpers</option>
                    <option value="Hunters">Hunters</option>
                    <option value="Equitation">Equitation</option>
                    <option value="Dressage">Dressage</option>
                    <option value="Sales">Sales</option>
                    <option value="Allround">Allround</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Leeftijd</label>
                  <input type="number" value={editingHorse?.age || ''} onChange={e => setEditingHorse({...editingHorse, age: parseInt(e.target.value)})} className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Vader (Sire)</label>
                  <input type="text" value={editingHorse?.sire || ''} onChange={e => setEditingHorse({...editingHorse, sire: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Moeder (Dam)</label>
                  <input type="text" value={editingHorse?.dam || ''} onChange={e => setEditingHorse({...editingHorse, dam: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowHorseModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">{t('locations.forms.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">{t('locations.forms.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
