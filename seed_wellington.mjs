import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtrfeouqwgocaymzocdr.supabase.co';
const supabaseKey = 'sb_publishable_nnlbfDB-B3sRS6RHlCUJ_Q_KdAfFfN3';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Inserting Wellington Dressage location...');
  const { data: loc1, error: err1 } = await supabase.from('locations').insert({
    name: 'Wellington Dressage',
    type: 'Hoofdstal',
    address: 'Wellington, FL, USA',
    capacity: 11
  }).select();
  if (err1) { console.error(err1); return; }
  const loc1Id = loc1[0].id;

  console.log('Inserting Wellington Jumpers location...');
  const { data: loc2, error: err2 } = await supabase.from('locations').insert({
    name: 'Wellington Jumpers',
    type: 'Hoofdstal',
    address: 'Wellington, FL, USA',
    capacity: 22
  }).select();
  if (err2) { console.error(err2); return; }
  const loc2Id = loc2[0].id;

  console.log('Inserting 11 dressage horses and boxes...');
  for (let i = 1; i <= 11; i++) {
    // create horse
    const { data: horse, error: hErr } = await supabase.from('horses').insert({
      name: `Dressage Star ${i}`,
      discipline: 'Dressuurpaard'
    }).select();
    if (hErr) console.error(hErr);
    
    // assign box
    await supabase.from('boxes').insert({
      location_id: loc1Id,
      horse_id: horse ? horse[0].id : null,
      box_number: `D${i}`,
      status: 'occupied'
    });
  }

  console.log('Inserting 22 jumping horses and boxes...');
  for (let i = 1; i <= 22; i++) {
    // create horse
    const { data: horse, error: hErr } = await supabase.from('horses').insert({
      name: `Jumping Pro ${i}`,
      discipline: 'Springpaard'
    }).select();
    if (hErr) console.error(hErr);
    
    // assign box
    await supabase.from('boxes').insert({
      location_id: loc2Id,
      horse_id: horse ? horse[0].id : null,
      box_number: `J${i}`,
      status: 'occupied'
    });
  }

  console.log('Seeding complete!');
}

seed();
