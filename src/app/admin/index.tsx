import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../features/auth/session.provider';
import { AppButton } from '../../components/ui/AppButton';
import { theme } from '../../constants/theme';

export default function AdminHome() {
  const { user, logout } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>
      <Text style={styles.subtitle}>
        Hola, {user?.nombre} {user?.apellido} 👋
      </Text>
      <Text style={styles.hint}>
        Acá van a vivir las pantallas de carga de personal, alumnos, cursos y asignaciones.
      </Text>

      <View style={styles.footer}>
        <AppButton title="Cerrar sesión" variant="danger" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.lg, backgroundColor: theme.colors.background },
  title: { fontSize: theme.typography.title, fontWeight: '700', color: theme.colors.text, marginTop: theme.spacing.lg },
  subtitle: { fontSize: theme.typography.subtitle, color: theme.colors.muted, marginTop: theme.spacing.sm },
  hint: { fontSize: theme.typography.body, color: theme.colors.muted, marginTop: theme.spacing.lg },
  footer: { marginTop: theme.spacing.xl },
});
