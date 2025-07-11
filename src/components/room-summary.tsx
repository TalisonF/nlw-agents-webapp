import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface RoomSummaryProps {
  roomId: string;
}

export function RoomSummary({ roomId }: RoomSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sala {roomId}</CardTitle>
        <CardDescription>Resumo da I.A.</CardDescription>
      </CardHeader>
    </Card>
  );
}
