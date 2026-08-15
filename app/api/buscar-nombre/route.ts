import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  const carne = request.nextUrl.searchParams.get('carne')?.trim();

  if (!carne) {
    return NextResponse.json({ encontrado: false });
  }

  const { data: perfil } = await supabaseAdmin
    .from('perfiles')
    .select('nombre_manual, apellido_manual, segundo_apellido_manual')
    .eq('carne', carne)
    .maybeSingle();

  if (!perfil || !perfil.nombre_manual) {
    return NextResponse.json({ encontrado: false });
  }

  return NextResponse.json({
    encontrado: true,
    nombre: `${perfil.nombre_manual} ${perfil.apellido_manual} ${perfil.segundo_apellido_manual}`,
  });
}