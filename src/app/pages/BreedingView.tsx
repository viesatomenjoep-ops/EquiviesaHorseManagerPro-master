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
    // Only attempt to fetch if it's 'cycles' for mares as a proof of SQL concept
    if (path.includes('mares') && activeSubModule === 'cycles') {
      try {
        const { data } = await supabase.from('breeding_mare_cycles').select('*');
        setItems(data || []);
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems([]);
    }
  }

  async function handleAddItem() {
    if (path.includes('mares') && activeSubModule === 'cycles') {
      try {
        const { error } = await supabase.from('breeding_mare_cycles').insert({
          start_date: new Date().toISOString().split('T')[0],
          status: 'in_heat'
        });
        if (!error) {
          setShowAddForm(false);
          fetchItems();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert(t('breeding.demo_notice'));
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
          <div className="mb-6 p-6 border border-slate-200 rounded-2xl">
             <h3 className="font-bold mb-4">{t('breeding.add_new')}</h3>
             <button onClick={handleAddItem} className="px-4 py-2 bg-[#C2A878] text-white rounded-lg">{t('breeding.save')}</button>
             <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-100 ml-2 rounded-lg">{t('breeding.cancel')}</button>
          </div>
        )}

        {/* Database list rendering */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div key={item.id || i} className="p-6 rounded-2xl border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {t('breeding.cycle_start')}: {item.start_date || 'N/A'}
                    </h4>
                    <p className="text-slate-500 text-sm mt-1">{t('breeding.status')}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${bgClass} ${colorClass}`}>
                    {item.status || t('breeding.active')}
                  </span>
                </div>
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
