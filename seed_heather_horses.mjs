import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtrfeouqwgocaymzocdr.supabase.co';
const supabaseKey = 'sb_publishable_nnlbfDB-B3sRS6RHlCUJ_Q_KdAfFfN3';
const supabase = createClient(supabaseUrl, supabaseKey);

const horses = [
  { name: 'Victoria', discipline: 'Jumpers', sex: 'Mare', age: 8 },
  { name: 'Hideaway', discipline: 'Hunters', sex: 'Gelding', age: 7 },
  { name: 'Sawyer', discipline: 'Hunters', sex: 'Gelding', age: 9 },
  { name: 'Lips', discipline: 'Jumpers', sex: 'Mare', age: 6 },
  { name: 'Rolo', discipline: 'Jumpers', sex: 'Gelding', age: 10 },
  { name: 'Chimi', discipline: 'Jumpers', sex: 'Gelding', age: 8 },
  { name: 'Cora', discipline: 'Hunters', sex: 'Mare', age: 7 },
  { name: 'Dia', discipline: 'Jumpers', sex: 'Mare', age: 6 },
  { name: 'Walker', discipline: 'Jumpers', sex: 'Gelding', age: 9 },
  { name: 'Godiva', discipline: 'Hunters', sex: 'Mare', age: 5 },
];

async function seed() {
  console.log('Inserting horses...');
  for (const horse of horses) {
    const { data, error } = await supabase.from('horses').insert([horse]);
    if (error) {
      console.error(`Failed to insert ${horse.name}:`, error);
    } else {
      console.log(`Inserted ${horse.name}`);
    }
  }
  console.log('Seeding complete.');
}

seed();
