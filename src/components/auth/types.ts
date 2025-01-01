import { ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}