import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from './types/register-request';
import type { registerResponse } from './types/register-response';

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result: registerResponse = await response.json();

      return result;
    },
  });
}
