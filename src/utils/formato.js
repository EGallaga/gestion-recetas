// Función para formatear fechas de manera uniforme en toda la app
export function formatFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  try {
    const fechaObj = typeof fecha === 'string' && fecha.includes('-')
      ? new Date(fecha)
      : new Date(fecha);
    if (isNaN(fechaObj.getTime())) return 'Fecha inválida';
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };
    return fechaObj.toLocaleDateString('es-ES', opciones);
  } catch (e) {
    return 'Fecha inválida';
  }
}
