import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const CANALES_VALIDOS = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'] as const;
type Canal = typeof CANALES_VALIDOS[number];

function construirUrl(canal: Canal, valor: string): string {
  if (canal === 'facebook') return 'https://facebook.com/' + valor;
  if (canal === 'instagram') return 'https://instagram.com/' + valor;
  if (canal === 'tiktok') return 'https://tiktok.com/@' + valor;
  return valor;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ canal: string; id: string }> }
) {
  const { canal, id } = await params;

  if (!CANALES_VALIDOS.includes(canal as Canal)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { data: perfil } = await supabaseAdmin
    .from('perfiles')
    .select(`${canal}, tier`)
    .eq('carne', id)
    .maybeSingle();

  const valor = (perfil as any)?.[canal] as string | undefined;

  if (!valor) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  await supabaseAdmin.from('clics').insert({ carne: id, canal, tier: (perfil as any).tier });

  return NextResponse.redirect(construirUrl(canal as Canal, valor));
}