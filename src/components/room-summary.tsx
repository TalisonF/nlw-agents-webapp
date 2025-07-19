import { AudioLines, File, Type } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRoom } from '@/http/use-rom';
import { Skeleton } from './ui/skeleton';

interface RoomSummaryProps {
  roomId: string;
}

export function RoomSummary({ roomId }: RoomSummaryProps) {
  const { data, isFetching } = useRoom(roomId);
  return (
    <Card>
      <CardHeader>
        {isFetching ? (
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <>
            <CardTitle>Sala: {data.room.name}</CardTitle>
            <CardDescription className="mt-2 ml-3">
              <b>Resumo da sala:</b> {data.room.resumeIA}
            </CardDescription>
            <div className="mt-8 flex flex-row gap-5">
              <span>Dados recebidos pela I.A:</span>
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-row items-center justify-center gap-2">
                  <File />
                  {data.documents.length}
                </div>

                <div className="flex flex-row items-center justify-center gap-2">
                  <AudioLines />
                  {
                    data.chunksRoom.filter(
                      (chunk) => chunk.typeOfInput === 'audio'
                    ).length
                  }
                </div>

                <div className="flex flex-row items-center justify-center gap-2">
                  <Type />
                  {
                    data.chunksRoom.filter(
                      (chunk) => chunk.typeOfInput === 'text'
                    ).length
                  }
                </div>
              </div>
            </div>
          </>
        )}
      </CardHeader>
    </Card>
  );
}
