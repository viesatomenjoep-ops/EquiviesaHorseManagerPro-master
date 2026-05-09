import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';
import { FolderOpen, UploadCloud, Image as ImageIcon, FileText, Link as LinkIcon, Trash2, Search, X } from 'lucide-react';

interface MediaAsset {
  id: string;
  url: string;
  file_type: string;
  document_category: string;
  created_at: string;
  file_name?: string;
}

export function DocumentsView() {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docCategory, setDocCategory] = useState('Algemeen');

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setAssets(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setShowUploadModal(true);
    }
    // Reset file input
    if (e.target) e.target.value = '';
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

    try {
      // 1. Upload to Cloudinary
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const assetType = data.resource_type === 'image' ? 'image' : 'document';
      const fileExt = data.format ? `.${data.format}` : '';
      const title = data.original_filename + fileExt;

      // 2. Save to Supabase SQL Database
      const { error: dbError } = await supabase.from('media_assets').insert({
        url: data.secure_url,
        file_type: assetType,
        document_category: docCategory,
        file_name: title
      });

      if (dbError) throw dbError;

      // 3. Cleanup & Reload
      setShowUploadModal(false);
      setSelectedFile(null);
      setDocCategory('Algemeen');
      fetchMedia();
      alert('Bestand succesvol opgeslagen in database!');

    } catch (err) {
      console.error('Error uploading media file:', err);
      alert('Er ging iets mis bij het opslaan.');
    } finally {
      setIsUploading(false);
    }
  };

  async function handleDelete(id: string) {
    if (!window.confirm("Weet je zeker dat je dit bestand wilt verwijderen?")) return;
    try {
      await supabase.from('media_assets').delete().eq('id', id);
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredAssets = assets.filter(a => 
    (a.document_category && a.document_category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (a.file_name && a.file_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-indigo-500" />
            Media Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Beheer al je documenten, contracten, paspoorten en foto's centraal in het dashboard.
          </p>
        </div>
        
        <div className="relative">
          <input 
            type="file" 
            id="media-upload" 
            className="hidden" 
            onChange={handleFileSelect} 
            disabled={isUploading}
          />
          <label 
            htmlFor="media-upload" 
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <UploadCloud className="w-5 h-5" />
            Bestand Uploaden
          </label>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
        <div className="relative max-w-md w-full mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek media op categorie of naam..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
        </div>

        {assets.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            <UploadCloud className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">Geen media gevonden</h3>
            <p className="text-slate-500">Klik rechtsboven op "Bestand Uploaden" om je eerste PDF of foto toe te voegen.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="group relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all">
                
                {asset.file_type === 'image' ? (
                  <div className="aspect-square bg-slate-200 w-full relative">
                    <img src={asset.url} alt="Media" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-square bg-white w-full flex flex-col items-center justify-center text-slate-400 gap-2 border-b border-slate-200">
                    <FileText className="w-12 h-12 text-indigo-300" />
                    <span className="text-xs font-bold uppercase">Document</span>
                  </div>
                )}
                
                <div className="p-3">
                  <p className="text-xs font-bold text-slate-700 truncate mb-1" title={asset.file_name || asset.document_category}>
                    {asset.file_name || asset.document_category?.toUpperCase() || 'DOCUMENT'}
                  </p>
                  <p className="text-[10px] font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded-full mb-2">
                    {asset.document_category}
                  </p>
                  <div className="flex justify-between items-center">
                    <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 p-1 bg-indigo-50 rounded-lg" title="Bekijken/Downloaden">
                      <LinkIcon className="w-4 h-4" />
                    </a>
                    <button onClick={() => handleDelete(asset.id)} className="text-rose-500 hover:text-rose-700 p-1 bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Verwijderen">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL VOOR OPSLAAN EN CATEGORIE KIEZEN */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">Bestand Opslaan in Database</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveMedia} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Geselecteerd Bestand</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 truncate">
                  {selectedFile?.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Categorie</label>
                <select 
                  required 
                  value={docCategory} 
                  onChange={e => setDocCategory(e.target.value)} 
                  className="w-full p-3 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Algemeen">Algemeen</option>
                  <option value="Paspoort">Paspoort</option>
                  <option value="Keuringsrapport">Keuringsrapport (X-Ray)</option>
                  <option value="Contract">Contract / Eigendomsbewijs</option>
                  <option value="Factuur">Factuur</option>
                  <option value="Foto/Video">Foto/Video</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowUploadModal(false)} 
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors"
                >
                  Annuleren
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isUploading ? 'Aan het opslaan...' : 'Opslaan in SQL'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
