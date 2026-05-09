import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtrfeouqwgocaymzocdr.supabase.co';
const supabaseKey = 'sb_publishable_nnlbfDB-B3sRS6RHlCUJ_Q_KdAfFfN3';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: allHorses } = await supabase.from('horses').select('id, name');
  console.log('Current horses in DB:', allHorses.map(h => h.name));
  
  const heatherHorseNames = [
    'Victoria', 'Hideaway', 'Sawyer', 'Lips', 'Rolo', 
    'Chimi', 'Cora', 'Dia', 'Walker', 'Godiva'
  ];
  
  const toDelete = allHorses.filter(h => !heatherHorseNames.includes(h.name));
  
  if (toDelete.length > 0) {
    console.log('Deleting:', toDelete.map(h => h.name));
    for (const h of toDelete) {
      await supabase.from('horses').delete().eq('id', h.id);
    }
    console.log('Deleted successfully.');
  } else {
    console.log('No extra horses to delete.');
  }
}

run();
