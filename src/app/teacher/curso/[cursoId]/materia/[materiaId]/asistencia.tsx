import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MATERIAS } from '../../../../../../lib/data/mock/materias';
import { CURSOS } from '../../../../../../lib/data/mock/cursos';
import { theme } from '../../../../../../constants/theme';

export default function AsistenciaScreen() {
  const { cursoId, materiaId } = useLocalSearchParams<{ cursoId: string; materiaId: string }>();

  const materia = MATERIAS.find((m) => m.id === materiaId);
  const curso = CURSOS.find((c) => c.id === cursoId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Próximamente</Text>
      </View>
      <Text style={styles.title}>Pantalla de Asistencia</Text>
      <Text style={styles.subtitle}>
        {materia?.nombre ?? materiaId} — {curso ? `${curso.agrupamiento} ${curso.turno}` : cursoId}
      </Text>
      <Text style={styles.hint}>
        Acá va a vivir la carga de Presente / Salida-Regreso / No trabaja / Participa,
        con la lógica de Clase_Dictada y el cálculo automático de Tarde.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing.lg,
  },
  badgeText: { color: 'white', fontWeight: '700', fontSize: theme.typography.small },
  title: {
    fontSize: theme.typography.title,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.subtitle,
    color: theme.colors.primary,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
  },
  hint: {
    fontSize: theme.typography.body,
    color: theme.colors.muted,
    marginTop: theme.spacing.lg,
    lineHeight: 20,
  },
});
