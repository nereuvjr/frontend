import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeToggle } from '../theme/ThemeToggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Scale,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Documentos', href: '/documentos' },
  { icon: Users, label: 'Clientes', href: '/clientes' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <aside
      className={cn(
        'h-full bg-background border-r flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="h-14 border-b flex items-center gap-2 px-4">
        <Scale className="h-6 w-6 text-primary flex-shrink-0" />
        {!collapsed && (
          <span className="font-semibold text-lg text-foreground truncate">
            Smart Cartório
          </span>
        )}
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center w-full rounded-md mb-1 transition-colors',
                collapsed ? 'px-2 py-2' : 'px-4 py-2',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-primary hover:text-primary-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t flex gap-2">
        <ThemeToggle collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 text-red-600" />
        </Button>
      </div>
    </aside>
  );
}
