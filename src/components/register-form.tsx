import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle, CircleX, Loader } from 'lucide-react';
import md5 from 'md5';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { RegisterRequest } from '@/http/types/register-request';
import { useRegister } from '@/http/use-register';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 6 caracteres' }),
  email: z.email({ message: 'insira um e-mail valido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  showLoginForm: () => void;
}

export function RegisterForm({ showLoginForm }: RegisterFormProps) {
  const { mutateAsync: callRegister } = useRegister();

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '!@testNoPass',
    },
  });

  const { isSubmitting } = registerForm.formState;
  async function handleRegister({ name, email, password }: RegisterRequest) {
    const hashPassword = md5(password);
    const { success: successCreateUser, errorMessage } = await callRegister({
      name,
      email,
      password: hashPassword,
    });

    if (successCreateUser) {
      toast('', {
        description: (
          <div className="flex items-center gap-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-900 p-2">
              <CheckCircle />
            </div>
            <p className="text-green-800">Cadastro realizado com sucesso!</p>
          </div>
        ),
      });
    } else {
      toast('', {
        description: (
          <div className="flex items-center gap-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-900">
              <CircleX />
            </div>
            <p className="text-red-800 dark:text-red-500">{errorMessage}</p>
          </div>
        ),
      });
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>
          Informe seu nome, email e uma senha para começar a usar a plataforma!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(handleRegister)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="Neil Armstrong"
                          type="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="user@email.com"
                          type="email"
                        />
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
                  'Cadastrar'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardContent>
        <Button onClick={() => showLoginForm()} variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Button>
      </CardContent>
    </Card>
  );
}
