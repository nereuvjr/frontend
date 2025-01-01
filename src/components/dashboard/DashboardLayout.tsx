import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { StatusBar } from '../status/StatusBar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-[calc(100vh-2rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-8">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <StatusBar />
    </div>
  );
}