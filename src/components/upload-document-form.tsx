import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircle,
  CircleX,
  CloudUpload,
  Loader,
  Loader2,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getToken } from '@/lib/token';

type uploadDocumentProps = {
  roomId: string;
};

const formSchema = z.object({
  files: z
    .array(z.custom<File>())
    .min(1, 'Selecione 1 documento pdf!')
    .refine((files) => files.every((file) => file.size <= 7 * 1024 * 1024), {
      message: 'Tamanho maxixo de 7MB!',
      path: ['files'],
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function UploadDocument({ roomId }: uploadDocumentProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  async function upload(documentForUpload: Blob, fileName: string) {
    const formData = new FormData();
    formData.append('file', documentForUpload, fileName);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomId}/document`,
      {
        method: 'POST',
        headers: {
          Authorization: getToken(),
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (result.documentId) {
      toast('', {
        description: (
          <div className="flex items-center gap-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-900 p-2">
              <CheckCircle />
            </div>
            <div className="flex items-center gap-2 text-green-800">
              PDF recebido, inciando processamento{' '}
              <Loader2 className="size-4 animate-spin" />
            </div>
          </div>
        ),
      });
    } else {
      toast('', {
        description: (
          <div className="flex items-center gap-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-900 p-2">
              <CircleX />
            </div>
            Falha ao enviar PDF!
          </div>
        ),
      });
    }
  }
  const { isSubmitting } = form.formState;
  async function handleUpload(data: FormValues) {
    await upload(data.files[0], data.files[0].name);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="w-full max-w-md px-6"
        onSubmit={form.handleSubmit(handleUpload)}
      >
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold leading-none">
                Documentos PDF
              </FormLabel>
              <FormControl>
                <FileUpload
                  accept="application/pdf"
                  maxFiles={1}
                  maxSize={7 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError('files', {
                      message,
                    });
                  }}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                    <CloudUpload className="size-4" />
                    Arraste e solte ou
                    <FileUploadTrigger asChild>
                      <Button className="p-0" size="sm" variant="link">
                        escolha um PDF
                      </Button>
                    </FileUploadTrigger>
                    para upload
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value.map((file) => (
                      <FileUploadItem key={file.name} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            className="size-7"
                            size="icon"
                            variant="ghost"
                          >
                            <X />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>Envie PDF de até 7MB.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            'Enviar PDF'
          )}
        </Button>
      </form>
    </Form>
  );
}
