import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Wheat, 
  Link as LinkIcon, 
  Search,
  Plus,
  ShoppingCart,
  AlertCircle,
  Truck,
  Droplets
} from 'lucide-react';

export function FeedingView() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);

  const handleScrape = () => {
    if (!url) return;
    setIsScraping(true);
    // Simulate scraping delay
    setTimeout(() => {
      setIsScraping(false);
      setUrl('');
      // In a real app, this would populate a new product block
      alert(t('feeding.magic_link.success'));
    }, 2000);
  };

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rations per horse */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-slate-900">{t('feeding.rations.title')}</h2>
              <button className="text-sm text-[#C2A878] font-medium hover:text-[#B0986A]">
                {t('feeding.rations.new')}
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { horse: 'Luna', feeds: [{ name: 'Pavo SportsFit', amount: '2 kg', time: t('feeding.rations.morning') }, { name: 'Hooi (Eerste Snee)', amount: '6 kg', time: t('feeding.rations.continuous') }] },
                { horse: 'Don Juan', feeds: [{ name: 'Havens Draversbrok', amount: '1.5 kg', time: t('feeding.rations.evening') }, { name: 'Lucerne', amount: '0.5 kg', time: t('feeding.rations.morning') }] }
              ].map((ration, idx) => (
                <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-900 text-lg">{ration.horse}</h3>
                    <button className="text-slate-400 hover:text-[#C2A878]">{t('feeding.rations.edit')}</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ration.feeds.map((feed, fIdx) => (
                      <div key={fIdx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                            <Wheat className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{feed.name}</p>
                            <p className="text-xs text-slate-500">{feed.time}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#C2A878]">{feed.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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

          {/* Voorraad Waarschuwingen */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-red-50 border-b border-red-100 flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-bold">{t('feeding.inventory.title')}</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-medium text-slate-900">Pavo SportsFit</h4>
                  <p className="text-sm text-slate-500">{t('feeding.inventory.low')}</p>
                </div>
                <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
