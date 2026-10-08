// MateriaDictada no es una tabla del modelo de datos: es la forma "ya cruzada"
// que necesita la pantalla "Mis materias" para no tener que hacer el join en el componente.
export type MateriaDictada = {
  asignacionId: string;
  cursoId: string;
  materiaId: string;
  nombreMateria: string;
  cursoLabel: string; // ej. "1°2° Tarde"
  areaAsignatura: string;
};
