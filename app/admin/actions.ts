'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isValidAdminToken } from '@/lib/admin-auth';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;
  if (!isValidAdminToken(token)) {
    throw new Error('No autorizado');
  }
}

export async function aprobarSolicitud(id: number) {
  await checkAuth();

  const { data: solicitud, error: fetchError } = await supabaseAdmin
    .from('solicitudes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !solicitud) throw new Error('Solicitud no encontrada');

  const perfilData = {
    carne: solicitud.carne,
    nombre_manual: solicitud.nombre_manual,
    apellido_manual: solicitud.apellido_manual,
    tier: solicitud.tier,
    especialidad_manual: solicitud.especialidad_manual,
    whatsapp: solicitud.whatsapp,
    email: solicitud.email,
    instagram: solicitud.instagram,
    tiktok: solicitud.tiktok,
    youtube: solicitud.youtube,
    linkedin: solicitud.linkedin,
    foto_url: solicitud.foto_url,
    citas_online: solicitud.citas_online,
    visita_domicilio: solicitud.visita_domicilio,
    referido_por: solicitud.referido_por,
    referido_timestamp: solicitud.referido_timestamp,
    aprobado_timestamp: new Date().toISOString(),
    nombre_preferido: solicitud.nombre_preferido,
    especialidades_adicionales: solicitud.especialidades_adicionales,
    punto_contacto_primario: solicitud.punto_contacto_primario,
  };

  const { data: existente } = await supabaseAdmin
    .from('perfiles')
    .select('id')
    .eq('carne', solicitud.carne)
    .maybeSingle();

  if (existente) {
    await supabaseAdmin.from('perfiles').update(perfilData).eq('id', existente.id);
  } else {
    await supabaseAdmin.from('perfiles').insert(perfilData);
  }

  await supabaseAdmin
    .from('solicitudes')
    .update({ estado_revision: 'aprobado', revisado_timestamp: new Date().toISOString() })
    .eq('id', id);

  revalidatePath('/admin');
}

export async function rechazarSolicitud(id: number) {
  await checkAuth();

  await supabaseAdmin
    .from('solicitudes')
    .update({ estado_revision: 'rechazado', revisado_timestamp: new Date().toISOString() })
    .eq('id', id);

  revalidatePath('/admin');
}