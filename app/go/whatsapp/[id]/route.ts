import { NextRequest, NextResponse } from 'next/server';
import { perfilesManual } from '@/lib/perfiles-manual';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const perfil = perfilesManual.find((p) => p.carne === id);

  if (!perfil?.whatsapp) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.redirect(`https://wa.me/${perfil.whatsapp}`);
}