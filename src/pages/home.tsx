import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/login-form';
import { Navbar } from '@/components/navbar';
import { RegisterForm } from '@/components/register-form';
import { getToken } from '@/lib/token';

export function Home() {
  if (getToken()) {
    return <Navigate replace to="/rooms" />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="gap grid items-start gap-8 sm:grid-cols-1 md:grid-cols-2">
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
