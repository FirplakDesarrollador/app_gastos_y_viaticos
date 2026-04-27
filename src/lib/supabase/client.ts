import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY no están definidos en el .env');
  }

  return createBrowserClient(url!, key!);
}

export function createTalentoClient() {
  const url = process.env.NEXT_PUBLIC_TALENTO_URL;
  const key = process.env.NEXT_PUBLIC_TALENTO_ANON_KEY;

  if (!url || !key) {
    console.error('ERROR: NEXT_PUBLIC_TALENTO_URL o NEXT_PUBLIC_TALENTO_ANON_KEY no están definidos en el .env');
  }

  return createBrowserClient(url!, key!);
}
