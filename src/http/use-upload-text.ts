import { useMutation } from '@tanstack/react-query';
import type { UploadTextRequest } from './types/upload-text-request';
import type { UploadTextResponse } from './types/upload-text-response';

export function useUploadRoom(roomId: string) {
  return useMutation({
    mutationFn: async (data: UploadTextRequest) => {
      const response = await fetch(
        `http://localhost:3334/rooms/${roomId}/text`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result: UploadTextResponse = await response.json();

      return result;
    },
  });
}
