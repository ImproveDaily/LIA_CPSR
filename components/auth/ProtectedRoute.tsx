'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session && pathname !== '/login') {
      router.push('/login');
    }

    if (session && pathname === '/login') {
      router.push('/');
    }
  }, [session, status, router, pathname]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
} 