import { NextRequest, NextResponse } from 'next/server';
import { perfilesManual } from '@/lib/perfiles-manual';
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

  const perfil = perfilesManual.find((p) => p.carne === id);

  if (!perfil?.whatsapp) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.redirect(`https://wa.me/${perfil.whatsapp}`);
}