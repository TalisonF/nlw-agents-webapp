import { useMutation } from '@tanstack/react-query';
import type { LoginRequest } from './types/login-request';
import type { loginResponse } from './types/login-response';

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result: loginResponse = await response.json();

      return result;
    },
  });
}
