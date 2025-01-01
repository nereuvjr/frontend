import { Scale } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function AuthSidebar() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-muted-foreground lg:flex lg:col-span-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-20 flex items-center gap-2">
        <Scale className="h-6 w-6" />
        <span className="text-lg font-medium">Smart Cartório</span>
      </div>

      <div className="relative z-20 mt-auto">
        <Card>
          <CardHeader>
            <blockquote className="space-y-2">
              <p className="text-lg">
                "O Smart Cartório revolucionou nossa forma de trabalhar. 
                A plataforma é intuitiva e eficiente, exatamente o que precisávamos."
              </p>
            </blockquote>
          </CardHeader>
          <CardContent>
            <footer className="text-sm">
              <p className="font-medium">Ana Silva</p>
              <p className="text-muted-foreground">Tabeliã em São Paulo</p>
            </footer>
          </CardContent>
        </Card>
      </div>

      <div className="relative z-20 mt-auto pt-8">
        <p className="text-sm text-muted-foreground">
          © 2024 Smart Cartório. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}