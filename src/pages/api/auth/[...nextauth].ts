import NextAuth, {
 Session,
 User as NextAuthUser,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import httpService from '../../../services/httpService';
import jwt from "jsonwebtoken";
import axios from "axios"
import { apiURL } from "../../../config/api"


interface AuthToken {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface User extends NextAuthUser {
  id: string;
  email?: string | null;
  authToken?: string;
}

interface SessionWithTokens extends Session {
  user: {
    id?:string;
    authToken?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default NextAuth({
  providers: [
   CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials) {
        throw new Error("No credentials provided");
      }

      try {
        const response = await httpService.post(
          `/auth/login`,
          {
            email: credentials.email,
            password: credentials.password,
          }
        );
        const { token } = response.data.data;

        if (token) {
          // Decode the token to get user information
          const decodedToken = jwt.decode(token) as AuthToken;
          return {
            id: decodedToken.id,
            email: decodedToken.email,
            authToken: token,
          } as User;
        } else {
          return null;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const status = error.response.status;
            const message =
              error.response.data?.message || "Authentication failed";

            console.error(
              `Authentication error: ${message} (status code: ${status})`
            );

            throw new Error(message);
          } else if (error.request) {
            console.error(
              "No response received from the authentication server"
            );
            throw new Error(
              "No response from server. Please try again later."
            );
          } else {
            console.error(
              "Error in setting up the authentication request:",
              error.message
            );
            throw new Error(
              "An error occurred while setting up the request. Please try again."
            );
          }
        } else {
          console.error("Unexpected error during authentication:", error);
          throw new Error("An unexpected error occurred. Please try again.");
        }
      }
    },
  }),
  ],
  pages: {
    signIn: "/login", // Adjust the login route as necessary
    error: "/error", // Customize your error page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user properties to token on first sign in
      if (user) {
        token.id = user.id;
        token.authToken = (user as User).authToken; // Include authToken if present
      }
      return token;
    },
    async session({ session, token }) {
      const sessionWithTokens = session as SessionWithTokens;
      // Make token properties available in the session
      sessionWithTokens.user = {
        ...session.user,
        id: token.id as string,
        authToken: token.authToken as string, 
      };
      return sessionWithTokens;
    }
  }, 
  session: {
    strategy: "jwt", // Use JWT strategy for session management
  },
  secret: "http://localhost:5000", // Ensure this is set in your environment
});
