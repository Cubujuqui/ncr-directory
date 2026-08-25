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

const CAMPOS_OPCIONALES = [
  'nombre_manual',
  'apellido_manual',
  'segundo_apellido_manual',
  'especialidad_manual',
  'whatsapp',
  'email',
  'facebook',
  'instagram',
  'tiktok',
  'youtube',
  'linkedin',
  'foto_url',
  'referido_por',
  'referido_timestamp',
  'nombre_preferido',
  'especialidades_adicionales',
  'punto_contacto_primario',
] as const;

export async function aprobarSolicitud(id: number) {
  await checkAuth();

  const { data: solicitud, error: fetchError } = await supabaseAdmin
    .from('solicitudes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !solicitud) throw new Error('Solicitud no encontrada');

  const datosOpcionales: Record<string, any> = {};
  for (const campo of CAMPOS_OPCIONALES) {
    const valor = solicitud[campo];
    if (valor !== null && valor !== undefined && valor !== '') {
      datosOpcionales[campo] = valor;
    }
  }

  const datosEnriquecimiento = {
    ...datosOpcionales,
    tier: solicitud.tier,
    citas_online: solicitud.citas_online,
    visita_domicilio: solicitud.visita_domicilio,
    citas_grupales: solicitud.citas_grupales,
    servicios_empresas: solicitud.servicios_empresas,
    habla_ingles: solicitud.habla_ingles,
    aprobado_timestamp: new Date().toISOString(),
  };

  const { data: existente } = await supabaseAdmin
    .from('perfiles')
    .select('id')
    .eq('carne', solicitud.carne)
    .maybeSingle();

  if (existente) {
    await supabaseAdmin.from('perfiles').update(datosEnriquecimiento).eq('id', existente.id);
  } else {
    await supabaseAdmin.from('perfiles').insert({ carne: solicitud.carne, ...datosEnriquecimiento });
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

export async function buscarPerfilPorCarne(carne: string) {
  await checkAuth();

  const { data, error } = await supabaseAdmin
    .from('perfiles')
    .select('*')
    .eq('carne', carne.trim())
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

const CAMPOS_EDITABLES = [
  'whatsapp',
  'email',
  'facebook',
  'instagram',
  'tiktok',
  'youtube',
  'linkedin',
  'especialidad_manual',
  'nombre_preferido',
  'punto_contacto_primario',
  'tier',
  'citas_online',
  'visita_domicilio',
  'citas_grupales',
  'servicios_empresas',
  'habla_ingles',
] as const;

export async function actualizarCampoPerfil(carne: string, campo: string, valorCrudo: string | boolean) {
  await checkAuth();

  if (!CAMPOS_EDITABLES.includes(campo as any)) {
    throw new Error('Campo no editable');
  }

  let valorFinal: string | boolean | null = valorCrudo;

  if (campo === 'whatsapp' && typeof valorCrudo === 'string') {
    const digitos = valorCrudo.replace(/\D/g, '');
    valorFinal = digitos ? `506${digitos}` : null;
  } else if (typeof valorCrudo === 'string' && valorCrudo.trim() === '') {
    valorFinal = null;
  }

  const { error } = await supabaseAdmin
    .from('perfiles')
    .update({ [campo]: valorFinal })
    .eq('carne', carne.trim());

  if (error) throw new Error('No se pudo actualizar');

  revalidatePath('/directorio');
  revalidatePath('/');
}