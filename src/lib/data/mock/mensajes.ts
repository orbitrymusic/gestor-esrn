// Tabla MensajesPotencialesPorCursoPorDia
import type { MensajePotencialPorCursoPorDia } from './types';

export const MENSAJES_POTENCIALES: MensajePotencialPorCursoPorDia[] = [
  {
    id: "Mensajes1",
    fk_curso: "C6",
    fk_personal: "P3",
    fecha: "2026-09-24",
    mensaje: "Sres. padres/madres: el próximo viernes 30 de octubre se realizará la visita al Museo Carlos Ameghino. Necesitamos que firme esta nota si autoriza que su hijo/a realice la visita.",
  },
  {
    id: "Mensajes2",
    fk_curso: "C12",
    fk_personal: "P1",
    fecha: "2026-08-05",
    mensaje: "Se recuerda a las familias que el horario de salida los días viernes será a las 17:30 hs por reunión de personal docente.",
  },
  {
    id: "Mensajes3",
    fk_curso: "C30",
    fk_personal: "P7",
    fecha: "2026-09-01",
    mensaje: "Se convoca a una reunión informativa sobre orientación vocacional para las familias de 5° año, el martes 8/9 a las 18:00 hs en el SUM.",
  },
];
