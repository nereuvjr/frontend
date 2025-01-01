import { User as UserIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export function StatusUser() {
  const { user } = useAuth();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;

      try {
        // Buscar informações básicas do usuário
        interface UserInfo {
          full_name: string;
          roles: string[];
          permissions: string[];
        }

        const userInfo: UserInfo = {
          full_name: 'Usuário',
          roles: [],
          permissions: []
        };

        // Tentar buscar nome completo
        try {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', user.id)
            .single();
          
          if (!userError && userData) {
            userInfo.full_name = userData.full_name;
          }
        } catch (error) {
          console.warn('Erro ao buscar nome do usuário:', error);
        }

        // Tentar buscar roles e permissões
        try {
          // Buscar roles do usuário
          const { data: rolesData, error: rolesError } = await supabase
            .from('user_roles')
            .select('role_id')
            .eq('user_id', user.id);

          if (!rolesError && rolesData) {
            for (const role of rolesData) {
              // Buscar nome da role
              const { data: roleInfo, error: roleInfoError } = await supabase
                .from('roles')
                .select('name')
                .eq('id', role.role_id)
                .single();

              if (!roleInfoError && roleInfo) {
                userInfo.roles.push(roleInfo.name);

                // Buscar permissões da role
                const { data: permissionsData, error: permissionsError } = await supabase
                  .from('role_permissions')
                  .select('permission_id')
                  .eq('role_id', role.role_id);

                if (!permissionsError && permissionsData) {
                  for (const permission of permissionsData) {
                    const { data: permissionInfo, error: permissionInfoError } = await supabase
                      .from('permissions')
                      .select('name')
                      .eq('id', permission.permission_id)
                      .single();

                    if (!permissionInfoError && permissionInfo) {
                      userInfo.permissions.push(permissionInfo.name);
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          console.warn('Erro ao buscar roles e permissões:', error);
        }

        // Atualizar estado com as informações
        const uniquePermissions = [...new Set(userInfo.permissions)].join(', ');
        setRole(`${userInfo.full_name} • ${userInfo.roles.join(', ')} • Permissões: ${uniquePermissions}`);
      } catch (error) {
        console.error('Erro geral ao buscar informações:', error);
        setRole('Erro ao carregar informações');
      }
    };

    fetchUserInfo();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <UserIcon className="w-4 h-4" />
        <span>Não autenticado</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <UserIcon className="w-4 h-4" />
      <span>
        {user.email} • {role || 'Sem role definida'}
      </span>
    </div>
  );
}
