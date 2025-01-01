import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AuthHeader } from './AuthHeader';
import { AuthSidebar } from './AuthSidebar';

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-12 lg:px-0">
        <div className="relative flex h-full flex-col p-10 lg:col-span-8">
          <div className="absolute inset-0 bg-background" />
          <AuthHeader />
          <div className="relative z-20 flex items-center justify-center flex-1">
            <div className={cn('w-full max-w-md', className)}>
              {children}
            </div>
          </div>
        </div>
        <AuthSidebar />
      </div>
    </div>
  );
}