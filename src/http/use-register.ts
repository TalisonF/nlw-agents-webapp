import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from './types/register-request';

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
      const success = response.status === 201;
      const errorMessage =
        !success &&
        (response.status === 401
          ? 'E-mail já cadastrado.'
          : 'Falha ao criar usuário.');
      return { success, errorMessage };
    },
  });
}
