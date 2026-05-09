import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Home, 
  Settings,
  Plus,
  Box as BoxIcon,
  Activity,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Location {
  id: string;
  name: string;
  type: string;
  capacity: number;
  image_url?: string;
}

interface Box {
  id: string;
  location_id: string;
  horse_id: string | null;
  box_number: string;
  status: string;
  horse?: {
    name: string;
  };
}

interface Horse {
  id: string;
  name: string;
  discipline?: string;
  age?: number;
  sex?: string;
  image_url?: string;
  sire?: string;
  dam?: string;
}

export function LocationsView() {
  const { t } = useTranslation();
  
  const [locations, setLocations] = useState<Location[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showPastureModal, setShowPastureModal] = useState(false);
  const [showHorseModal, setShowHorseModal] = useState(false);
  const [editingHorse, setEditingHorse] = useState<Partial<Horse> | null>(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [showBoxEditModal, setShowBoxEditModal] = useState(false);
  const [editingBox, setEditingBox] = useState<Partial<Box> | null>(null);

  // Forms state
  const [locName, setLocName] = useState('');
  const [locType, setLocType] = useState('Hoofdstal');
  const [locCapacity, setLocCapacity] = useState('30');
  const [locImageUrl, setLocImageUrl] = useState('');
  
  const [assignHorseId, setAssignHorseId] = useState('');
  const [assignBoxId, setAssignBoxId] = useState('');
  
  const [pastureHorseId, setPastureHorseId] = useState('');
  const [pastureStartTime, setPastureStartTime] = useState('08:00');
  const [pastureEndTime, setPastureEndTime] = useState('12:00');
  const [pastureLocationId, setPastureLocationId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const [locRes, boxRes, horseRes] = await Promise.all([
        supabase.from('locations').select('*').order('created_at', { ascending: true }),
        supabase.from('boxes').select('*, horse:horses(name)'),
        supabase.from('horses').select('*')
      ]);

      if (locRes.data) setLocations(locRes.data);
      if (boxRes.data) setBoxes(boxRes.data);
      if (horseRes.data) setHorses(horseRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveLocation(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingLocation) {
        // Update
        const { error } = await supabase.from('locations').update({
          name: locName,
          type: locType,
          capacity: parseInt(locCapacity),
          image_url: locImageUrl || null
        }).eq('id', editingLocation.id);
        
        if (!error) {
          fetchData();
          setShowLocationModal(false);
          setEditingLocation(null);
        } else {
          alert(t('products.alert.error'));
        }
      } else {
        // Insert
        const { data, error } = await supabase.from('locations').insert([{
          name: locName,
          type: locType,
          capacity: parseInt(locCapacity),
          image_url: locImageUrl || null
        }]).select();

        if (!error && data) {
          fetchData();
          
          // Auto-create boxes for the new location
          const newBoxes = Array.from({ length: parseInt(locCapacity) }).map((_, i) => ({
            location_id: data[0].id,
            box_number: `A${i + 1}`,
            status: 'available'
          }));
          
          await supabase.from('boxes').insert(newBoxes);
          
          setShowLocationModal(false);
          setLocName('');
          setLocImageUrl('');
        } else {
          alert(t('products.alert.error'));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSaveBox(e: React.FormEvent) {
    e.preventDefault();
    if (!editingBox?.id) return;
    try {
      const { error } = await supabase.from('boxes').update({
        box_number: editingBox.box_number,
        location_id: editingBox.location_id
      }).eq('id', editingBox.id);

      if (!error) {
        setShowBoxEditModal(false);
        setEditingBox(null);
        fetchData();
      } else {
        alert(t('products.alert.error'));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAssignBox(e: React.FormEvent) {
    e.preventDefault();
    try {
      // First, remove horse from old box
      await supabase.from('boxes').update({ horse_id: null, status: 'available' }).eq('horse_id', assignHorseId);
      
      // Assign to new box
      const { error } = await supabase.from('boxes').update({ horse_id: assignHorseId, status: 'occupied' }).eq('id', assignBoxId);
      if (!error) {
        fetchData(); // reload
        setShowAssignModal(false);
      } else {
        alert(t('products.alert.error'));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePastureSchedule(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('pasture_schedules').insert([{
        horse_id: pastureHorseId,
        location_id: pastureLocationId,
        start_time: pastureStartTime,
        end_time: pastureEndTime,
        days_of_week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }]);
      
      if (!error) {
        setShowPastureModal(false);
        alert('Weidegang schema opgeslagen!');
      } else {
        alert(t('products.alert.error'));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSaveHorse(e: React.FormEvent) {
    e.preventDefault();
    if (!editingHorse || !editingHorse.id) return;
    try {
      await supabase.from('horses').update(editingHorse).eq('id', editingHorse.id);
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
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'daj1lyfgk'}/image/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.secure_url) setEditingHorse(prev => prev ? { ...prev, image_url: data.secure_url } : null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#C2A878]" />
            {t('locations.title')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t('locations.subtitle')}
          </p>
        </div>
        <button onClick={() => setShowLocationModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C2A878] text-white rounded-xl text-sm font-medium hover:bg-[#B0986A] transition-colors">
          <Plus className="w-4 h-4" />
          {t('locations.new')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">{t('locations.forms.loading')}</div>
          ) : locations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">{t('locations.forms.no_locations')}</div>
          ) : (
            locations.map(loc => {
              const locBoxes = boxes.filter(b => b.location_id === loc.id).sort((a, b) => a.box_number.localeCompare(b.box_number));
              const occupied = locBoxes.filter(b => b.horse_id !== null).length;
              
              return (
                <div key={loc.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6 magnetic-card">
                  <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      {loc.image_url ? (
                        <img src={loc.image_url} alt={loc.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#C2A878]/10 flex items-center justify-center border-2 border-white shadow-sm">
                          <Home className="w-6 h-6 text-[#C2A878]" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-slate-900 text-lg">{loc.name}</h2>
                          <button 
                            onClick={() => {
                              setEditingLocation(loc);
                              setLocName(loc.name);
                              setLocType(loc.type);
                              setLocCapacity(loc.capacity.toString());
                              setLocImageUrl(loc.image_url || '');
                              setShowLocationModal(true);
                            }}
                            className="text-slate-400 hover:text-[#C2A878]"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-medium text-slate-500">
                          {loc.type === 'Hoofdstal' ? t('locations.main_stable') : loc.type}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                      {occupied}/{loc.capacity} {t('locations.occupied')}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
                      {locBoxes.map(box => (
                        <div 
                          key={box.id} 
                          onClick={() => {
                            if (box.horse_id) {
                              const h = horses.find(h => h.id === box.horse_id);
                              if (h) {
                                setEditingHorse(h);
                                setShowHorseModal(true);
                              }
                            } else {
                              setAssignBoxId(box.id);
                              setShowAssignModal(true);
                            }
                          }}
                          className={`group relative p-4 rounded-xl border ${box.horse_id ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-dashed border-slate-300'} flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105 cursor-pointer`}
                        >
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingBox(box);
                                setShowBoxEditModal(true);
                              }}
                              className="p-1 text-slate-400 hover:text-[#C2A878]"
                            >
                              <Settings className="w-3 h-3" />
                            </button>
                          </div>
                          <BoxIcon className={`w-6 h-6 ${box.horse_id ? 'text-[#C2A878]' : 'text-slate-300'}`} />
                          <div>
                            <p className="text-xs font-bold text-slate-400">{t('locations.box')} {box.box_number}</p>
                            <p className="text-sm font-medium text-slate-900 truncate w-full px-1 max-w-[80px]">
                              {box.horse?.name || t('locations.empty')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C2A878]/20 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#C2A878]" />
              {t('locations.management.title')}
            </h3>
            <div className="space-y-3">
              <button onClick={() => setShowAssignModal(true)} className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <BoxIcon className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-sm font-medium">{t('locations.management.assign')}</div>
                  <div className="text-xs text-white/50">{t('locations.management.assign_desc')}</div>
                </div>
              </button>
              <button onClick={() => setShowPastureModal(true)} className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-xl p-3 text-left flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm font-medium">{t('locations.management.pasture')}</div>
                  <div className="text-xs text-white/50">{t('locations.management.pasture_desc')}</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODALS */}
      {showBoxEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">Box Aanpassen</h2>
            <form onSubmit={handleSaveBox} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Box Nummer/Naam</label>
                  <input type="text" value={editingBox?.box_number || ''} onChange={e => setEditingBox({...editingBox, box_number: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md" required />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Locatie</label>
                  <select value={editingBox?.location_id || ''} onChange={e => setEditingBox({...editingBox, location_id: e.target.value})} className="w-full p-2 border border-slate-300 rounded-md" required>
                     {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
               </div>
               <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowBoxEditModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">{t('locations.forms.cancel')}</button>
                  <button type="submit" className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">{t('locations.forms.save')}</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{editingLocation ? 'Locatie Aanpassen' : t('locations.forms.new_location')}</h2>
            <form onSubmit={handleSaveLocation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.name')}</label>
                <input required type="text" value={locName} onChange={e => setLocName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.type')}</label>
                <input required type="text" value={locType} onChange={e => setLocType(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.capacity')}</label>
                <input required type="number" min="1" max="100" value={locCapacity} onChange={e => setLocCapacity(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowLocationModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">{t('locations.forms.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">{t('locations.forms.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{t('locations.forms.assign_box')}</h2>
            <form onSubmit={handleAssignBox} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.select_horse')}</label>
                <select required value={assignHorseId} onChange={e => setAssignHorseId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                  <option value="">{t('locations.forms.select_horse')}...</option>
                  {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.select_box')}</label>
                <select required value={assignBoxId} onChange={e => setAssignBoxId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                  <option value="">{t('locations.forms.select_box')}...</option>
                  {boxes.map(b => {
                    const loc = locations.find(l => l.id === b.location_id);
                    return <option key={b.id} value={b.id}>{loc?.name} - Box {b.box_number} {b.horse_id ? '(Bezet)' : '(Vrij)'}</option>;
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

      {showPastureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{t('locations.forms.pasture_title')}</h2>
            <form onSubmit={handlePastureSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('locations.forms.select_horse')}</label>
                <select required value={pastureHorseId} onChange={e => setPastureHorseId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                  <option value="">{t('locations.forms.select_horse')}...</option>
                  {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Locatie (Paddock/Weide)</label>
                <select required value={pastureLocationId} onChange={e => setPastureLocationId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                  <option value="">Selecteer locatie...</option>
                  {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('locations.forms.start_time')}</label>
                  <input required type="time" value={pastureStartTime} onChange={e => setPastureStartTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('locations.forms.end_time')}</label>
                  <input required type="time" value={pastureEndTime} onChange={e => setPastureEndTime(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowPastureModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">{t('locations.forms.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">{t('locations.forms.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Horse Edit Modal */}
      {showHorseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">Bewerk Paard</h2>
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
                <button type="button" onClick={() => setShowHorseModal(false)} className="px-4 py-2 bg-slate-100 rounded-lg">Annuleren</button>
                <button type="submit" className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">Opslaan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
