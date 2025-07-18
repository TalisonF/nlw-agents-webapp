import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/lib/token';
import type { GetRoomsQuestionsResponse } from './types/get-questions-response';

export function useRoomsQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomId}/questions`,
        {
          headers: {
            access_token: getToken(),
          },
        }
      );

      const result: GetRoomsQuestionsResponse = await response.json();

      return result;
    },
  });
}
