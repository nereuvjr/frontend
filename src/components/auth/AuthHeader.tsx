import { Scale } from 'lucide-react';

export function AuthHeader() {
  return (
    <div className="relative z-20 flex items-center gap-2">
      <Scale className="h-8 w-8 text-primary" />
      <span className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Smart Cartório
      </span>
    </div>
  );
}