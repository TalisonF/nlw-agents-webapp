import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import md5 from 'md5';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/http/use-login';
import { setToken } from '@/lib/token';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

const loginSchema = z.object({
  email: z.email({ message: 'Insira um e-mail valido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

type loginFormData = z.infer<typeof loginSchema>;

interface loginProps {
  showRegisterForm: () => void;
}

export function LoginForm({ showRegisterForm }: loginProps) {
  const { mutateAsync: callLogin } = useLogin();
  const navigate = useNavigate();

  const loginForm = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = loginForm.formState;

  async function handleLogin({ email, password }: loginFormData) {
    const hashPassword = md5(password);
    const { accessToken } = await callLogin({
      email,
      password: hashPassword,
    });
    if (accessToken) {
      setToken(accessToken);
      navigate('/rooms');
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
        <CardDescription>
          insira seu e-mail e senha abaixo para acessar sua conta
        </CardDescription>

        <CardAction>
          <Button onClick={() => showRegisterForm()} variant="link">
            Cadastre-se
          </Button>
        </CardAction>
      </CardHeader>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleLogin)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <FormField
                control={loginForm.control}
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
                control={loginForm.control}
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
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex-col gap-2">
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
