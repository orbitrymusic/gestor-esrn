import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../features/auth/session.provider';

export default function TeacherLayout() {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/login" />;
  }
  if (user.rol !== 'Profesor') {
    return <Redirect href="/admin" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
