import { Database } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export function StatusConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [responseTime, setResponseTime] = useState<number | null>(null);

  const checkConnection = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const startTime = performance.now();
      const { data, error: supabaseError } = await supabase
        .from('test_connection')
        .select('*')
        .limit(1);
      const endTime = performance.now();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setIsConnected(true);
      setError(null);
      setResponseTime(Math.round(endTime - startTime));
    } catch (error) {
      setIsConnected(false);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      setResponseTime(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Verifica a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
      <div className={cn(
        'w-2 h-2 rounded-full',
        isLoading ? 'bg-yellow-500' : 
        isConnected ? 'bg-green-500' : 'bg-red-500'
      )} />
      <Database className="w-4 h-4" />
      <div className="flex flex-col">
        <span>
          {isLoading ? 'Verificando conexão...' : 
           isConnected ? `Conectado ao banco (${responseTime}ms)` : 'Desconectado'}
        </span>
        {error && (
          <span className="text-xs text-red-500">
            Erro: {error}
          </span>
        )}
      </div>
      {!isLoading && !isConnected && (
        <button 
          onClick={checkConnection}
          className="text-sm text-blue-500 hover:underline"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
