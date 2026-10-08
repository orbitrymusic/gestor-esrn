import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../features/auth/session.provider';
import { useMateriasPorDocente } from '../../features/materias/useMateriasPorDocente';
import { Card } from '../../components/ui/Card';
import { AppButton } from '../../components/ui/AppButton';
import { theme } from '../../constants/theme';
import type { MateriaDictada } from '../../features/materias/materias.types';

export default function TeacherHome() {
  const { user, logout } = useSession();
  const { materias } = useMateriasPorDocente();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handlePressMateria = (item: MateriaDictada) => {
    router.push(
      `/teacher/curso/${item.cursoId}/materia/${item.materiaId}/asistencia`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis materias</Text>
        <Text style={styles.subtitle}>
          Hola, {user?.nombre} {user?.apellido} 👋 ({user?.area_del_personal})
        </Text>
      </View>

      <FlatList
        data={materias}
        keyExtractor={(item) => item.asignacionId}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>No tenés materias asignadas todavía.</Text>
        }
        renderItem={({ item }) => (
          <Card onPress={() => handlePressMateria(item)}>
            <Text style={styles.materiaNombre}>{item.nombreMateria}</Text>
            <Text style={styles.cursoLabel}>{item.cursoLabel}</Text>
            <Text style={styles.area}>{item.areaAsignatura}</Text>
          </Card>
        )}
      />

      <View style={styles.footer}>
        <AppButton title="Cerrar sesión" variant="danger" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: theme.spacing.lg },
  title: { fontSize: theme.typography.title, fontWeight: '700', color: theme.colors.text },
  subtitle: { fontSize: theme.typography.subtitle, color: theme.colors.muted, marginTop: theme.spacing.xs },
  listContent: { paddingHorizontal: theme.spacing.lg },
  empty: { color: theme.colors.muted, fontSize: theme.typography.body, marginTop: theme.spacing.lg },
  materiaNombre: { fontSize: theme.typography.subtitle, fontWeight: '700', color: theme.colors.text },
  cursoLabel: { fontSize: theme.typography.body, color: theme.colors.primary, marginTop: 2, fontWeight: '600' },
  area: { fontSize: theme.typography.small, color: theme.colors.muted, marginTop: 2 },
  footer: { padding: theme.spacing.lg },
});
