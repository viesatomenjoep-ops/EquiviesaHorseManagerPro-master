const fs = require('fs');

let content = fs.readFileSync('src/app/pages/LocationsView.tsx', 'utf8');

// Add handleAddBox
const insertFunction = `
  async function handleAddBox(locationId: string, locBoxes: any[]) {
    let prefix = 'D';
    let maxNum = 0;
    if (locBoxes.length > 0) {
      locBoxes.forEach(b => {
        const m = b.box_number.match(/^([a-zA-Z]*)(\\d+)$/);
        if (m) {
          prefix = m[1];
          const num = parseInt(m[2], 10);
          if (num > maxNum) maxNum = num;
        }
      });
    }
    const nextNumber = \`\${prefix}\${maxNum + 1}\`;
    
    try {
      const { error } = await supabase.from('boxes').insert([{
        location_id: locationId,
        box_number: nextNumber,
        status: 'available'
      }]);
      if (!error) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  }
`;

content = content.replace(
  '  async function handleSaveBox(e: React.FormEvent) {',
  insertFunction + '\n  async function handleSaveBox(e: React.FormEvent) {'
);

// Add the UI element for + Nieuwe Box
const newBoxHTML = `
                      <div 
                        onClick={() => handleAddBox(loc.id, locBoxes)}
                        className="group relative p-4 rounded-xl border border-dashed border-slate-300 bg-transparent flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105 hover:bg-slate-50 cursor-pointer h-[120px]"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#C2A878]/10 transition-colors">
                          <Plus className="w-5 h-5 text-slate-400 group-hover:text-[#C2A878]" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 group-hover:text-slate-600">Nieuwe Box</p>
                      </div>
                    </div>
                  </div>
`;

content = content.replace(
  '                      ))}\n                    </div>\n                  </div>',
  '                      ))}' + newBoxHTML
);

// Also we need to make sure Plus is imported, which it is.

fs.writeFileSync('src/app/pages/LocationsView.tsx', content);
