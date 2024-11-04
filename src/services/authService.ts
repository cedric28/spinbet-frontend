import { signIn } from 'next-auth/react';
import httpService from './httpService';

interface RegisterResponse {
 message: string;
 userId?: string;
}

export const authenticate = async (email: string, password: string) => {
  return signIn('credentials', { redirect: false, email, password });
};

export const registerUser = async (name:string, email: string, password: string): Promise<RegisterResponse> => {
 const response = await httpService.post<RegisterResponse>(`/auth/register`, { name,email, password });
 return response.data;
};