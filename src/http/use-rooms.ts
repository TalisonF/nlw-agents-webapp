import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/lib/token';
import type { GetRoomsResponse } from './types/get-rooms-response';

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms`,
        {
          headers: {
            access_token: getToken(),
          },
        }
      );

      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });
}
