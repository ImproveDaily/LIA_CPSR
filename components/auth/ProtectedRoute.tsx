'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (!authStatus && pathname !== '/login') {
      router.push('/login');
    }

    if (authStatus && pathname === '/login') {
      router.push('/');
    }
  }, [pathname, router]);

  // Toon loading state tijdens de initiële check
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Toon geen content als niet ingelogd en niet op login pagina
  if (!isAuthenticated && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
} 