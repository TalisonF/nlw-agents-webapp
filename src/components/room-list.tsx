import { ArrowRight, Loader, TicketX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRooms } from '@/http/use-rooms';
import { dayjs } from '@/lib/dayjs';
import { Alert, AlertTitle } from './ui/alert';

export function RoomList() {
  const { data, isFetching } = useRooms();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas criadas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isFetching && (
          <div className="flex items-center space-x-2">
            <Loader className="size-4 animate-spin text-primary" />
            <span className="text-primary text-sm italic">
              Buscando salas...
            </span>
          </div>
        )}
        {!isFetching && data.length === 0 && (
          <Alert variant="destructive">
            <TicketX />
            <AlertTitle>Você ainda não tem salas criadas.</AlertTitle>
          </Alert>
        )}
        {!isFetching &&
          data?.map((room) => {
            return (
              <Link
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                key={room.id}
                to={`/room/${room.id}`}
              >
                <div className="flex-1 flex-col gap-1">
                  <h3 className="font-medium ">{room.name}</h3>
                  <h3 className="mb-1 text-muted-foreground text-sm">
                    {room.description}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge className=" text-xs" variant="secondary">
                      {dayjs(room.createdAt).fromNow()}
                    </Badge>
                    <Badge className=" text-xs" variant="secondary">
                      {room.questionsCount} pergunta(s)
                    </Badge>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-small">
                  Entrar <ArrowRight className="size-3" />
                </span>
              </Link>
            );
          })}
      </CardContent>
    </Card>
  );
}
