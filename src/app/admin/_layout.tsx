import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../features/auth/session.provider';

export default function AdminLayout() {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/login" />;
  }
  if (user.rol !== 'admin') {
    return <Redirect href="/teacher" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
