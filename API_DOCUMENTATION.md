# FocusGrid API - Documentação de Endpoints

## Base URL
```
http://localhost:3000/api
```

## Autenticação

Todos os endpoints, exceto autenticação, requerem o cabeçalho:
```
Authorization: Bearer {token}
```

---

## Autenticação

### 1. Registrar
**POST** `/auth/register`

Cria uma nova conta de usuário.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha-segura-123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2026-08-31T10:00:00.000Z"
  }
}
```

### 2. Entrar (Login)
**POST** `/auth/login`

Autentica o usuário e retorna um token JWT válido por 7 dias.

**Request:**
```json
{
  "email": "joao@example.com",
  "password": "senha-segura-123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2026-08-31T10:00:00.000Z"
  }
}
```

### 3. Obter Dados Atuais
**GET** `/auth/me`

Retorna os dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2026-08-31T10:00:00.000Z"
  }
}
```

---

## Tarefas

### 1. Listar Tarefas
**GET** `/tasks?date=2026-08-31`

Lista todas as tarefas do usuário. O parâmetro `date` é opcional e filtra por data (YYYY-MM-DD).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": "task-1",
      "title": "Estudar Biologia",
      "duration": 30,
      "estimatedTime": null,
      "dueDate": "2026-08-31",
      "completed": false,
      "completedAt": null,
      "progress": 0,
      "timeOfDay": "09:00",
      "color": "#A8E6CF",
      "createdAt": "2026-08-31T10:00:00.000Z",
      "updatedAt": "2026-08-31T10:00:00.000Z",
      "subtasks": [
        {
          "id": "subtask-1",
          "title": "Abrir caderno",
          "completed": false,
          "position": 0
        }
      ]
    }
  ]
}
```

### 2. Obter Tarefa
**GET** `/tasks/{taskId}`

Retorna uma tarefa específica com seus dados completos.

**Response (200 OK):**
```json
{
  "task": {
    "id": "task-1",
    "title": "Estudar Biologia",
    "duration": 30,
    "estimatedTime": null,
    "dueDate": "2026-08-31",
    "completed": false,
    "completedAt": null,
    "progress": 0,
    "timeOfDay": "09:00",
    "color": "#A8E6CF",
    "createdAt": "2026-08-31T10:00:00.000Z",
    "updatedAt": "2026-08-31T10:00:00.000Z",
    "subtasks": [
      {
        "id": "subtask-1",
        "title": "Abrir caderno",
        "completed": false,
        "position": 0
      }
    ]
  }
}
```

### 3. Criar Tarefa
**POST** `/tasks`

Cria uma nova tarefa com subtarefas opcionais.

**Request:**
```json
{
  "title": "Estudar Biologia",
  "duration": 30,
  "estimatedTime": null,
  "dueDate": "2026-08-31",
  "timeOfDay": "09:00",
  "color": "#A8E6CF",
  "subtasks": [
    { "title": "Abrir caderno" },
    { "title": "Ler capítulo" }
  ]
}
```

**Response (201 Created):**
```json
{
  "task": { /* dados da tarefa */ }
}
```

### 4. Atualizar Tarefa
**PATCH** `/tasks/{taskId}`

Atualiza qualquer campo da tarefa.

**Request:**
```json
{
  "title": "Estudar Biologia (Atualizado)",
  "completed": false,
  "progress": 50
}
```

**Response (200 OK):**
```json
{
  "task": { /* dados atualizados */ }
}
```

### 5. Excluir Tarefa
**DELETE** `/tasks/{taskId}`

Remove uma tarefa e suas subtarefas.

**Response (204 No Content)**

### 6. Atualizar Subtarefa
**PATCH** `/tasks/{taskId}/subtasks/{subtaskId}`

Atualiza uma subtarefa (ex: marca como concluída). Atualiza automaticamente o progresso da tarefa.

**Request:**
```json
{
  "completed": true,
  "title": "Novo título (opcional)"
}
```

**Response (200 OK):**
```json
{
  "subtask": {
    "id": "subtask-1",
    "title": "Abrir caderno",
    "completed": true,
    "position": 0
  }
}
```

---

## Metas

### 1. Listar Metas
**GET** `/goals`

Lista todas as metas do usuário.

**Response (200 OK):**
```json
{
  "goals": [
    {
      "id": "goal-1",
      "title": "Entrar na faculdade",
      "dream": "Conseguir bolsa integral",
      "description": "Conseguir bolsa integral",
      "progress": 50,
      "completed": false,
      "completedSteps": 1,
      "type": null,
      "scheduledDate": null,
      "createdAt": "2026-08-31T10:00:00.000Z",
      "updatedAt": "2026-08-31T10:00:00.000Z",
      "steps": [
        {
          "id": "step-1",
          "title": "Pesquisar cursos",
          "completed": true,
          "position": 0
        }
      ]
    }
  ]
}
```

### 2. Criar Meta
**POST** `/goals`

Cria uma nova meta com passos opcionais.

**Request:**
```json
{
  "title": "Entrar na faculdade",
  "dream": "Conseguir bolsa integral em universidade pública",
  "steps": [
    { "title": "Pesquisar cursos" },
    { "title": "Preparar para ENEM" }
  ]
}
```

**Response (201 Created):**
```json
{
  "goal": { /* dados da meta */ }
}
```

### 3. Excluir Meta
**DELETE** `/goals/{goalId}`

Remove uma meta e seus passos.

**Response (204 No Content)**

### 4. Atualizar Passo da Meta
**PATCH** `/goals/{goalId}/steps/{stepId}`

Marca um passo como concluído. O progresso da meta é recalculado automaticamente.

**Request:**
```json
{
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "step": {
    "id": "step-1",
    "title": "Pesquisar cursos",
    "completed": true,
    "position": 0
  }
}
```

---

## Rotinas

### 1. Listar Rotinas
**GET** `/routines`

Lista todas as rotinas do usuário.

**Response (200 OK):**
```json
{
  "routines": [
    {
      "id": "routine-1",
      "title": "Rotina Matinal",
      "description": "Comece o dia com energia",
      "icon": "sun",
      "colorKey": "green",
      "isFavorite": true,
      "scheduledDate": null,
      "createdAt": "2026-08-31T10:00:00.000Z",
      "updatedAt": "2026-08-31T10:00:00.000Z",
      "steps": [
        {
          "id": "rstep-1",
          "title": "Beber água",
          "duration": "1 min",
          "completed": false,
          "position": 0
        }
      ]
    }
  ]
}
```

### 2. Criar Rotina
**POST** `/routines`

Cria uma nova rotina com passos obrigatórios.

**Request:**
```json
{
  "title": "Rotina Matinal",
  "description": "Comece o dia com energia",
  "icon": "sun",
  "colorKey": "green",
  "steps": [
    { "title": "Beber água", "duration": "1 min" },
    { "title": "Alongamento", "duration": "5 min" }
  ]
}
```

**Response (201 Created):**
```json
{
  "routine": { /* dados da rotina */ }
}
```

### 3. Atualizar Rotina
**PATCH** `/routines/{routineId}`

Atualiza a rotina (ex: marcar como favorita).

**Request:**
```json
{
  "isFavorite": true,
  "title": "Novo título (opcional)"
}
```

**Response (200 OK):**
```json
{
  "routine": { /* dados atualizados */ }
}
```

### 4. Atualizar Passo da Rotina
**PATCH** `/routines/{routineId}/steps/{stepId}`

Marca um passo como concluído.

**Request:**
```json
{
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "step": {
    "id": "rstep-1",
    "title": "Beber água",
    "duration": "1 min",
    "completed": true,
    "position": 0
  }
}
```

---

## Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200    | OK - Requisição bem-sucedida |
| 201    | Created - Recurso criado com sucesso |
| 204    | No Content - Sucesso sem corpo de resposta |
| 400    | Bad Request - Dados inválidos |
| 401    | Unauthorized - Token ausente ou inválido |
| 404    | Not Found - Recurso não encontrado |
| 409    | Conflict - E-mail já cadastrado |
| 500    | Internal Server Error - Erro do servidor |
| 503    | Service Unavailable - Banco de dados indisponível |

---

## Importar no Insomnia

1. Abra o Insomnia
2. Clique em "Create" > "Import"
3. Selecione o arquivo `FocusGrid-Insomnia.json`
4. Configure as variáveis de ambiente:
   - `base_url`: `http://localhost:3000/api`
   - `token`: Cole o token obtido ao fazer login

## Exemplo de Fluxo Completo

1. **Registrar**: POST `/auth/register`
2. **Copiar token** da resposta para a variável `token`
3. **Criar tarefa**: POST `/tasks`
4. **Listar tarefas**: GET `/tasks`
5. **Concluir subtarefa**: PATCH `/tasks/{taskId}/subtasks/{subtaskId}`
