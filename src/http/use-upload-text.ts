import { useMutation } from '@tanstack/react-query';
import { getToken } from '@/lib/token';
import type { UploadTextRequest } from './types/upload-text-request';
import type { UploadTextResponse } from './types/upload-text-response';

export function useUploadRoom(roomId: string) {
  return useMutation({
    mutationFn: async (data: UploadTextRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomId}/text`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            access_token: getToken(),
          },
          body: JSON.stringify(data),
        }
      );
      const result: UploadTextResponse = await response.json();

      return result;
    },
  });
}
