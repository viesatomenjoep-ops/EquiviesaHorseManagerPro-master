import { useState, useEffect } from 'react';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Voer');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error (is the table created?):', error);
        // Fallback mock data if table not created
        setProducts([
          { id: '1', name: 'Basisbrok Sport', category: 'Voer', price: 15.50, stock: 45 },
          { id: '2', name: 'Hoefsmid (Nieuw Beslag)', category: 'Diensten', price: 120.00, stock: 0 },
          { id: '3', name: 'Stalling (Pakket A)', category: 'Diensten', price: 450.00, stock: 0 },
        ]);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
      };

      const { data, error } = await supabase.from('products').insert([newProduct]).select();
      
      if (error) {
        console.error('Error adding product:', error);
        alert('Er is een fout opgetreden of de database tabel bestaat nog niet.');
      } else if (data) {
        setProducts([data[0], ...products]);
        setShowAddForm(false);
        // Reset form
        setName('');
        setPrice('');
        setStock('');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Producten Catalogus</h1>
          <p className="text-slate-500">Beheer voer, diensten, en supplementen voor facturatie.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-[#C2A878] hover:bg-[#A88D5A] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? 'Annuleren' : 'Nieuw Product'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-1 lg:col-span-2">
            <label className="text-sm font-medium text-slate-700">Naam</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="Bijv. Basisbrok Sport" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Categorie</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-[#C2A878] focus:border-[#C2A878]">
              <option>Voer</option>
              <option>Supplementen</option>
              <option>Diensten</option>
              <option>Overig</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Prijs (€)</label>
            <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="0.00" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Voorraad</label>
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-[#C2A878] focus:border-[#C2A878]" placeholder="Optioneel" />
          </div>
          <div className="lg:col-span-5 flex justify-end">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium">Opslaan</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-medium">
              <th className="p-4">Product / Dienst</th>
              <th className="p-4">Categorie</th>
              <th className="p-4">Prijs</th>
              <th className="p-4">Voorraad</th>
              <th className="p-4 text-right">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Laden...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Geen producten gevonden.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-3">
                    <div className="bg-amber-50 text-[#A88D5A] p-2 rounded-lg">
                      <Package className="w-4 h-4" />
                    </div>
                    {product.name}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700 font-medium">€ {product.price.toFixed(2)}</td>
                  <td className="p-4 text-slate-500">{product.stock > 0 ? product.stock : '-'}</td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-[#A88D5A] p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Edit className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
