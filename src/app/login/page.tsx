import Login from '@/components/Login';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If already logged in, redirect to dashboard
  if (session) {
    redirect('/');
  }

  return <Login />;
}
