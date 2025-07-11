import { ArrowLeft, Upload } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { QuestionForm } from '@/components/question-form';
import { QuestionList } from '@/components/question-list';
import { RoomSummary } from '@/components/room-summary';
import { Button } from '@/components/ui/button';

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to={`/room/${params.roomId}/dados`}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Upload className="size-4" />
                Enviar dados para I.A
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Sala de Perguntas
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>
        <RoomSummary roomId={params.roomId} />
        <div className="my-8">
          <QuestionForm roomId={params.roomId} />
        </div>
        <QuestionList roomId={params.roomId} />
      </div>
    </div>
  );
}
