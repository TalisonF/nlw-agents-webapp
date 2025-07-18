import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/lib/token';
import type { userResponse } from './types/user-response';

export function useUser() {
  return useQuery({
    queryKey: ['get-user'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        {
          headers: {
            access_token: getToken(),
          },
        }
      );

      if (response.status !== 200) {
        return { id: '', name: '', email: '' };
      }

      const result: userResponse = await response.json();

      return result;
    },
  });
}
