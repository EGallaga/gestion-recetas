const API_URL = 'http://localhost:3001/api/recetas';

export async function obtenerRecetas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener recetas');
  return await res.json();
}

export async function guardarRecetas(recetas) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recetas)
  });
  if (!res.ok) throw new Error('Error al guardar recetas');
  return await res.json();
}
