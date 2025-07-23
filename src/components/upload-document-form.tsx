import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, X } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
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

export function FileUploadFormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = useCallback((data: FormValues) => {
    console.log({ data });
  }, []);

  return (
    <Form {...form}>
      <form
        className="w-full max-w-md px-6"
        onSubmit={form.handleSubmit(onSubmit)}
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
        <Button className="mt-4" type="button">
          Enviar PDF
        </Button>
      </form>
    </Form>
  );
}
