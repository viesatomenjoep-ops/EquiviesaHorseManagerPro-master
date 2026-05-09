import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { 
  Wheat, 
  Link as LinkIcon, 
  Search,
  Plus,
  ShoppingCart,
  AlertCircle,
  Truck,
  Droplets,
  X,
  Package
} from 'lucide-react';

export function FeedingView() {
  const { t } = useTranslation();
  
  // Data state
  const [horses, setHorses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [rations, setRations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [showRationModal, setShowRationModal] = useState(false);

  // Magic Link state
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);

  // New Product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdStock, setNewProdStock] = useState('0');
  const [newProdUnit, setNewProdUnit] = useState('kg');

  // New Ration form
  const [selectedHorseId, setSelectedHorseId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [newRationQty, setNewRationQty] = useState('');
  const [newRationTime, setNewRationTime] = useState('morning');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const [horsesRes, productsRes, rationsRes] = await Promise.all([
        supabase.from('horses').select('id, name'),
        supabase.from('feed_products').select('*'),
        supabase.from('horse_rations').select(`
          id, quantity, time_of_day, 
          horse_id, product_id,
          horses (name),
          feed_products (name)
        `)
      ]);
      
      if (horsesRes.data) setHorses(horsesRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      if (rationsRes.data) setRations(rationsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // SCRAPING MOCK
  const handleScrape = async () => {
    if (!url) return;
    setIsScraping(true);
    
    // Simulate scraping delay
    setTimeout(async () => {
      // Mock scraped product
      const scrapedName = url.includes('pavo') ? 'Pavo SportsFit' : url.includes('agradi') ? 'Agradi HealthMash' : 'Scraped Product';
      
      try {
        await supabase.from('feed_products').insert({
          name: scrapedName,
          brand: 'Imported',
          category: 'feed',
          stock_quantity: 0,
          unit: 'kg',
          source_url: url
        });
        
        setIsScraping(false);
        setUrl('');
        alert(t('feeding.magic_link.success') || 'Product successfully imported!');
        fetchData(); // reload
      } catch (err) {
        console.error(err);
        setIsScraping(false);
      }
    }, 2000);
  };

  // MANUAL PRODUCT
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('feed_products').insert({
        name: newProdName,
        brand: newProdBrand,
        stock_quantity: parseFloat(newProdStock) || 0,
        unit: newProdUnit
      });
      setShowProductModal(false);
      setNewProdName('');
      setNewProdBrand('');
      setNewProdStock('0');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // NEW RATION
  const handleAddRation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHorseId || !selectedProductId) return;
    try {
      await supabase.from('horse_rations').insert({
        horse_id: selectedHorseId,
        product_id: selectedProductId,
        quantity: parseFloat(newRationQty) || 0,
        time_of_day: newRationTime
      });
      setShowRationModal(false);
      setNewRationQty('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Grouperen van rations per paard voor weergave
  const groupedRations: Record<string, any[]> = {};
  rations.forEach(r => {
    const hName = r.horses?.name || 'Unknown Horse';
    if (!groupedRations[hName]) groupedRations[hName] = [];
    groupedRations[hName].push({
      name: r.feed_products?.name || 'Unknown Product',
      amount: `${r.quantity} kg`, // simplificatie
      time: r.time_of_day
    });
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wheat className="w-6 h-6 text-[#C2A878]" />
            {t('feeding.title')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t('feeding.subtitle')}
          </p>
        </div>
        <button 
          onClick={() => setShowProductModal(true)}
          className="bg-[#111111] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 transition-colors"
        >
          <Package className="w-4 h-4" /> Voeg Product Toe
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rations per horse */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-slate-900">{t('feeding.rations.title')}</h2>
              <button onClick={() => setShowRationModal(true)} className="flex items-center gap-1 text-sm text-[#C2A878] font-bold hover:text-[#B0986A] bg-[#C2A878]/10 px-3 py-1.5 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                {t('feeding.rations.new')}
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {isLoading ? (
                <div className="p-8 text-center text-slate-400">Laden...</div>
              ) : Object.keys(groupedRations).length === 0 ? (
                <div className="p-8 text-center text-slate-500">Nog geen voerschema's aangemaakt.</div>
              ) : (
                Object.entries(groupedRations).map(([horseName, feeds], idx) => (
                  <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-slate-900 text-lg">{horseName}</h3>
                      <button className="text-slate-400 hover:text-[#C2A878] text-sm font-medium">{t('feeding.rations.edit')}</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feeds.map((feed, fIdx) => (
                        <div key={fIdx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                              <Wheat className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{feed.name}</p>
                              <p className="text-xs text-slate-500 capitalize">{feed.time}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#C2A878] bg-[#C2A878]/10 px-2 py-1 rounded-md">{feed.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Magic Link Scraper Block */}
          <div className="bg-gradient-to-br from-[#C2A878] to-[#B0986A] rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              {t('feeding.magic_link.title')}
            </h3>
            <p className="text-sm text-white/80 mb-4">
              {t('feeding.magic_link.desc')}
            </p>
            <div className="space-y-3 relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('feeding.magic_link.placeholder')}
                  className="w-full pl-4 pr-4 py-3 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button 
                onClick={handleScrape}
                disabled={isScraping || !url}
                className="w-full bg-white text-[#C2A878] font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isScraping ? t('feeding.magic_link.loading') : t('feeding.magic_link.btn')}
              </button>
            </div>
          </div>

          {/* Voorraad / Inventory Block */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-slate-500" /> Voorraad
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {products.length === 0 && !isLoading && (
                <p className="text-sm text-slate-500 text-center">Geen producten op voorraad.</p>
              )}
              {products.map(prod => {
                const isLow = prod.stock_quantity <= (prod.min_stock_warning || 20);
                return (
                  <div key={prod.id} className={`p-3 rounded-xl border ${isLow ? 'border-red-200 bg-red-50' : 'border-slate-100 bg-white'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                        <p className="text-xs text-slate-500">{prod.brand}</p>
                      </div>
                      {isLow && <AlertCircle className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-sm font-bold ${isLow ? 'text-red-600' : 'text-slate-700'}`}>
                        {prod.stock_quantity} {prod.unit} left
                      </span>
                      {isLow && (
                        <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold hover:bg-red-200">
                          Bestel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL: NEW MANUAL PRODUCT */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Nieuw Product Toevoegen</h3>
              <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Productnaam</label>
                <input required type="text" value={newProdName} onChange={e=>setNewProdName(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg" placeholder="Bijv. SportsFit" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Merk</label>
                <input type="text" value={newProdBrand} onChange={e=>setNewProdBrand(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg" placeholder="Bijv. Pavo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Huidige Voorraad</label>
                  <input type="number" step="0.1" value={newProdStock} onChange={e=>setNewProdStock(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Eenheid</label>
                  <select value={newProdUnit} onChange={e=>setNewProdUnit(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg">
                    <option value="kg">kg</option>
                    <option value="liters">liters</option>
                    <option value="stuks">stuks</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full mt-4 bg-[#111111] hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors">
                Opslaan in Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW SCHEDULE/RATION */}
      {showRationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Nieuw Voerschema</h3>
              <button onClick={() => setShowRationModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddRation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Selecteer Paard</label>
                <select required value={selectedHorseId} onChange={e=>setSelectedHorseId(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg">
                  <option value="">Kies een paard...</option>
                  {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product / Voer</label>
                <select required value={selectedProductId} onChange={e=>setSelectedProductId(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg">
                  <option value="">Kies een product...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hoeveelheid</label>
                  <input required type="number" step="0.1" value={newRationQty} onChange={e=>setNewRationQty(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg" placeholder="Bijv 1.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Moment</label>
                  <select value={newRationTime} onChange={e=>setNewRationTime(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-lg">
                    <option value="morning">Ochtend</option>
                    <option value="afternoon">Middag</option>
                    <option value="evening">Avond</option>
                    <option value="continuous">Doorlopend</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full mt-4 bg-[#C2A878] hover:bg-[#B0986A] text-white font-bold py-3 rounded-xl transition-colors">
                Voeg toe aan schema
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
