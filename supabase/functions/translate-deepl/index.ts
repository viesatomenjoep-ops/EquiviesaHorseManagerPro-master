import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// This function acts as a proxy to DeepL API
// You need to set DEEPL_API_KEY in your Supabase project secrets:
// supabase secrets set DEEPL_API_KEY="your-api-key"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, target_lang } = await req.json()
    const DEEPL_API_KEY = Deno.env.get('DEEPL_API_KEY')

    if (!DEEPL_API_KEY) {
      throw new Error("DEEPL_API_KEY is niet ingesteld in Supabase Secrets")
    }

    // Call DeepL PRO API (omdat de gebruiker het Pro plan heeft)
    const url = 'https://api.deepl.com/v2/translate'
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: target_lang.toUpperCase(), // e.g., 'EN', 'DE', 'FR'
      }),
    })

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
