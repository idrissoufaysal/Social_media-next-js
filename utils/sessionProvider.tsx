import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface SessionWrapperProps {
  session: Session | null;
  children: React.ReactNode;
}

export const SessionWrapper: React.FC<SessionWrapperProps> = ({ session, children }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};
