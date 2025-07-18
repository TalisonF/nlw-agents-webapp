import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useCreateRoom } from '@/http/use-create-room';
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
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres.' }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { isSubmitting } = createRoomForm.formState;
  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({
      name,
      description,
    });
    createRoomForm.reset();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da I.A. com base nas informações enviadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Digite o nome da sala"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                'Criar sala'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
