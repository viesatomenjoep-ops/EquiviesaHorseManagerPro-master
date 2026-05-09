import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://mtrfeouqwgocaymzocdr.supabase.co", "sb_publishable_nnlbfDB-B3sRS6RHlCUJ_Q_KdAfFfN3");

async function run() {
  const { data, error } = await supabase
    .from('locations')
    .update({ name: 'Equivest Stable' })
    .ilike('name', '%Wellington Dressage%')
    .select();
    
  if (error) console.error("Error:", error);
  else console.log("Success:", data);
}
run();
