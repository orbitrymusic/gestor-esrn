// Tipos calcados 1:1 de las tablas definidas para GestorESRN.
// snake_case en los campos para que coincidan exactamente con las columnas
// que va a devolver Supabase el dia de la migracion (ver lib/data/client.ts).

export type Rol = 'admin' | 'Profesor';
export type Turno = 'Mañana' | 'Tarde';
export type CicloInstitucional = 'Ciclo Basico' | 'Ciclo Superior' | 'Ciclo Orientado';
export type EstadoTrayectoria = 'en curso' | 'aprobada' | 'vencida-perdida';
export type EstadoEntrega = 'pendiente' | 'entregado' | 'devuelto' | 'aprobado';
export type MotivoSalida = 'Baño' | 'Fotocopias' | 'Otro';
export type MedioMensaje = 'Email' | 'Impreso';
export type PersonaAutoriza = 'Padre' | 'Madre' | 'Tutor' | 'Otro' | null;

export interface Personal {
  id: string;
  apellido: string;
  nombre: string;
  dni: string;
  rol: Rol;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
  area_del_personal: string;
  activo: boolean;
}

export interface Alumno {
  id: string;
  dni: string;
  apellido: string;
  nombre: string;
  direccion: string | null;
  email_padre: string | null;
  tel_padre: string | null;
  email_madre: string | null;
  tel_madre: string | null;
  email_tutor: string | null;
  tel_tutor: string | null;
  email_personal: string | null;
  activo: boolean;
  observaciones_generales: string | null;
}

export interface Curso {
  id: string;
  agrupamiento: string;
  turno: Turno;
  año_lectivo: number;
}

export interface Matricula {
  id: string;
  fk_alumno: string;
  fk_curso: string;
  fecha_desde: string;
  fecha_hasta: string | null;
  activa: boolean;
  motivo_cambio: string | null;
}

export interface Materia {
  id: string;
  año_del_ciclo: number;
  nombre: string;
  programa: number;
  contenidos: string | null;
  area_asignatura: string;
  categorizacion_ciclo: CicloInstitucional;
  vigente_desde: string;
  vigente_hasta: string | null;
}

export interface AsignacionDictadoDeMaterias {
  id: string;
  fk_personal: string;
  fk_materia: string;
  fk_curso: string;
  fecha_asignacion: string;
  fecha_inactivacion: string | null;
}

export interface Trayectoria {
  id: string;
  fk_alumno: string;
  fk_curso: string;
  area: string;
  ciclo_institucional: CicloInstitucional;
  año_lectivo: number;
  aprobado_fecha: string | null;
  estado: EstadoTrayectoria;
  anotaciones: string | null;
}

export interface TrayectoriaMateria {
  id: string;
  fk_trayectoria: string;
  fk_materia: string;
  primer_cuat_aprobado: string | null;
  segundo_cuat_aprobado: string | null;
  aprobada: boolean;
  fecha_aprobacion_materia: string | null;
  nota: number | null;
  fecha_vencimiento_plazo: string | null;
  contenidos_pendientes: string | null;
  anotaciones: string | null;
}

export interface ClaseDictada {
  id: string;
  fk_curso: string;
  fk_materia: string;
  fecha: string;
  fk_docente_responsable: string;
  hora_primer_presente: string | null;
  hubo_clase: boolean;
  cerrada: boolean;
  observaciones_generales: string | null;
}

export interface DesempeñoDiarioPorMateria {
  id: string;
  fk_clase_dictada: string;
  fk_alumno: string;
  fk_trayectoria: string | null;
  fk_actividades: string | null;
  hora_asistencia: string | null;
  presente: boolean;
  tarde: boolean;
  anotaciones_docente: string | null;
  anotaciones_alumno: string | null;
  retirada_anticipada: string | null;
  trabaja: boolean;
  participa_oralmente: boolean;
  situacion_problematica: string | null;
}

export interface ControlSalidas {
  id: string;
  fk_desempeño: string;
  fk_alumno: string;
  salida_clase: string;
  motivo: MotivoSalida;
  otro_motivo: string | null;
  vuelta_clase: string | null;
  tiempo_salida: string | null;
  notas: string | null;
}

export interface Actividad {
  id: string;
  fk_materia: string;
  nombre: string;
  contenidos: string | null;
  fecha_incorpora_actividad: string;
}

export interface EntregaActividad {
  id: string;
  fk_alumno: string;
  fk_actividad: string;
  estado: EstadoEntrega;
  nota: number | null;
  fecha_aprobacion: string | null;
  cantidad_devoluciones: number;
  anotaciones: string | null;
}

export interface MensajePotencialPorCursoPorDia {
  id: string;
  fk_curso: string;
  fk_personal: string;
  fecha: string;
  mensaje: string;
}

export interface MensajeFamiliaTutor {
  id: string;
  fk_mensaje: string;
  fk_alumno: string;
  fk_matricula: string;
  persona_autoriza: PersonaAutoriza;
  firmado: boolean;
  fecha_firma: string | null;
  medio: MedioMensaje | null;
}

export interface Informe {
  id: string;
  fk_alumno: string;
  fk_curso: string;
  fk_materia: string | null;
  fk_trayectoria: string | null;
  fecha_generacion: string;
  pct_asistencia: number;
  pct_trabajo: number;
  pct_participacion: number;
  informe_cualitativo: string | null;
}
