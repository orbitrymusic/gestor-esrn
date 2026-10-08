import { useMemo } from 'react';
import { useSession } from '../auth/session.provider';
import { listMateriasPorDocente } from './materias.service';

export function useMateriasPorDocente() {
  const { user } = useSession();

  const materias = useMemo(() => {
    if (!user) return [];
    return listMateriasPorDocente(user.id);
  }, [user]);

  return { materias };
}
