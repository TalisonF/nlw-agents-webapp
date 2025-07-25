import { AudioLines, File, RefreshCcw, Type } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRoom } from '@/http/use-rom';
import { ChunkTable } from './table-audio-text';
import { DataTable } from './table-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

interface RoomSummaryProps {
  roomId: string;
}

export function RoomSummary({ roomId }: RoomSummaryProps) {
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);
  const { data, isFetching, refetch } = useRoom(roomId);
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
            <div className="flex items-center justify-between">
              <CardTitle>{data.room.name}</CardTitle>
              <div className="">
                <Button onClick={() => refetch()} variant="outline">
                  <RefreshCcw />
                </Button>
              </div>
            </div>
            <CardDescription className="mt-2 ml-3">
              <div className="whitespace-pre-line text-sm leading-relaxed">
                <Markdown>{data.room.resumeIA}</Markdown>
              </div>
            </CardDescription>
            <Accordion
              collapsible
              onClick={() => setIsOpenAccordion((state) => !state)}
              type="single"
              value={isOpenAccordion ? 'item-1' : ''}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-row gap-5">
                    <span>Dados:</span>
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
                </AccordionTrigger>
                <AccordionContent>
                  <DataTable data={data?.documents ?? []} />
                  <ChunkTable data={data.chunksRoom ?? []} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </CardHeader>
    </Card>
  );
}
