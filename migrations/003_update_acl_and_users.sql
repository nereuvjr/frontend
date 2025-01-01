-- Criação da tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criação da tabela de roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criação da tabela de permissões
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de associação entre roles e permissões
CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Tabela de associação entre usuários e roles
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Função para verificar permissões
CREATE OR REPLACE FUNCTION has_permission(user_id UUID, permission TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE ur.user_id = has_permission.user_id
        AND p.name = has_permission.permission
    ) INTO has_permission;

    RETURN has_permission;
END;
$$ LANGUAGE plpgsql;

-- Políticas RLS para a tabela users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para a tabela roles
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view roles" ON roles
FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas RLS para a tabela permissions
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view permissions" ON permissions
FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas RLS para a tabela role_permissions
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view role permissions" ON role_permissions
FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas RLS para a tabela user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
