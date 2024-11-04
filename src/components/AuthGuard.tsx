// src/components/AuthGuard.tsx
import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: ReactNode;
  redirectPath?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectPath = '/login'  }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(redirectPath);
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return session ? <>{children}</> : null;
};

export default AuthGuard;
