// Único punto de cambio entre datos mock y Supabase.
//
// Mientras USE_MOCK sea true, cada función lee/escribe sobre los arrays
// en memoria importados de './index'. El día que se conecte Supabase,
// esta es la ÚNICA implementación que cambia — ningún hook ni pantalla
// debería tocarse.
//
// Ejemplo de uso en un service:
//   import { dataClient } from '@/lib/data/client';
//   const alumnos = await dataClient.alumnos.listByCurso(cursoId);

import * as mock from './index';
import type { Alumno, Trayectoria, ClaseDictada, DesempeñoDiarioPorMateria } from './types';

const USE_MOCK = true;

function simulateLatency<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const dataClient = {
  alumnos: {
    async listByCurso(fkCurso: string): Promise<Alumno[]> {
      if (USE_MOCK) {
        const idsMatriculados = mock.MATRICULA.filter(
          (m) => m.fk_curso === fkCurso && m.activa
        ).map((m) => m.fk_alumno);
        return simulateLatency(
          mock.ALUMNOS.filter((a) => idsMatriculados.includes(a.id))
        );
      }
      // TODO Supabase: supabase.from('alumnos').select('*, matricula!inner(*)').eq('matricula.fk_curso', fkCurso).eq('matricula.activa', true)
      throw new Error('Supabase todavía no está conectado');
    },
  },

  trayectorias: {
    async listByAlumno(fkAlumno: string): Promise<Trayectoria[]> {
      if (USE_MOCK) {
        return simulateLatency(mock.TRAYECTORIA.filter((t) => t.fk_alumno === fkAlumno));
      }
      throw new Error('Supabase todavía no está conectado');
    },
    async materiasChecklist(fkTrayectoria: string) {
      if (USE_MOCK) {
        return simulateLatency(
          mock.TRAYECTORIA_MATERIA.filter((tm) => tm.fk_trayectoria === fkTrayectoria)
        );
      }
      throw new Error('Supabase todavía no está conectado');
    },
  },

  asistencia: {
    async getOrCreateClase(
      fkCurso: string,
      fkMateria: string,
      fecha: string,
      fkDocente: string
    ): Promise<ClaseDictada> {
      if (USE_MOCK) {
        const existente = mock.CLASES_DICTADAS.find(
          (c) => c.fk_curso === fkCurso && c.fk_materia === fkMateria && c.fecha === fecha
        );
        if (existente) return simulateLatency(existente);
        // en el mock no persistimos altas nuevas entre sesiones; en Supabase
        // esto sería un INSERT real que sí persiste.
        const nueva: ClaseDictada = {
          id: `CD_${Date.now()}`,
          fk_curso: fkCurso,
          fk_materia: fkMateria,
          fecha,
          fk_docente_responsable: fkDocente,
          hora_primer_presente: null,
          hubo_clase: true,
          cerrada: false,
          observaciones_generales: null,
        };
        return simulateLatency(nueva);
      }
      // TODO Supabase: select ... ; si no existe, insert ... (o RPC atómico para evitar duplicados por carrera)
      throw new Error('Supabase todavía no está conectado');
    },
    async listByClase(fkClase: string): Promise<DesempeñoDiarioPorMateria[]> {
      if (USE_MOCK) {
        return simulateLatency(
          mock.DESEMPENO_DIARIO_POR_MATERIA.filter((d) => d.fk_clase_dictada === fkClase)
        );
      }
      throw new Error('Supabase todavía no está conectado');
    },
  },
};
