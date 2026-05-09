import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtrfeouqwgocaymzocdr.supabase.co';
const supabaseKey = 'sb_publishable_nnlbfDB-B3sRS6RHlCUJ_Q_KdAfFfN3';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Starting seed process for EquiVerse Stable...');

  // 1. Delete existing EquiVerse stable to prevent duplicates
  const { data: existingLocs } = await supabase.from('locations').select('id, name').eq('name', 'EquiVerse Stable');
  if (existingLocs && existingLocs.length > 0) {
    for (const loc of existingLocs) {
      console.log(`Deleting existing location: ${loc.id}`);
      await supabase.from('locations').delete().eq('id', loc.id);
    }
  }

  // 2. Delete all Jumper Pro and Dressage Star horses
  const { data: allHorses } = await supabase.from('horses').select('id, name');
  if (allHorses) {
    for (const h of allHorses) {
      if (h.name.toLowerCase().includes('jump') && h.name.toLowerCase().includes('pro')) {
        console.log(`Deleting Jumper Pro horse: ${h.name}`);
        await supabase.from('horses').delete().eq('id', h.id);
      }
      if (h.name.toLowerCase().includes('dressage') && h.name.toLowerCase().includes('star')) {
        console.log(`Deleting Dressage Star horse: ${h.name}`);
        await supabase.from('horses').delete().eq('id', h.id);
      }
    }
  }

  // 3. Create the new EquiVerse Stable
  const { data: newLoc, error: locErr } = await supabase.from('locations').insert({
    name: 'EquiVerse Stable',
    type: 'Hoofdstal',
    address: 'Wellington, FL',
    capacity: 20,
    image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }).select().single();

  if (locErr) {
    console.error('Error creating location:', locErr);
    return;
  }
  const locId = newLoc.id;
  console.log(`Created EquiVerse Stable with ID: ${locId}`);

  // 4. Create 11 Horses and 11 Boxes
  for (let i = 1; i <= 11; i++) {
    const horseName = `EquiVerse Star ${i}`;
    const { data: horse, error: hErr } = await supabase.from('horses').insert({
      name: horseName,
      discipline: 'Springpaard',
      sex: 'Mare',
      age: 7
    }).select().single();

    if (hErr) {
      console.error(`Error creating horse ${horseName}:`, hErr);
      continue;
    }

    const { error: boxErr } = await supabase.from('boxes').insert({
      location_id: locId,
      horse_id: horse.id,
      box_number: `B${i}`,
      status: 'occupied'
    });

    if (boxErr) {
      console.error(`Error creating box B${i}:`, boxErr);
    } else {
      console.log(`Created horse ${horseName} and assigned to box B${i}`);
    }
  }

  console.log('Seed process completed successfully!');
}

run();
