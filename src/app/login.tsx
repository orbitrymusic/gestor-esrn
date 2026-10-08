import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../features/auth/session.provider';
import { listLoginableUsers } from '../features/auth/auth.service';
import { Card } from '../components/ui/Card';
import { theme } from '../constants/theme';

export default function LoginScreen() {
  const { login, isLoading } = useSession();
  const router = useRouter();
  const usuarios = listLoginableUsers();

  const handleLogin = async (personalId: string) => {
    await login(personalId);
    router.replace('/'); // vuelve a "/" para que el redirect por rol haga su trabajo
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GestorESRN</Text>
        <Text style={styles.subtitle}>
          Fase de prueba: elegí con qué usuario querés ingresar (todavía sin contraseña).
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card onPress={() => handleLogin(item.id)}>
              <Text style={styles.name}>
                {item.apellido}, {item.nombre}
              </Text>
              <View
                style={[
                  styles.badge,
                  item.rol === 'admin' ? styles.badgeAdmin : styles.badgeProfesor,
                ]}
              >
                <Text style={styles.badgeText}>
                  {item.rol === 'admin' ? 'Admin' : 'Profesor'}
                </Text>
              </View>
              <Text style={styles.area}>{item.area_del_personal}</Text>
            </Card>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: theme.spacing.lg },
  title: { fontSize: theme.typography.title, fontWeight: '700', color: theme.colors.text },
  subtitle: { fontSize: theme.typography.small, color: theme.colors.muted, marginTop: theme.spacing.xs },
  loader: { marginTop: 40 },
  listContent: { paddingHorizontal: theme.spacing.lg },
  name: { fontSize: theme.typography.subtitle, fontWeight: '700', color: theme.colors.text },
  area: { fontSize: theme.typography.small, color: theme.colors.muted, marginTop: 2 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing.xs,
  },
  badgeAdmin: { backgroundColor: theme.colors.badgeAdminBg },
  badgeProfesor: { backgroundColor: theme.colors.badgeProfesorBg },
  badgeText: { fontSize: theme.typography.small, fontWeight: '700', color: theme.colors.text },
});
