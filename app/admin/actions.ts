'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isValidAdminToken } from '@/lib/admin-auth';
import { calcularCubreHasta } from '@/lib/pagos';

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
    'foto_posicion_y',
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
    'foto_posicion_y',
] as const;

export async function actualizarCampoPerfil(carne: string, campo: string, valorCrudo: string | boolean) {
  await checkAuth();

  if (!CAMPOS_EDITABLES.includes(campo as any)) {
    throw new Error('Campo no editable');
  }

    let valorFinal: string | boolean | number | null = valorCrudo;

  if (campo === 'whatsapp' && typeof valorCrudo === 'string') {
        const digitos = valorCrudo.replace(/\D/g, '');
        valorFinal = digitos ? `506${digitos}` : null;
  } else if (campo === 'foto_posicion_y' && typeof valorCrudo === 'string') {
        const numero = parseInt(valorCrudo, 10);
        valorFinal = Number.isNaN(numero) ? null : Math.max(0, Math.min(100, numero));
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

export async function buscarPagosPorCarne(carne: string) {
  await checkAuth();

  const { data } = await supabaseAdmin
    .from('pagos')
    .select('*')
    .eq('carne', carne.trim())
    .order('fecha_pago', { ascending: false });

  return data || [];
}

export async function registrarPago(
  carne: string,
  monto: number | null,
  metodoPago: string,
  nivelPagado: string,
  fechaPago: string
) {
  await checkAuth();

  const carneLimpio = carne.trim();

  const { data: ultimoPago } = await supabaseAdmin
    .from('pagos')
    .select('cubre_hasta')
    .eq('carne', carneLimpio)
    .order('fecha_pago', { ascending: false })
    .limit(1)
    .maybeSingle();

  const fechaPagoDate = new Date(`${fechaPago}T00:00:00Z`);
  const cubreHastaAnteriorDate = ultimoPago?.cubre_hasta
    ? new Date(`${ultimoPago.cubre_hasta}T00:00:00Z`)
    : null;

  const cubreHasta = calcularCubreHasta(fechaPagoDate, cubreHastaAnteriorDate);
  const cubreHastaTexto = cubreHasta.toISOString().slice(0, 10);

  const { error: errorInsert } = await supabaseAdmin.from('pagos').insert({
    carne: carneLimpio,
    monto,
    metodo_pago: metodoPago,
    nivel_pagado: nivelPagado,
    fecha_pago: fechaPago,
    cubre_hasta: cubreHastaTexto,
  });

  if (errorInsert) throw new Error('No se pudo registrar el pago');

  await supabaseAdmin
    .from('perfiles')
    .update({ tier: nivelPagado })
    .eq('carne', carneLimpio);

  revalidatePath('/admin/pagos');
  revalidatePath('/directorio');
  revalidatePath('/');

  return { cubreHasta: cubreHastaTexto };
}

export async function actualizarNumeroFactura(pagoId: number, numeroFactura: string) {
  await checkAuth();

  const { error } = await supabaseAdmin
    .from('pagos')
    .update({ numero_factura: numeroFactura.trim() || null })
    .eq('id', pagoId);

  if (error) throw new Error('No se pudo actualizar el número de factura');

  revalidatePath('/admin/pagos');
}
