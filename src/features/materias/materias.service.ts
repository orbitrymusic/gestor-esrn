import { ASIGNACION_DICTADO } from '../../lib/data/mock/asignacion_dictado';
import { MATERIAS } from '../../lib/data/mock/materias';
import { CURSOS } from '../../lib/data/mock/cursos';
import type { MateriaDictada } from './materias.types';

export function listMateriasPorDocente(fkPersonal: string): MateriaDictada[] {
  return ASIGNACION_DICTADO.filter(
    (a) => a.fk_personal === fkPersonal && !a.fecha_inactivacion
  )
    .map((a) => {
      const materia = MATERIAS.find((m) => m.id === a.fk_materia);
      const curso = CURSOS.find((c) => c.id === a.fk_curso);
      return {
        asignacionId: a.id,
        cursoId: a.fk_curso,
        materiaId: a.fk_materia,
        nombreMateria: materia?.nombre ?? 'Materia desconocida',
        cursoLabel: curso ? `${curso.agrupamiento} ${curso.turno}` : 'Curso desconocido',
        areaAsignatura: materia?.area_asignatura ?? '',
      };
    })
    // orden estable: por curso y luego por materia, para que la lista no "salte" entre renders
    .sort((a, b) => a.cursoLabel.localeCompare(b.cursoLabel) || a.nombreMateria.localeCompare(b.nombreMateria));
}
