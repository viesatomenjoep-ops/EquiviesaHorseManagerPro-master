import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtrfeouqwgocaymzocdr.supabase.co';
const supabaseKey = 'sb_publishable_nnlbfDB-B3sRS6RHlCUJ_Q_KdAfFfN3';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('locations').select('*');
  console.log('Locations Error:', error);
  console.log('Locations Data:', data);
}
test();
