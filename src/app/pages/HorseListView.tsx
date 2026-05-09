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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <g transform="translate(4, -2) scale(0.8)">
      <path d="M19.46 11.5c-1.12-.46-2.61-.92-3.87-1.1-1.3-.18-2.67-.3-4.14-.3-.54 0-1.13.06-1.7.13-.5.06-1.1.18-1.54.4-1.5.76-2.5 2.15-3.05 3.63-.55 1.5-.77 3.2-.77 4.8 0 .43.25.84.65.98.42.14.9-.06 1.15-.42.27-.38.56-.8.86-1.23.44-.64.92-1.32 1.5-1.9.54-.54 1.15-1.03 1.83-1.4.7-.37 1.48-.65 2.3-.8.85-.15 1.76-.17 2.68-.07.9.1 1.78.33 2.62.66.4.15.86-.02 1.05-.4.2-.38.05-.85-.35-1.04-.63-.3-1.3-.54-2-.7-.7-.17-1.42-.26-2.14-.3-.72-.04-1.46-.02-2.2.04-1.6.14-3.23.53-4.7 1.34-1.44.8-2.73 1.93-3.7 3.28-.96 1.33-1.63 2.87-2 4.5-.1.38-.05.78.16 1.1.2.33.56.55.95.6.38.04.77-.1 1.04-.37.28-.27.46-.64.5-1.03.1-1.16.4-2.3.88-3.37.5-1.08 1.18-2.07 2.05-2.9.85-.82 1.87-1.5 3-2.03 1.13-.53 2.36-.92 3.65-1.14 1.28-.23 2.62-.3 3.96-.2.66.05 1.3.16 1.95.3.36.08.74-.13.88-.47.14-.35-.04-.76-.4-.9z" />
    </g>
    <rect x="0" y="16" width="24" height="2" rx="1" />
    <rect x="0" y="20" width="24" height="2" rx="1" />
    <path fill="none" d="M4 16v6 M20 16v6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DressageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.46 11.5c-1.12-.46-2.61-.92-3.87-1.1-1.3-.18-2.67-.3-4.14-.3-.54 0-1.13.06-1.7.13-.5.06-1.1.18-1.54.4-1.5.76-2.5 2.15-3.05 3.63-.55 1.5-.77 3.2-.77 4.8 0 .43.25.84.65.98.42.14.9-.06 1.15-.42.27-.38.56-.8.86-1.23.44-.64.92-1.32 1.5-1.9.54-.54 1.15-1.03 1.83-1.4.7-.37 1.48-.65 2.3-.8.85-.15 1.76-.17 2.68-.07.9.1 1.78.33 2.62.66.4.15.86-.02 1.05-.4.2-.38.05-.85-.35-1.04-.63-.3-1.3-.54-2-.7-.7-.17-1.42-.26-2.14-.3-.72-.04-1.46-.02-2.2.04-1.6.14-3.23.53-4.7 1.34-1.44.8-2.73 1.93-3.7 3.28-.96 1.33-1.63 2.87-2 4.5-.1.38-.05.78.16 1.1.2.33.56.55.95.6.38.04.77-.1 1.04-.37.28-.27.46-.64.5-1.03.1-1.16.4-2.3.88-3.37.5-1.08 1.18-2.07 2.05-2.9.85-.82 1.87-1.5 3-2.03 1.13-.53 2.36-.92 3.65-1.14 1.28-.23 2.62-.3 3.96-.2.66.05 1.3.16 1.95.3.36.08.74-.13.88-.47.14-.35-.04-.76-.4-.9z" />
  </svg>
);

const HunterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <g transform="translate(3, 4) scale(0.7)">
       <path d="M19.46 11.5c-1.12-.46-2.61-.92-3.87-1.1-1.3-.18-2.67-.3-4.14-.3-.54 0-1.13.06-1.7.13-.5.06-1.1.18-1.54.4-1.5.76-2.5 2.15-3.05 3.63-.55 1.5-.77 3.2-.77 4.8 0 .43.25.84.65.98.42.14.9-.06 1.15-.42.27-.38.56-.8.86-1.23.44-.64.92-1.32 1.5-1.9.54-.54 1.15-1.03 1.83-1.4.7-.37 1.48-.65 2.3-.8.85-.15 1.76-.17 2.68-.07.9.1 1.78.33 2.62.66.4.15.86-.02 1.05-.4.2-.38.05-.85-.35-1.04-.63-.3-1.3-.54-2-.7-.7-.17-1.42-.26-2.14-.3-.72-.04-1.46-.02-2.2.04-1.6.14-3.23.53-4.7 1.34-1.44.8-2.73 1.93-3.7 3.28-.96 1.33-1.63 2.87-2 4.5-.1.38-.05.78.16 1.1.2.33.56.55.95.6.38.04.77-.1 1.04-.37.28-.27.46-.64.5-1.03.1-1.16.4-2.3.88-3.37.5-1.08 1.18-2.07 2.05-2.9.85-.82 1.87-1.5 3-2.03 1.13-.53 2.36-.92 3.65-1.14 1.28-.23 2.62-.3 3.96-.2.66.05 1.3.16 1.95.3.36.08.74-.13.88-.47.14-.35-.04-.76-.4-.9z" />
    </g>
    <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const RearingIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <g transform="translate(6, -2) scale(0.6)">
       <path d="M19.46 11.5c-1.12-.46-2.61-.92-3.87-1.1-1.3-.18-2.67-.3-4.14-.3-.54 0-1.13.06-1.7.13-.5.06-1.1.18-1.54.4-1.5.76-2.5 2.15-3.05 3.63-.55 1.5-.77 3.2-.77 4.8 0 .43.25.84.65.98.42.14.9-.06 1.15-.42.27-.38.56-.8.86-1.23.44-.64.92-1.32 1.5-1.9.54-.54 1.15-1.03 1.83-1.4.7-.37 1.48-.65 2.3-.8.85-.15 1.76-.17 2.68-.07.9.1 1.78.33 2.62.66.4.15.86-.02 1.05-.4.2-.38.05-.85-.35-1.04-.63-.3-1.3-.54-2-.7-.7-.17-1.42-.26-2.14-.3-.72-.04-1.46-.02-2.2.04-1.6.14-3.23.53-4.7 1.34-1.44.8-2.73 1.93-3.7 3.28-.96 1.33-1.63 2.87-2 4.5-.1.38-.05.78.16 1.1.2.33.56.55.95.6.38.04.77-.1 1.04-.37.28-.27.46-.64.5-1.03.1-1.16.4-2.3.88-3.37.5-1.08 1.18-2.07 2.05-2.9.85-.82 1.87-1.5 3-2.03 1.13-.53 2.36-.92 3.65-1.14 1.28-.23 2.62-.3 3.96-.2.66.05 1.3.16 1.95.3.36.08.74-.13.88-.47.14-.35-.04-.76-.4-.9z" />
    </g>
    <path fill="none" stroke="currentColor" strokeWidth="2" d="M3 20h18 M6 20v-4c0-1 1-2 2-2h0c1 0 2 1 2 2v4 M14 20v-5c0-1 1-2 2-2h0c1 0 2 1 2 2v5"/>
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
  const [horseMedia, setHorseMedia] = useState<any[]>([]);
  const [pendingMedia, setPendingMedia] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchHorseMedia(horseId: string) {
    if (!horseId || horseId.startsWith('mock')) return;
    const { data } = await supabase.from('media_assets').select('*').eq('horse_id', horseId);
    if (data) setHorseMedia(data);
  }

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
      let currentHorseId = editingHorse.id;
      
      if (currentHorseId && !currentHorseId.startsWith('mock')) {
        const { error } = await supabase.from('horses').update(editingHorse).eq('id', currentHorseId);
        if (error) { alert("Fout bij opslaan: " + error.message); return; }
      } else {
        const { id, ...newHorseData } = editingHorse as any;
        const { data, error } = await supabase.from('horses').insert([newHorseData]).select();
        if (error) { alert("Fout bij toevoegen: " + error.message); return; }
        if (data && data[0]) currentHorseId = data[0].id;
      }

      // Save pending media
      if (pendingMedia.length > 0 && currentHorseId) {
        const mediaInserts = pendingMedia.map(url => ({
          horse_id: currentHorseId,
          url: url,
          document_category: 'Foto/Video'
        }));
        await supabase.from('media_assets').insert(mediaInserts);
      }

      setShowHorseModal(false);
      setEditingHorse(null);
      setPendingMedia([]);
      setHorseMedia([]);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Er is een onverwachte fout opgetreden bij het opslaan.");
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter(url => url);
      
      if (validUrls.length > 0) {
        // First image becomes primary image_url if not set
        setEditingHorse(prev => {
           if (!prev) return prev;
           if (!prev.image_url) return { ...prev, image_url: validUrls[0] };
           return prev;
        });
        // Add all to pending media to insert later
        setPendingMedia(prev => [...prev, ...validUrls]);
      }
    } catch (error: any) {
      console.error('Upload failed', error);
      alert('Upload mislukt: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const horseCategories = [
    { id: 'jumpers', name: 'Jumpers', count: horses.filter(h => h.discipline?.toLowerCase().includes('jump')).length, icon: JumperIcon, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
    { id: 'hunters', name: 'Hunters', count: horses.filter(h => h.discipline?.toLowerCase().includes('hunt')).length, icon: HunterIcon, color: 'text-orange-500', bg: 'bg-orange-50', hover: 'hover:bg-orange-50 hover:border-orange-200' },
    { id: 'dressage', name: 'Dressage', count: horses.filter(h => h.discipline?.toLowerCase().includes('dress')).length, icon: DressageIcon, color: 'text-purple-500', bg: 'bg-purple-50', hover: 'hover:bg-purple-50 hover:border-purple-200' },
    { id: 'sales', name: 'Sales & Training', count: horses.filter(h => h.discipline?.toLowerCase().includes('sales') || h.discipline?.toLowerCase().includes('train')).length, icon: SalesIcon, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
    { id: 'rearing', name: 'Rearing & Retirement', count: horses.filter(h => h.discipline?.toLowerCase().includes('rear') || h.discipline?.toLowerCase().includes('retire')).length, icon: RearingIcon, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                  <span className="text-sm font-semibold text-slate-600">{cat.count} {t('horse_list.horses_count')}</span>
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
    if (selectedCategory === 'jumpers') return d.includes('jump');
    if (selectedCategory === 'hunters') return d.includes('hunt');
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
          className="mr-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center gap-2"
        >
          <span className="text-xl">←</span>
          {t('admin.back')}
        </button>
        <div className={`p-4 rounded-2xl ${activeCatObj?.bg}`}>
          <ActiveIcon className={`w-8 h-8 ${activeCatObj?.color}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{activeCatObj?.name}</h1>
          <p className="text-slate-500 mt-1">{t('horse_list.subtitle')}</p>
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
              setEditingHorse({ discipline: selectedCategory === 'sales' ? 'Sales' : (selectedCategory === 'dressage' ? 'Dressage' : 'Jumpers'), sex: 'Mare' }); setPendingMedia([]); setHorseMedia([]); setShowHorseModal(true); 
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
                <div 
                  className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => { setEditingHorse(horse); setPendingMedia([]); setHorseMedia([]); fetchHorseMedia(horse.id); setShowHorseModal(true); }}
                >
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
                    <h3 
                      onClick={() => { setEditingHorse(horse); setPendingMedia([]); setHorseMedia([]); fetchHorseMedia(horse.id); setShowHorseModal(true); }}
                      className="text-xl font-bold text-slate-900 group-hover:text-[#C2A878] transition-colors cursor-pointer"
                    >
                      {horse.name}
                    </h3>
                    <button 
                      onClick={() => { setEditingHorse(horse); setPendingMedia([]); setHorseMedia([]); fetchHorseMedia(horse.id); setShowHorseModal(true); }}
                      className="text-xs font-bold text-slate-400 hover:text-[#C2A878] bg-slate-50 px-2 py-1 rounded-md"
                    >
                      {t('horse_list.card.edit')}
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-1">{horse.discipline || t('horse_list.card.no_discipline')} • {horse.sex} • {horse.age || '?'} {t('horse_list.card.years')}</p>
                  
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
            <h2 className="text-xl font-bold mb-4 text-slate-900">{t('locations.forms.assign_box')}</h2>
            <form onSubmit={handleAssignBox} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">{t('locations.forms.select_box')}</label>
                <select required value={selectedBoxId} onChange={e => setSelectedBoxId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-slate-900">
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
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAssignModal(false)} className="px-4 py-2 bg-slate-200 text-slate-900 font-bold rounded-lg">{t('locations.forms.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-slate-900 font-bold rounded-lg">{t('locations.forms.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Horse Modal */}
      {showHorseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4 text-slate-900">{editingHorse?.id && !editingHorse.id.startsWith('mock') ? t('horse_list.form.edit_horse') : t('horse_list.add_horse')}</h2>
            <form onSubmit={handleSaveHorse} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              
              <div className="flex flex-col gap-2 mb-4">
                <label className="block text-sm font-bold text-slate-900">{t('horse_list.form.photo_video')}</label>
                {(editingHorse?.image_url || horseMedia.length > 0 || pendingMedia.length > 0) && (
                  <div className="flex gap-2 flex-wrap mb-2">
                    {editingHorse?.image_url && (
                      <div className="relative w-20 h-20 rounded-xl border-2 border-[#C2A878] overflow-hidden bg-slate-100" title="Hoofdfoto">
                        {editingHorse.image_url.includes('.mp4') || editingHorse.image_url.includes('video') ? (
                          <video src={editingHorse.image_url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={editingHorse.image_url} alt="Preview" className="w-full h-full object-cover" />
                        )}
                      </div>
                    )}
                    {horseMedia.map(m => (
                      <div key={m.id} className="relative w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-slate-100">
                        {m.url.includes('.mp4') || m.url.includes('video') ? (
                          <video src={m.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={m.url} alt="Media" className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                    {pendingMedia.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 opacity-70">
                        {url.includes('.mp4') || url.includes('video') ? (
                          <video src={url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={url} alt="Nieuw" className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input type="file" multiple accept="image/*,video/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} title={t('horse_list.form.photo_video')} />
                    <button type="button" className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 text-sm font-bold shadow-sm pointer-events-none">
                       {t('horse_list.form.photo_video')} Toevoegen
                    </button>
                  </div>
                  {isUploading && <span className="text-xs text-[#C2A878] font-semibold animate-pulse">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.name')}</label>
                <input required type="text" value={editingHorse?.name || ''} onChange={e => setEditingHorse({...editingHorse, name: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.sex_type')}</label>
                  <select required value={editingHorse?.sex || ''} onChange={e => setEditingHorse({...editingHorse, sex: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900">
                    <option value="">{t('horse_list.form.select')}</option>
                    <option value="Mare">{t('horse_list.form.mare')}</option>
                    <option value="Gelding">{t('horse_list.form.gelding')}</option>
                    <option value="Stallion">{t('horse_list.form.stallion')}</option>
                    <option value="Pony">{t('horse_list.form.pony')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.discipline')}</label>
                  <select value={editingHorse?.discipline || ''} onChange={e => setEditingHorse({...editingHorse, discipline: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900">
                    <option value="">{t('horse_list.form.select')}</option>
                    <option value="Jumpers">{t('horse_list.form.jumpers')}</option>
                    <option value="Hunters">{t('horse_list.form.hunters')}</option>
                    <option value="Equitation">{t('horse_list.form.equitation')}</option>
                    <option value="Dressage">{t('horse_list.form.dressage')}</option>
                    <option value="Sales">{t('horse_list.form.sales')}</option>
                    <option value="Allround">{t('horse_list.form.allround')}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.age')}</label>
                  <input type="number" value={editingHorse?.age || ''} onChange={e => setEditingHorse({...editingHorse, age: parseInt(e.target.value)})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.sire')}</label>
                  <input type="text" value={editingHorse?.sire || ''} onChange={e => setEditingHorse({...editingHorse, sire: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1">{t('horse_list.form.dam')}</label>
                  <input type="text" value={editingHorse?.dam || ''} onChange={e => setEditingHorse({...editingHorse, dam: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md text-slate-900" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowHorseModal(false)} className="px-4 py-2 bg-slate-200 text-slate-900 font-bold rounded-lg">{t('horse_list.form.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-slate-900 font-bold rounded-lg">{t('horse_list.form.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
