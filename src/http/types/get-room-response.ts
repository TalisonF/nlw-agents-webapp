export type GetRoomResponse = {
  room: {
    id: string;
    name: string;
    resumeIA: string;
    description: string;
    createdAt: string;
  };
  documents: Array<{
    id: string;
    filename: string;
    resumeIA?: string;
    status: 'processing_queued' | 'processed' | 'process_fail';
    createdAt: string;
  }>;
  chunksRoom: Array<{
    id: string;
    text: string;
    typeOfInput: 'audio' | 'text';
    createdAt: string;
  }>;
};
