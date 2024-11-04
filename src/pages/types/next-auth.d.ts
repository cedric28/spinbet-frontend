// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      authToken?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}