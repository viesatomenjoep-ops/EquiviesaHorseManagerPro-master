import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { 
  Dna,
  Microscope,
  Baby,
  Calendar,
  Plus,
  Search,
  Activity,
  Snowflake,
  TrendingUp,
  Syringe,
  ClipboardList,
  Link as LinkIcon,
  Truck,
  DollarSign
} from 'lucide-react';

export function BreedingView() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeSubModule, setActiveSubModule] = useState<string>('overview');
  const [items, setItems] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // New Form states
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDate, setNewItemDate] = useState(new Date().toISOString().split('T')[0]);
  const [newItemNotes, setNewItemNotes] = useState('');
  const [newItemMedia, setNewItemMedia] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Determine which of the 4 main modules we are in based on the URL
  const path = location.pathname;
  let moduleName = "";
  let moduleDesc = "";
  let icon = Dna;
  let colorClass = "text-rose-500";
  let bgClass = "bg-rose-50";
  
  if (path.includes('mares')) {
    moduleName = t('breeding.title_mares');
    moduleDesc = t('breeding.desc_mares');
    icon = Dna;
    colorClass = "text-rose-500";
    bgClass = "bg-rose-50";
  } else if (path.includes('embryos')) {
    moduleName = t('breeding.title_embryos');
    moduleDesc = t('breeding.desc_embryos');
    icon = Microscope;
    colorClass = "text-blue-500";
    bgClass = "bg-blue-50";
  } else if (path.includes('foals')) {
    moduleName = t('breeding.title_foals');
    moduleDesc = t('breeding.desc_foals');
    icon = Baby;
    colorClass = "text-emerald-500";
    bgClass = "bg-emerald-50";
  } else if (path.includes('stallions')) {
    moduleName = t('breeding.title_stallions');
    moduleDesc = t('breeding.desc_stallions');
    icon = TrendingUp;
    colorClass = "text-purple-500";
    bgClass = "bg-purple-50";
  }

  const MainIcon = icon;

  // Define the sub-blocks for EACH specific module
  const getSubBlocks = () => {
    if (path.includes('mares')) return [
      { id: 'cycles', name: t('breeding.blocks.cycles'), icon: Activity, count: 12 },
      { id: 'scans', name: t('breeding.blocks.scans'), icon: Microscope, count: 4 },
      { id: 'treatments', name: t('breeding.blocks.treatments'), icon: Syringe, count: 2 },
      { id: 'magic', name: t('breeding.blocks.magic'), icon: LinkIcon, count: 1 }
    ];
    if (path.includes('embryos')) return [
      { id: 'flushes', name: t('breeding.blocks.flushes'), icon: Activity, count: 5 },
      { id: 'storage', name: t('breeding.blocks.storage'), icon: Snowflake, count: 18 },
      { id: 'transfers', name: t('breeding.blocks.transfers'), icon: Dna, count: 3 }
    ];
    if (path.includes('foals')) return [
      { id: 'registration', name: t('breeding.blocks.registration'), icon: ClipboardList, count: 6 },
      { id: 'health', name: t('breeding.blocks.health'), icon: Activity, count: 14 },
      { id: 'training', name: t('breeding.blocks.training'), icon: Activity, count: 8 }
    ];
    if (path.includes('stallions')) return [
      { id: 'collections', name: t('breeding.blocks.collections'), icon: Microscope, count: 22 },
      { id: 'shipping', name: t('breeding.blocks.shipping'), icon: Truck, count: 9 },
      { id: 'fees', name: t('breeding.blocks.fees'), icon: DollarSign, count: 4 }
    ];
    return [];
  };

  const subBlocks = getSubBlocks();

  useEffect(() => {
    fetchItems();
  }, [activeSubModule, path]);

  async function fetchItems() {
    let category = '';
    if (path.includes('mares')) category = 'mares';
    if (path.includes('embryos')) category = 'embryos';
    if (path.includes('foals')) category = 'foals';
    if (path.includes('stallions')) category = 'stallions';

    if (category) {
      try {
        const { data } = await supabase.from('breeding_records')
          .select('*')
          .eq('category', category)
          .eq('sub_category', activeSubModule)
          .order('created_at', { ascending: false });
        setItems(data || []);
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setNewItemMedia(data.secure_url);
      }
    } catch (err) {
      console.error('Error uploading media:', err);
    } finally {
      setIsUploading(false);
    }
  };

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    let category = '';
    if (path.includes('mares')) category = 'mares';
    if (path.includes('embryos')) category = 'embryos';
    if (path.includes('foals')) category = 'foals';
    if (path.includes('stallions')) category = 'stallions';

    try {
      const { error } = await supabase.from('breeding_records').insert({
        category,
        sub_category: activeSubModule,
        title: newItemTitle || 'Nieuw Item',
        date: newItemDate,
        notes: newItemNotes,
        media_url: newItemMedia,
        status: 'active'
      });
      if (!error) {
        setShowAddForm(false);
        setNewItemTitle('');
        setNewItemNotes('');
        setNewItemMedia('');
        fetchItems();
      } else {
        alert(t('products.alert.error'));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header for this specific Breeding Module */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <div className={`p-4 rounded-2xl ${bgClass}`}>
          <MainIcon className={`w-8 h-8 ${colorClass}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{moduleName}</h1>
          <p className="text-slate-500 mt-1">{moduleDesc}</p>
        </div>
      </div>

      {/* Sub-Blocks Grid (Only for THIS module) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subBlocks.map(block => {
          const BlockIcon = block.icon;
          const isActive = activeSubModule === block.id;
          return (
            <button 
              key={block.id}
              onClick={() => setActiveSubModule(block.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
                isActive 
                ? 'bg-black text-[#C2A878] border-black shadow-lg scale-105' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#C2A878] hover:shadow-md'
              }`}
            >
              <BlockIcon className={`w-8 h-8 mb-4 ${isActive ? 'text-[#C2A878]' : 'text-slate-400'}`} />
              <h3 className="font-bold text-center">{block.name}</h3>
              <span className={`mt-2 text-xs px-3 py-1 rounded-full ${isActive ? 'bg-[#C2A878]/20' : 'bg-slate-100 text-slate-500'}`}>
                {block.count} {t('breeding.items')}
              </span>
            </button>
          )
        })}
      </div>

      {/* Data Grid Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('breeding.search', { sub: subBlocks.find(b => b.id === activeSubModule)?.name || 'overzicht' })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow"
            />
          </div>
          <button onClick={() => setShowAddForm(true)} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-slate-800 text-[#C2A878] rounded-xl font-bold text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            {t('breeding.add_item')}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddItem} className="mb-6 p-6 border border-slate-200 rounded-2xl bg-slate-50 space-y-4">
             <h3 className="font-bold text-lg text-slate-900">{t('breeding.add_new')} - {subBlocks.find(b => b.id === activeSubModule)?.name}</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-bold text-slate-900 mb-1">Titel</label>
                 <input type="text" value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} required className="w-full p-2 border border-slate-300 rounded-md text-slate-900" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-900 mb-1">Datum</label>
                 <input type="date" value={newItemDate} onChange={e => setNewItemDate(e.target.value)} required className="w-full p-2 border border-slate-300 rounded-md text-slate-900" />
               </div>
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-900 mb-1">Notities</label>
               <textarea value={newItemNotes} onChange={e => setNewItemNotes(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md h-24 text-slate-900" />
             </div>

             <div>
               <label className="block text-sm font-bold text-slate-900 mb-1">Media (PDF / Afbeelding)</label>
               {newItemMedia && (
                 <div className="mb-2 text-sm text-emerald-600 font-bold break-all">✓ Bestand geüpload: {newItemMedia}</div>
               )}
               <input type="file" onChange={handleMediaUpload} disabled={isUploading} className="text-sm w-full text-slate-900" />
               {isUploading && <p className="text-xs text-[#C2A878] mt-1 font-bold animate-pulse">Aan het uploaden naar Cloudinary...</p>}
             </div>

             <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
               <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700">{t('breeding.cancel')}</button>
               <button type="submit" disabled={isUploading} className="px-4 py-2 bg-[#C2A878] text-white rounded-lg disabled:opacity-50">{t('breeding.save')}</button>
             </div>
          </form>
        )}

        {/* Database list rendering */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div key={item.id || i} className="p-6 rounded-2xl border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {item.title || t('breeding.cycle_start')}
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">{item.date || 'N/A'}</p>
                    {item.notes && <p className="text-slate-600 text-sm mt-2">{item.notes}</p>}
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${bgClass} ${colorClass}`}>
                    {item.status || t('breeding.active')}
                  </span>
                </div>
                {item.media_url && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <a href={item.media_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#C2A878] hover:text-[#B0986A] flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" />
                      Bekijk Media/Document
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all cursor-pointer opacity-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {activeSubModule === 'overview' ? t('breeding.select_category') : `${subBlocks.find(b => b.id === activeSubModule)?.name} ${t('breeding.item_dummy')} #${i} ${t('breeding.dummy')}`}
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">{t('breeding.status')}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${bgClass} ${colorClass}`}>
                    {t('breeding.active')}
                  </span>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('breeding.date')}</p>
                      <p className="text-sm font-bold text-slate-900">{t('breeding.today')}</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                    <Activity className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('breeding.action')}</p>
                      <p className="text-sm font-bold text-slate-900">{t('breeding.action_req')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
