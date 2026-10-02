import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../features/auth/session.provider';

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

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginTop: 20 },
  subtitle: { fontSize: 15, color: '#475569', marginTop: 8 },
  hint: { fontSize: 13, color: '#94A3B8', marginTop: 16 },
  button: {
    marginTop: 24,
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '600' },
});
