const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, v] = line.split('=');
  if (k && v) env[k.trim()] = v.trim();
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching locations...");
  const { data: locs, error: locErr } = await supabase.from('locations').select('*');
  console.log("Locations:", locs);
  
  if (locs) {
    for (const loc of locs) {
      if (loc.name.toLowerCase().includes('wellington')) {
        console.log("Deleting location:", loc.name);
        await supabase.from('boxes').delete().eq('location_id', loc.id);
        await supabase.from('locations').delete().eq('id', loc.id);
      }
    }
  }

  const { data: newLocs } = await supabase.from('locations').select('*');
  const hasEquivest = newLocs.some(l => l.name.toLowerCase().includes('equivest'));
  
  if (!hasEquivest) {
    console.log("Equivest Stable not found. Inserting it...");
    const { data: newLoc } = await supabase.from('locations').insert([
      { name: 'Equivest Stable', type: 'Main Stable', capacity: 30 }
    ]).select();
    
    if (newLoc && newLoc[0]) {
      // Create some boxes
      const boxes = [];
      for (let i=1; i<=11; i++) {
        boxes.push({
          location_id: newLoc[0].id,
          box_number: 'D' + i,
          status: 'available'
        });
      }
      await supabase.from('boxes').insert(boxes);
    }
  } else {
    console.log("Equivest Stable exists.");
  }
}

run();
