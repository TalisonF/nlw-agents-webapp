import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/lib/token';
import type { GetRoomResponse } from './types/get-room-response';

export function useRoom(roomId: string) {
  return useQuery({
    queryKey: ['get-room', roomId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/room/${roomId}`,
        {
          headers: {
            Authorization: getToken(),
          },
        }
      );

      const result: GetRoomResponse = await response.json();

      return result;
    },
  });
}
