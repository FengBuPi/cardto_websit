import { LoginProvider } from './context/use-login-context';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginProvider>
      {children}
    </LoginProvider>
  );
}
