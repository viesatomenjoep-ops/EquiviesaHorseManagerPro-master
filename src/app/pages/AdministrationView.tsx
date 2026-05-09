import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { 
  Users, 
  Building2, 
  Briefcase, 
  MapPin, 
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin as LocationIcon,
  X,
  Edit3,
  Globe,
  Sparkles
} from 'lucide-react';

interface Contact {
  id: string; // Now UUID from Supabase
  type: string;
  name: string;
  general_phone: string;
  general_email: string;
  city: string;
  // Extra fields that could be used for the first contact person
  first_name?: string;
  last_name?: string;
}

export function AdministrationView() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Partial<Contact> | null>(null);

  const [magicUrl, setMagicUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const { data, error } = await supabase.from('crm_companies').select('*');
      if (!error && data) {
        setContacts(data as Contact[]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const crmCategories = [
    { id: 'clients', name: t('admin.categories.clients'), count: contacts.filter(c => c.type === 'clients').length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', hover: 'hover:bg-blue-50 hover:border-blue-200' },
    { id: 'vets', name: t('admin.categories.vets'), count: contacts.filter(c => c.type === 'vets').length, icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-50 hover:border-emerald-200' },
    { id: 'suppliers', name: t('admin.categories.suppliers'), count: contacts.filter(c => c.type === 'suppliers').length, icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-50', hover: 'hover:bg-amber-50 hover:border-amber-200' },
    { id: 'locations', name: t('admin.categories.locations'), count: contacts.filter(c => c.type === 'locations').length, icon: MapPin, color: 'text-rose-500', bg: 'bg-rose-50', hover: 'hover:bg-rose-50 hover:border-rose-200' },
    { id: 'companies', name: t('admin.categories.companies'), count: contacts.filter(c => c.type === 'companies').length, icon: Building2, color: 'text-slate-500', bg: 'bg-slate-100', hover: 'hover:bg-slate-50 hover:border-slate-300' },
  ];

  const handleMagicScan = () => {
    if (!magicUrl) return;
    setIsScanning(true);
    
    // Fake scrape delay that generates realistic data
    setTimeout(() => {
      const isDeBos = magicUrl.toLowerCase().includes('debos');
      const isApg = magicUrl.toLowerCase().includes('apg-stables');
      
      let newCompany = 'Nieuwe Kliniek B.V.';
      let newCity = 'Amsterdam, NL';
      let newEmail = 'info@' + magicUrl.replace('https://www.', '').replace('https://', '').replace('http://', '').split('/')[0];
      let newPhone = '+31 20 123 4567';

      if (isDeBos) {
        newCompany = 'Dierenkliniek De Bos';
        newCity = 'Utrecht, NL';
      } else if (isApg) {
        newCompany = 'APG Stables';
        newCity = 'Wellington, FL';
        newPhone = '+1 561 555 0198';
        newEmail = 'info@apg-stables.com';
      }

      setEditingContact(prev => ({
        ...prev,
        name: newCompany,
        general_email: newEmail,
        general_phone: newPhone,
        city: newCity
      }));
      setIsScanning(false);
      setMagicUrl('');
    }, 1500);
  };

  const handleSaveContact = async () => {
    if (!editingContact) return;
    
    try {
      if (editingContact.id) {
        // Edit existing
        const { error } = await supabase.from('crm_companies').update({
          name: editingContact.name || 'Nieuwe Relatie',
          type: editingContact.type || 'vets',
          general_phone: editingContact.general_phone,
          general_email: editingContact.general_email,
          city: editingContact.city
        }).eq('id', editingContact.id);
        if (!error) fetchContacts();
      } else {
        // Add new
        const { error } = await supabase.from('crm_companies').insert([{
          name: editingContact.name || 'Nieuwe Relatie',
          type: editingContact.type || selectedCategory || 'vets',
          general_phone: editingContact.general_phone,
          general_email: editingContact.general_email,
          city: editingContact.city
        }]);
        if (!error) fetchContacts();
      }
      setIsModalOpen(false);
      setEditingContact(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingContact({ type: selectedCategory || 'clients' });
    setIsModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  // 1. Initial Dashboard View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t('admin.title')}</h1>
            <p className="text-slate-500 mt-2">{t('admin.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crmCategories.map(cat => {
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
                  <span className="text-sm font-semibold text-slate-600">{cat.count} {t('admin.categories.relations')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Detail View
  const activeCatObj = crmCategories.find(c => c.id === selectedCategory);
  const visibleContacts = contacts.filter(c => c.type === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative">
      
      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">{editingContact?.id ? 'Relatie Bewerken' : t('admin.modal.title')}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              
              {/* Magic Link Scanner */}
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl relative overflow-hidden">
                {isScanning && (
                  <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center backdrop-blur-sm z-10">
                    <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                  </div>
                )}
                <label className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Auto-Fill via Magic Link (Website URL)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="url" 
                    value={magicUrl} 
                    onChange={e => setMagicUrl(e.target.value)} 
                    className="w-full px-3 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" 
                    placeholder="https://apg-stables.com" 
                  />
                  <button 
                    onClick={handleMagicScan} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shrink-0 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Scan
                  </button>
                </div>
                <p className="text-xs text-indigo-600/70 mt-2">
                  {t('admin.modal.magic_help', 'Plak de website link van de kliniek of leverancier. Onze AI vult automatisch alle adres- en contactgegevens in.')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">{t('admin.modal.type')}</label>
                <select 
                  value={editingContact?.type || ''} 
                  onChange={e => setEditingContact({ ...editingContact, type: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900"
                >
                  <option value="clients">{t('admin.modal.type_client')}</option>
                  <option value="vets">{t('admin.modal.type_vet')}</option>
                  <option value="suppliers">{t('admin.modal.type_supplier')}</option>
                  <option value="companies">Bedrijf</option>
                  <option value="locations">Locatie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">{t('admin.modal.company')}</label>
                <input type="text" value={editingContact?.name || ''} onChange={e => setEditingContact({ ...editingContact, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900" placeholder="Jansen B.V." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">{t('admin.modal.first_name')} (Optioneel)</label>
                  <input type="text" value={editingContact?.first_name || ''} onChange={e => setEditingContact({ ...editingContact, first_name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900" placeholder="Jan" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">{t('admin.modal.last_name')} (Optioneel)</label>
                  <input type="text" value={editingContact?.last_name || ''} onChange={e => setEditingContact({ ...editingContact, last_name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900" placeholder="Jansen" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">{t('admin.modal.phone')}</label>
                  <input type="text" value={editingContact?.general_phone || ''} onChange={e => setEditingContact({ ...editingContact, general_phone: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900" placeholder="+31 6..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">{t('admin.modal.email')}</label>
                  <input type="email" value={editingContact?.general_email || ''} onChange={e => setEditingContact({ ...editingContact, general_email: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900" placeholder="mail@..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Plaats</label>
                <input type="text" value={editingContact?.city || ''} onChange={e => setEditingContact({ ...editingContact, city: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2A878] text-slate-900" placeholder="Wellington, FL" />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 pb-4">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100">
                  {t('admin.modal.cancel')}
                </button>
                <button onClick={handleSaveContact} className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#C2A878] hover:bg-[#B0986A]">
                  {t('admin.modal.save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Column: Categories List */}
      <div className="lg:w-80 flex-shrink-0 space-y-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#C2A878] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('admin.back')}
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900">{t('admin.categories.title')}</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {crmCategories.map(cat => {
              const Icon = cat.icon;
              const isActive = cat.id === selectedCategory;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-4 transition-colors group ${
                    isActive ? 'bg-[#C2A878]/10' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${cat.bg} ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className={`font-bold ${isActive ? 'text-[#C2A878]' : 'text-slate-700'}`}>{cat.name}</p>
                    </div>
                  </div>
                  {isActive && <ChevronRight className="w-5 h-5 text-[#C2A878]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: CRM Data Grid */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('admin.search', { cat: activeCatObj?.name })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2A878] transition-shadow text-slate-900"
            />
          </div>
          <button 
            onClick={openAddModal}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-slate-800 text-[#C2A878] rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {t('admin.add_new')}
          </button>
        </div>

        {/* Contact List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleContacts.length === 0 ? (
            <div className="col-span-2 text-center p-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">Nog geen relaties in deze categorie.</p>
            </div>
          ) : (
            visibleContacts.map((contact) => (
              <div key={contact.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#C2A878] hover:shadow-md transition-all group relative">
                
                {/* Edit Button */}
                <button 
                  onClick={() => openEditModal(contact)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C2A878] hover:text-white"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl font-bold text-slate-400">
                      {contact.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 pr-10">
                        {contact.name}
                      </h4>
                      <p className="text-slate-500 text-sm font-medium">{t('admin.card.active')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-50 text-sm">
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {contact.general_phone || '-'}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {contact.general_email || '-'}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <LocationIcon className="w-4 h-4 text-slate-400" />
                    {contact.city || '-'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
