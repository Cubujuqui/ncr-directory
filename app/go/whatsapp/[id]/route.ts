import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { whatsappAdmin } from '@/lib/contacto-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id === 'solicitar') {
    return NextResponse.redirect(
      `https://wa.me/${whatsappAdmin}?text=${encodeURIComponent('Hola, quiero solicitar mi perfil en Nutricionistas en Costa Rica')}`
    );
  }

  const { data: perfil } = await supabaseAdmin
    .from('perfiles')
    .select('whatsapp')
    .eq('carne', id)
    .maybeSingle();

  if (!perfil?.whatsapp) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.redirect(`https://wa.me/${perfil.whatsapp}`);
}