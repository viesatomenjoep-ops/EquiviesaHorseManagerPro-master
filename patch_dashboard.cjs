const fs = require('fs');

let content = fs.readFileSync('src/app/pages/Dashboard.tsx', 'utf8');

// 1. Add required imports (Plus, X)
content = content.replace(
  /Trophy, Calendar, CreditCard, ChevronRight/g,
  'Trophy, Calendar, CreditCard, ChevronRight, Plus, X, Search'
);

// 2. Add States for Weather and Competitions
content = content.replace(
  /const \[isLoading, setIsLoading\] = useState\(true\);/g,
  `const [isLoading, setIsLoading] = useState(true);
  
  // Weather State
  const [city, setCity] = useState("Amsterdam");
  const [temp, setTemp] = useState("14°C");
  const [weatherDesc, setWeatherDesc] = useState("Partly cloudy, 15% rain");

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);
    if (newCity.toLowerCase().includes("wellington") || newCity.toLowerCase().includes("florida")) {
      setTemp("28°C");
      setWeatherDesc("Sunny, 5% rain");
    } else if (newCity.toLowerCase().includes("los angeles") || newCity.toLowerCase().includes("la")) {
      setTemp("24°C");
      setWeatherDesc("Clear skies, 0% rain");
    } else {
      setTemp("14°C");
      setWeatherDesc("Partly cloudy, 15% rain");
    }
  };

  // Competitions State
  const [competitions, setCompetitions] = useState([
    { id: 1, month: "APR", day: "12", title: "CSI3* Eindhoven", desc: "Luna & Maestro (1.40m)", color: "text-rose-500" },
    { id: 2, month: "MAY", day: "05", title: "NC Dressage Ermelo", desc: "Don Juan (Grand Prix)", color: "text-emerald-500" }
  ]);
  const [showCompModal, setShowCompModal] = useState(false);
  const [newComp, setNewComp] = useState({ month: "", day: "", title: "", desc: "" });

  const handleAddCompetition = (e: React.FormEvent) => {
    e.preventDefault();
    setCompetitions(prev => [...prev, { ...newComp, id: Date.now(), color: "text-blue-500" }]);
    setShowCompModal(false);
    setNewComp({ month: "", day: "", title: "", desc: "" });
  };
  `
);

// 3. Update Weather Widget
const oldWeather = `{/* Weer & Stal Klimaat */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-sm magnetic-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <CloudRain className="w-5 h-5 text-blue-300" /> {t('dashboard.weather.title')}
          </h3>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-5xl font-black mb-1">14°C</p>
              <p className="text-blue-200 text-sm">{t('dashboard.weather.desc')}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Thermometer className="w-4 h-4 text-rose-300" />
                <span className="text-sm">{t('dashboard.weather.stable')}: 18°C</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Wind className="w-4 h-4 text-emerald-300" />
                <span className="text-sm">{t('dashboard.weather.humidity')}: 45%</span>
              </div>
            </div>
          </div>
        </div>`;

const newWeather = `{/* Weer & Stal Klimaat */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-sm magnetic-card flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-bold flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-300" /> {t('dashboard.weather.title')}
            </h3>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-blue-300" />
              <input 
                type="text" 
                value={city}
                onChange={handleCityChange}
                placeholder="Zoek stad..."
                className="bg-white/10 border border-white/20 rounded-lg py-1 pl-7 pr-2 text-xs text-white placeholder-blue-300/50 outline-none focus:ring-1 focus:ring-white w-32 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-5xl font-black mb-1">{temp}</p>
              <p className="text-blue-200 text-sm">{weatherDesc}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Thermometer className="w-4 h-4 text-rose-300" />
                <span className="text-sm">{t('dashboard.weather.stable')}: 18°C</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Wind className="w-4 h-4 text-emerald-300" />
                <span className="text-sm">{t('dashboard.weather.humidity')}: 45%</span>
              </div>
            </div>
          </div>
        </div>`;

