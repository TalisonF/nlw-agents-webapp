import { zodResolver } from '@hookform/resolvers/zod';
import md5 from 'md5';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

export function LoginForm() {
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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
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
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
