// Tabla CONTROL_SALIDAS
import type { ControlSalidas } from './types';

export const CONTROL_SALIDAS: ControlSalidas[] = [
  {
    id: "CS1",
    fk_desempeño: "D24",
    fk_alumno: "A102",
    salida_clase: "13:40:00",
    motivo: "Baño",
    otro_motivo: null,
    vuelta_clase: "13:55:00",
    tiempo_salida: "0:15:00",
    notas: null,
  },
  {
    id: "CS2",
    fk_desempeño: "D215",
    fk_alumno: "A303",
    salida_clase: "13:50:00",
    motivo: "Fotocopias",
    otro_motivo: null,
    vuelta_clase: "14:05:00",
    tiempo_salida: "0:15:00",
    notas: null,
  },
];