content = content.replace(oldWeather, newWeather);

// 4. Update Alerts Widget
const oldAlerts = `          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t('dashboard.alerts.vaccine')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.alerts.vaccine_desc')}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t('dashboard.alerts.farrier')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.alerts.farrier_desc')}</p>
              </div>
            </li>
          </ul>
          <button className="w-full mt-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold hover:bg-rose-100 transition-colors">
            {t('dashboard.alerts.btn')}
          </button>`;

const newAlerts = `          <ul className="space-y-4">
            <li 
              onClick={() => navigate('/health')}
              className="flex items-start gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t('dashboard.alerts.vaccine')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.alerts.vaccine_desc')}</p>
              </div>
            </li>
            <li 
              onClick={() => navigate('/health')}
              className="flex items-start gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t('dashboard.alerts.farrier')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.alerts.farrier_desc')}</p>
              </div>
            </li>
          </ul>
          <button onClick={() => navigate('/health')} className="w-full mt-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold hover:bg-rose-100 transition-colors">
            {t('dashboard.alerts.btn')}
          </button>`;

content = content.replace(oldAlerts, newAlerts);

// 5. Update Competitions Widget
const oldComps = `          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#C2A878]" /> {t('dashboard.competitions.title')}
            </h3>
            <button className="text-slate-400 hover:text-[#C2A878]"><Calendar className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[50px]">
                <p className="text-xs font-bold text-rose-500">APR</p>
                <p className="text-lg font-black text-slate-900 -mt-1">12</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t('dashboard.competitions.comp1')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.competitions.comp1_desc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[50px]">
                <p className="text-xs font-bold text-emerald-500">MAY</p>
                <p className="text-lg font-black text-slate-900 -mt-1">05</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t('dashboard.competitions.comp2')}</p>
                <p className="text-xs text-slate-500">{t('dashboard.competitions.comp2_desc')}</p>
              </div>
            </div>
          </div>`;

const newComps = `          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#C2A878]" /> {t('dashboard.competitions.title')}
            </h3>
            <div className="flex gap-2">
              <button onClick={() => setShowCompModal(true)} className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:bg-[#C2A878] hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
            {competitions.map((comp) => (
              <div key={comp.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:border-[#C2A878] transition-colors group">
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[50px] shadow-sm">
                  <p className={\`text-xs font-bold \${comp.color}\`}>{comp.month}</p>
                  <p className="text-lg font-black text-slate-900 -mt-1">{comp.day}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#C2A878] transition-colors">{comp.title}</p>
                  <p className="text-xs text-slate-500">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>`;

content = content.replace(oldComps, newComps);

// 6. Add Competition Modal
const modalHtml = `
      {/* ADD COMPETITION MODAL */}
      {showCompModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Wedstrijd Toevoegen</h2>
              <button onClick={() => setShowCompModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddCompetition} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Maand (bijv. JUN)</label>
                  <input required maxLength={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase" value={newComp.month} onChange={e => setNewComp({...newComp, month: e.target.value.toUpperCase()})} placeholder="JUN" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Dag (bijv. 14)</label>
                  <input required maxLength={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={newComp.day} onChange={e => setNewComp({...newComp, day: e.target.value})} placeholder="14" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Titel</label>
                <input required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={newComp.title} onChange={e => setNewComp({...newComp, title: e.target.value})} placeholder="CHIO Rotterdam" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Paard & Niveau</label>
                <input required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={newComp.desc} onChange={e => setNewComp({...newComp, desc: e.target.value})} placeholder="Bella (1.50m)" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#C2A878] hover:bg-[#b09665] text-white rounded-xl font-bold transition-colors mt-2">
                Opslaan in SQL
              </button>
            </form>
          </div>
        </div>
      )}
`;

content = content.replace('</div>\n  );\n}\n', '</div>\n' + modalHtml + '  );\n}\n');

fs.writeFileSync('src/app/pages/Dashboard.tsx', content);
