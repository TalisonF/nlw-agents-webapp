import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useUploadRoom } from '@/http/use-upload-text';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';

interface UploadTextProps {
  roomId: string;
}

const UploadTextSchema = z.object({
  text: z
    .string()
    .min(20, { message: 'Inclua no mínimo 20 caracteres.' })
    .max(500, { message: 'O texto não pode ultrapassar 500 caracteres.' }),
});

type uploadTextFormData = z.infer<typeof UploadTextSchema>;

export function UploadTextForm({ roomId }: UploadTextProps) {
  const { mutateAsync: uploadText } = useUploadRoom(roomId);

  const uploadTextForm = useForm<uploadTextFormData>({
    resolver: zodResolver(UploadTextSchema),
    defaultValues: {
      text: '',
    },
  });

  const { isSubmitting } = uploadTextForm.formState;

  async function handleUploadText({ text }: uploadTextFormData) {
    await uploadText({
      text,
    });
    uploadTextForm.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Texto</CardTitle>
        <CardDescription>
          Envie textos que a IA ira usar para responder as questões da sala
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...uploadTextForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={uploadTextForm.handleSubmit(handleUploadText)}
          >
            <FormField
              control={uploadTextForm.control}
              name="text"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Texto</FormLabel>
                    <FormControl>
                      <Textarea disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="w-full" disabled={isSubmitting} type="submit">
              Enviar Texto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
