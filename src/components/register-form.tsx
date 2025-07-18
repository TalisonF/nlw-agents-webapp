import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import md5 from 'md5';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export function RegisterForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const { mutateAsync: callRegister } = useRegister();

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = registerForm.formState;
  async function handleRegister({ name, email, password }: RegisterRequest) {
    const hashPassword = md5(password);
    const { userId } = await callRegister({
      name,
      email,
      password: hashPassword,
    });
    if (userId) {
      setSuccess(true);
      registerForm.reset();
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
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button className="w-full" disabled={isSubmitting} type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {success && (
          <div className="flex items-center gap-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
              <CheckCircle />
            </div>
            Cadastro realizado com sucesso!
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
