function siguienteQuintoOMismo(fecha: Date): Date {
  const candidato = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), 5));
  if (fecha.getTime() <= candidato.getTime()) return candidato;
  candidato.setUTCMonth(candidato.getUTCMonth() + 1);
  return candidato;
}

function siguienteQuintoEstricto(fecha: Date): Date {
  const candidato = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), 5));
  if (fecha.getTime() < candidato.getTime()) return candidato;
  candidato.setUTCMonth(candidato.getUTCMonth() + 1);
  return candidato;
}

export function calcularCubreHasta(fechaPago: Date, cubreHastaAnterior: Date | null): Date {
  if (!cubreHastaAnterior) {
    const mas31 = new Date(Date.UTC(fechaPago.getUTCFullYear(), fechaPago.getUTCMonth(), fechaPago.getUTCDate() + 31));
    return siguienteQuintoOMismo(mas31);
  }
  const base = fechaPago.getTime() > cubreHastaAnterior.getTime() ? fechaPago : cubreHastaAnterior;
  return siguienteQuintoEstricto(base);
}