import type { Rol } from '../../lib/data/mock/types';

// Usuario de sesión: un subconjunto de Personal, sin datos sensibles
// (en esta fase mock no hay contraseña; eso lo va a resolver Supabase Auth).
export type SessionUser = {
  id: string;
  nombre: string;
  apellido: string;
  rol: Rol;
  area_del_personal: string;
};

export type SessionState = {
  user: SessionUser | null;
  isLoading: boolean;
};
