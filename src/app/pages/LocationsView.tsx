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
        supabase.from('horses').select('id, name')
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

  async function handleAddLocation(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('locations').insert([{
        name: locName,
        type: locType,
        capacity: parseInt(locCapacity),
        image_url: locImageUrl || null
      }]).select();

      if (!error && data) {
        setLocations([...locations, data[0]]);
        
        // Auto-create boxes for the new location
        const newBoxes = Array.from({ length: parseInt(locCapacity) }).map((_, i) => ({
          location_id: data[0].id,
          box_number: `A${i + 1}`,
          status: 'available'
        }));
        
        const boxRes = await supabase.from('boxes').insert(newBoxes).select();
        if (boxRes.data) {
          setBoxes([...boxes, ...boxRes.data]);
        }
        
        setShowLocationModal(false);
        setLocName('');
        setLocImageUrl('');
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
                        <h2 className="font-bold text-slate-900 text-lg">{loc.name}</h2>
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
                        <div key={box.id} className={`p-4 rounded-xl border ${box.horse_id ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-dashed border-slate-300'} flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105 cursor-pointer`}>
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
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">{t('locations.forms.new_location')}</h2>
            <form onSubmit={handleAddLocation} className="space-y-4">
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
    </div>
  );
}
