import { Redirect } from 'expo-router';
import { useSession } from '../features/auth/session.provider';

export default function Index() {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/login" />;
  }
  if (user.rol === 'admin') {
    return <Redirect href="/admin" />;
  }
  return <Redirect href="/teacher" />;
}
