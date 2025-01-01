import { StatusConnection } from './StatusConnection';
import { StatusUser } from './StatusUser';

export function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-background border-t flex items-center px-4 text-sm text-muted-foreground">
      <div className="flex-1 flex items-center gap-4">
        <StatusConnection />
        <div className="w-px h-4 bg-border" />
        <StatusUser />
      </div>
    </div>
  );
}
