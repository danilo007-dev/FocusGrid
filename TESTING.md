# Guia de Testes - FocusGrid API

## Rodando os Testes de Integração

### Pré-requisitos
1. Banco de dados MariaDB/MySQL deve estar rodando
2. Variáveis de ambiente configuradas em `.env`
3. Backend e frontend devem estar rodando

### Procedimento

#### 1. Inicie o Servidor Backend
```bash
cd backend
npm run dev
```
O servidor deve estar rodando em `http://localhost:3000/api`

#### 2. Em outro terminal, Execute os Testes
```bash
cd backend
npm test
```

#### 3. Veja os Resultados
O script de teste irá:
- Registrar um novo usuário
- Fazer login com as credenciais
- Criar tarefas com subtarefas
- Criar metas com passos
- Criar rotinas com passos
- Testar atualização de estados
- Testar deleção de recursos
- Testar validações de erro (401, 404)

### Exemplo de Saída

```
🧪 Iniciando testes de integração da API FocusGrid
📡 URL da API: http://localhost:3000/api

📝 [1] Testando Registro...
✓ Status de registro deve ser 201
✓ Token deve ser retornado após registro
✓ User ID deve ser retornado
...
✅ Testes Passaram: 20
❌ Testes Falharam: 0
📊 Total: 20 testes
==================================================
🎉 Todos os testes passaram com sucesso!
```

## Testando com Insomnia

### Importar Coleção
1. Abra o [Insomnia](https://insomnia.rest/)
2. Clique em "Create" → "Import"
3. Selecione o arquivo `FocusGrid-Insomnia.json`

### Configurar Ambiente
1. Selecione o ambiente "Development"
2. Defina as variáveis:
   - `base_url`: `http://localhost:3000/api`
   - `token`: (deixe vazio inicialmente)

### Fluxo de Teste Manual

1. **POST** `/auth/register` - Registre um novo usuário
2. Copie o token da resposta para a variável `token`
3. **POST** `/auth/login` - Faça login (também fornece novo token)
4. **POST** `/tasks` - Crie uma tarefa com subtarefas
5. Copie o `task_id` da resposta
6. **GET** `/tasks/{task_id}` - Obtenha a tarefa
7. **PATCH** `/tasks/{task_id}/subtasks/{subtask_id}` - Marque subtarefa como concluída
8. **POST** `/goals` - Crie uma meta com passos
9. **POST** `/routines` - Crie uma rotina com passos

## Validações Implementadas

### Autenticação
- ✓ Email válido (formato regex)
- ✓ Senha mínimo 8 caracteres
- ✓ Nome mínimo 2 caracteres
- ✓ E-mail único por usuário (409 Conflict)
- ✓ Token JWT com 7 dias de expiração

### Tarefas
- ✓ Título obrigatório (não vazio)
- ✓ Título máximo 255 caracteres
- ✓ Duração deve ser inteiro positivo
- ✓ Data deve ser válida (YYYY-MM-DD)
- ✓ Progresso calculado automaticamente (0-100%)
- ✓ Propriedade de usuário (isolamento multi-tenant)

### Metas
- ✓ Título obrigatório
- ✓ Passos obrigatórios (mínimo 1)
- ✓ Progresso recalculado ao concluir passos
- ✓ Propriedade de usuário garantida

### Rotinas
- ✓ Título obrigatório
- ✓ Passos obrigatórios (mínimo 1)
- ✓ Favoritos persistem
- ✓ Propriedade de usuário garantida

## Códigos de Status Testados

| Código | Cenário |
|--------|---------|
| 200 | Requisições bem-sucedidas (GET, PATCH) |
| 201 | Recurso criado com sucesso |
| 204 | Deleção bem-sucedida (sem corpo) |
| 400 | Validação falhou (dados inválidos) |
| 401 | Token ausente ou inválido |
| 404 | Recurso não encontrado |
| 409 | E-mail já cadastrado |
| 500 | Erro interno do servidor |

## Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend/`:

```env
# Banco de dados
DATABASE_URL="mysql://usuario:senha@localhost/focusgrid"
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=focusgrid

# Servidor
PORT=3000
FRONTEND_URL="http://localhost:5173"

# JWT
JWT_SECRET="seu-segredo-longo-e-aleatorio-aqui"
```

## Solução de Problemas

### "Erro: Falha na conexão com banco de dados"
- Verifique se MariaDB/MySQL está rodando
- Verifique as credenciais em `.env`
- Teste a conexão: `mysql -h localhost -u root -p`

### "401 Unauthorized" nos testes
- Verifique se o token foi copiado corretamente
- Verifique se `JWT_SECRET` está configurado
- Tokens expiram em 7 dias

### "404 Not Found"
- Verifique se o ID do recurso está correto
- Verifique se você está usando o `Bearer` token
- Confirme que você é o dono do recurso

## Documentação Completa

Veja [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) para documentação detalhada de todos os endpoints.
