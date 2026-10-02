import { PERSONAL } from '../../lib/data/mock/personal';
import type { SessionUser } from './auth.types';

// Lista de personas con las que se puede "iniciar sesión" en esta fase mock.
// Cuando se conecte Supabase Auth, esta función deja de usarse: el login
// real va a pedir email + contraseña, no una lista para elegir.
export function listLoginableUsers(): SessionUser[] {
  return PERSONAL.filter((p) => p.activo).map((p) => ({
    id: p.id,
    nombre: p.nombre,
    apellido: p.apellido,
    rol: p.rol,
    area_del_personal: p.area_del_personal,
  }));
}

export async function loginComo(personalId: string): Promise<SessionUser> {
  const user = listLoginableUsers().find((u) => u.id === personalId);
  if (!user) {
    throw new Error('Usuario no encontrado en el mock de Personal');
  }
  // TODO Supabase: reemplazar por supabase.auth.signInWithPassword({ email, password })
  return new Promise((resolve) => setTimeout(() => resolve(user), 300));
}
