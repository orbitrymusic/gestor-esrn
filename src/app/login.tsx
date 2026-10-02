import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../features/auth/session.provider';
import { listLoginableUsers } from '../features/auth/auth.service';

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
        <ActivityIndicator style={styles.loader} size="large" color="#0E6FB8" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => handleLogin(item.id)}>
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
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 6 },
  loader: { marginTop: 40 },
  listContent: { padding: 16, gap: 10 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  name: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  area: { fontSize: 12, color: '#64748B', marginTop: 4 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 6,
  },
  badgeAdmin: { backgroundColor: '#DBEAFE' },
  badgeProfesor: { backgroundColor: '#DCFCE7' },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#0F172A' },
});
