import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/login-form';
import { Navbar } from '@/components/navbar';
import { RegisterForm } from '@/components/register-form';
import { getToken } from '@/lib/token';

export function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>();

  if (getToken()) {
    return <Navigate replace to="/rooms" />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8 ">
        <div className="flex flex-row justify-center">
          {showRegisterForm ? (
            <RegisterForm
              showLoginForm={() => {
                setShowRegisterForm(false);
              }}
            />
          ) : (
            <LoginForm
              showRegisterForm={() => {
                setShowRegisterForm(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
