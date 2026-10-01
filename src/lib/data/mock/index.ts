// Punto único de acceso a los datos mock de GestorESRN.
// Re-exporta todas las tablas para que el resto de la app las importe
// siempre desde 'lib/data/mock' y nunca archivo por archivo.

export * from './types';
export { PERSONAL } from './personal';
export { ALUMNOS } from './alumnos';
export { CURSOS } from './cursos';
export { MATRICULA } from './matricula';
export { MATERIAS } from './materias';
export { ASIGNACION_DICTADO } from './asignacion_dictado';
export { TRAYECTORIA } from './trayectoria';
export { TRAYECTORIA_MATERIA } from './trayectoria_materia';
export { ACTIVIDADES } from './actividades';
export { CLASES_DICTADAS } from './clase_dictada';
export { DESEMPENO_DIARIO_POR_MATERIA } from './desempeno';
export { CONTROL_SALIDAS } from './control_salidas';
export { ENTREGA_ACTIVIDAD } from './entrega_actividad';
export { MENSAJES_POTENCIALES } from './mensajes';
export { MENSAJE_FAMILIA_TUTOR } from './mensaje_familia_tutor';
export { INFORMES } from './informes';
