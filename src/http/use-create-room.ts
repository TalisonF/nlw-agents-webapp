import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getToken } from '@/lib/token';
import type { CreateRoomRequest } from './types/create-room-request';

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
          },
          body: JSON.stringify(data),
        }
      );
      const result: CreateRoomRequest = await response.json();

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
    },
  });
}
