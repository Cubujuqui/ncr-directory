import { NextRequest, NextResponse } from 'next/server';
import { getNutricionistas } from '@/lib/nutricionistas';

export async function GET(request: NextRequest) {
  const carne = request.nextUrl.searchParams.get('carne')?.trim();

  if (!carne) {
    return NextResponse.json({ encontrado: false });
  }

  const registro = getNutricionistas().find((n) => n['Carné'].trim() === carne);

  if (!registro) {
    return NextResponse.json({ encontrado: false });
  }

  return NextResponse.json({
    encontrado: true,
    nombre: `${registro.Nombre} ${registro['Primer Apellido']} ${registro['Segundo Apellido']}`,
  });
}