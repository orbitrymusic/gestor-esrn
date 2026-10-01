import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { ALUMNOS } from '../lib/data/mock/alumnos';

export default function SmokeTestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Prueba de Humo: ESRN</Text>
        <Text style={styles.subtitle}>
          Lista de Alumnos Mock ({ALUMNOS.length} registros)
        </Text>
      </View>

      <FlatList
        data={ALUMNOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.studentName}>
                {item.apellido}, {item.nombre}
              </Text>
              <View style={[styles.badge, item.activo ? styles.badgeActive : styles.badgeInactive]}>
                <Text style={[styles.badgeText, item.activo ? styles.badgeTextActive : styles.badgeTextInactive]}>
                  {item.activo ? 'Activo' : 'Baja'}
                </Text>
              </View>
            </View>

            <Text style={styles.detailText}>DNI: {item.dni}</Text>
            <Text style={styles.detailText}>ID Interno: {item.id}</Text>

            {item.email_personal && (
              <Text style={styles.emailText}>{item.email_personal}</Text>
            )}

            {item.observaciones_generales && (
              <View style={styles.obsContainer}>
                <Text style={styles.obsText}>Obs: {item.observaciones_generales}</Text>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  listContent: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  studentName: { fontSize: 16, fontWeight: '600', color: '#1F2937', flex: 1, marginRight: 8 },
  detailText: { fontSize: 13, color: '#4B5563', marginTop: 2 },
  emailText: { fontSize: 12, color: '#2563EB', marginTop: 4 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeActive: { backgroundColor: '#D1FAE5' },
  badgeInactive: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextActive: { color: '#065F46' },
  badgeTextInactive: { color: '#991B1B' },
  obsContainer: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  obsText: { fontSize: 12, fontStyle: 'italic', color: '#6B7280' },
});