import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Wait until the session is loaded
    if (session) {
    
      router.replace('/dashboard');
    } else {
     
      router.replace('/login');
    }
  }, [router, session, status]);

  return null;
};

export default Home;
