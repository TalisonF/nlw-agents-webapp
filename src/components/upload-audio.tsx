/** biome-ignore-all lint/suspicious/noConsole: dev */

import {
  AudioLines,
  Radio,
  Radius,
  RefreshCcwDot,
  RefreshCw,
  StopCircle,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type RecordAudioProps = {
  roomId: string;
};

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

export function RecordAudio({ roomId }: RecordAudioProps) {
  const [isRecording, setIsRecording] = useState(false);
  const audio = useRef<MediaStream | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function createRecorder(audioForCapture: MediaStream) {
    recorder.current = new MediaRecorder(audioForCapture, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!');
    };

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada!');
    };
    recorder.current.start();
  }
  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não suporta gravação');
      return;
    }
    setIsRecording(true);

    audio.current = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });
    createRecorder(audio.current);
    intervalRef.current = setInterval(() => {
      recorder.current?.stop();
      createRecorder(audio.current);
    }, 5000);
  }

  function stopRecording() {
    setIsRecording(false);
    if (recorder.current && recorder?.current.state !== 'inactive') {
      recorder.current.stop();
      // biome-ignore lint/complexity/noForEach: in-dev
      audio.current.getAudioTracks()?.forEach((track) => {
        if (track.readyState === 'live') {
          track.stop();
        }
      });
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audioForUpload: Blob) {
    const formData = new FormData();
    formData.append('file', audioForUpload, 'audio.webm');

    const response = await fetch(
      `http://localhost:3334/rooms/${roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio</CardTitle>
        <CardDescription>
          Você pode falar para a IA as informações que deseja nas respostas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-card p-5">
          {isRecording ? (
            <Button onClick={stopRecording}>
              <StopCircle className="size-4" />
              Parar gravação
            </Button>
          ) : (
            <Button onClick={startRecording}>
              <Radio className="size-4" />
              Iniciar Gravação
            </Button>
          )}
          {isRecording && (
            <div className="flex grid-cols-2 items-center gap-2">
              <Radius className="size-4 animate-spin text-primary" />
              <p>Gravando</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
