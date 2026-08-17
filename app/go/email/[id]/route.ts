import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: perfil } = await supabaseAdmin
    .from('perfiles')
    .select('email, tier')
    .eq('carne', id)
    .maybeSingle();

  if (!perfil?.email) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  await supabaseAdmin.from('clics').insert({ carne: id, canal: 'email', tier: perfil.tier });

  return NextResponse.redirect(`mailto:${perfil.email}`);
}