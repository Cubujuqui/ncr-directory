import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

async function getTodosLosPerfiles(): Promise<any[]> {
  const todos: any[] = [];
  let desde = 0;
  const tamanoPagina = 1000;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from('perfiles')
      .select('*')
      .order('id', { ascending: true })
      .range(desde, desde + tamanoPagina - 1);

    if (error || !data) break;
    todos.push(...data);
    if (data.length < tamanoPagina) break;
    desde += tamanoPagina;
  }

  return todos;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const perfiles = await getTodosLosPerfiles();
  const fecha = new Date().toISOString().slice(0, 10);
  const nombreArchivo = `perfiles-${fecha}.json`;

  const { error } = await supabaseAdmin.storage
    .from('backups-perfiles')
    .upload(nombreArchivo, JSON.stringify(perfiles, null, 2), {
      contentType: 'application/json',
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, archivo: nombreArchivo, totalRegistros: perfiles.length });
}