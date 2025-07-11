import { ArrowLeft, Upload } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RecordAudio } from '@/components/upload-audio';
import { UploadTextForm } from '@/components/upload-text-form';

type UploadFilesParams = {
  roomId: string;
};

export function UploadFilesPage() {
  const params = useParams<UploadFilesParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to={`/room/${params.roomId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Perguntas
              </Button>
            </Link>
          </div>

          <div className="flex grid-cols-2 items-center gap-2">
            <Upload />
            <h1 className="font-bold text-3xl text-foreground">
              Envio de dados
            </h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Faça envio das informações que a IA ira usar para responder as
            questões da sala
          </p>
        </div>

        <div className="gap grid items-start gap-8 sm:grid-cols-1 md:grid-cols-2">
          <UploadTextForm roomId={params.roomId} />
          <RecordAudio roomId={params.roomId} />
        </div>
      </div>
    </div>
  );
}
