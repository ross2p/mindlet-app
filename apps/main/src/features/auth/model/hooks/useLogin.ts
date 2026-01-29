import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/auth/api/auth';
import type { LoginDto } from '@ross2p/types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginDto) => login(credentials),
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};