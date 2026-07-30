# 📊 Relatório de Análise do Projeto

## 1. 🏗️ Identificação e visão geral

- **Nome do projeto:** FocusGrid
- **Objetivo identificado:** Reduzir a fricção entre intenção e ação, apoiando usuários na captura de ideias, organização de tarefas e execução em passos menores.
- **Problema que o sistema pretende resolver:** Dificuldades de foco, procrastinação, priorização, gestão do tempo e início de tarefas, especialmente para pessoas com TDAH.
- **Funcionalidades do MVP descritas:**
  - onboarding inicial;
  - dashboard com tarefas do dia;
  - captura rápida de tarefas e ideias;
  - organização por período do dia;
  - criação de subtarefas com sugestão de IA simulada;
  - modo foco com timer;
  - marcação de subtarefas;
  - progresso e taxa de conclusão;
  - rotinas, metas, calendário, mente livre, assistente IA e configurações.
- **Tecnologias principais:**
  - React 18
  - TypeScript
  - Vite
  - React Router
  - Tailwind CSS v4
  - Node.js
  - Express 5
  - Prisma ORM
  - MySQL/MariaDB
- **Linguagens utilizadas:**
  - TypeScript
  - JavaScript
  - CSS
  - SQL

### Evidências consultadas

- `README.md` — descreve nome, problema, objetivo, MVP, tecnologias, divisão frontend/backend/banco e instruções de execução.
- `package.json` — identifica dependências do frontend, scripts raiz e ferramenta Vite.
- `backend/package.json` — identifica Express, Prisma, dotenv, adapter MariaDB e script do backend.
- `backend/src/server.js` — contém servidor Express, JSON middleware e rotas `/` e `/health`.
- `backend/prisma/schema.prisma` — contém models relacionais para usuários, tarefas, subtarefas, metas e rotinas.
- `backend/prisma/migrations/20260603120614_init/migration.sql` — contém criação das tabelas, índices e chaves estrangeiras.
- `frontend/src/app/routes.tsx` — contém rotas do frontend para onboarding, dashboard, captura, foco, chat, progresso, rotinas, metas, calendário, mente livre e configurações.
- `frontend/src/app/store.ts` — contém store em memória para tarefas e simulação de quebra de tarefas por IA.

## 2. 📂 Organização do repositório

```text
focusgrid/
├── backend/
│   ├── package.json
│   ├── prisma.config.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       └── 20260603120614_init/
│   │           └── migration.sql
│   └── src/
│       ├── server.js
│       └── config/
│           └── prisma.js
├── frontend/
│   ├── index.html
│   ├── vite.config.ts
│   ├── postcss.config.mjs
│   ├── LOGO/
│   └── src/
│       ├── main.tsx
│       ├── styles/
│       └── app/
│           ├── App.tsx
│           ├── routes.tsx
│           ├── store.ts
│           ├── types.ts
│           ├── hooks/
│           └── components/
├── guidelines/
├── .gitignore
├── README.md
├── PROJECT_STRUCTURE.md
├── ATTRIBUTIONS.md
├── package.json
└── package-lock.json
```

### Responsabilidade das pastas

- `backend` — servidor Express, configuração Prisma e schema/migrations do banco.
- `backend/src` — código executável do backend.
- `backend/src/config` — configuração do Prisma Client.
- `backend/prisma` — configuração de schema e migrations do Prisma.
- `frontend` — aplicação React/Vite.
- `frontend/src/app` — rotas, componentes, tipos, store e hooks da aplicação.
- `frontend/src/styles` — arquivos CSS, Tailwind e tema.
- `frontend/LOGO` — imagens de marca utilizadas no layout.
- `guidelines` — documentação auxiliar de diretrizes.

### Análise da organização

- Separação entre frontend e backend: adequada.
- Nomes de pastas e arquivos: em geral claros; há coexistência de `.gitignore` e `gitignore`, o que pode causar ambiguidade documental, mas não impede a estrutura principal.
- Arquivos de configuração: existem `package.json` na raiz, `backend/package.json`, `frontend/vite.config.ts`, `frontend/postcss.config.mjs`, `backend/prisma.config.ts` e `.gitignore`.
- Organização mínima do projeto: atende parcialmente bem; o frontend é amplo e organizado por componentes, enquanto o backend ainda está concentrado em poucos arquivos e sem pastas de rotas/controllers/services.

## 3. 📘 README e documentação inicial

**Localização:** `README.md`

| Item esperado | Situação | Evidência |
|---|---|---|
| Nome do projeto | Atende | `README.md` inicia com `FocusGrid` |
| Problema que o sistema resolve | Atende | `README.md`, seção `Problema que o Sistema Resolve` |
| Objetivo do projeto | Atende | `README.md`, seção `Objetivo do Projeto` |
| Funcionalidades do MVP | Atende | `README.md`, seção `Funcionalidades do MVP` |
| Tecnologias utilizadas | Atende | `README.md`, seção `Tecnologias Utilizadas` |
| Instruções para execução local | Atende | `README.md`, seção `Como Executar Localmente` |
| Divisão entre frontend, backend e banco | Atende | `README.md`, seção `Estrutura do Projeto` |

### Histórico de commits e participação

- Histórico disponível para análise: Sim.
- Participação dos integrantes identificável: Parcial.
- Evidências: `git log --max-count=20` mostra commits de `danilo007-dev`, `hfcosta`, `danilo` e `EA - Danilo César Silva De Almeida`; `git shortlog -sn --all` também identifica `EA - Robson Gabriel Da Silva Rangel`. A divisão efetiva de tarefas por integrante não está documentada de forma detalhada no repositório.

> Não há evidência suficiente para atribuir autoria individual de funcionalidades específicas.

### Professor como colaborador

**Situação:** NÃO VERIFICÁVEL PELO REPOSITÓRIO

## 4. ⚙️ Backend

- **Localização:** `backend`
- **Linguagem:** JavaScript
- **Framework principal:** Express 5
- **Arquivo de inicialização:** `backend/src/server.js`
- **Servidor configurado:** Parcial

### Estrutura identificada

- `backend/src/server.js` — inicializa Express, configura `express.json()`, define rotas `/` e `/health` e inicia servidor na porta 3000.
- `backend/src/config/prisma.js` — configura Prisma Client com adapter MariaDB e variáveis de ambiente.
- `backend/prisma/schema.prisma` — define models do banco.
- `backend/prisma/migrations/20260603120614_init/migration.sql` — migration inicial.

### Organização interna

- Rotas: existem somente rotas diretamente em `backend/src/server.js`.
- Controllers: NÃO IDENTIFICADO.
- Services: NÃO IDENTIFICADO.
- Middlewares: `express.json()` identificado; middleware de CORS não identificado no backend.
- Configuração do banco: identificada em `backend/src/config/prisma.js` e `backend/prisma.config.ts`.
- Validações: NÃO IDENTIFICADO.
- Tratamento de erros: parcial, apenas no teste da conexão e na rota `/health`.

### Funcionalidades implementadas

- Servidor Express online — Evidência: `backend/src/server.js`.
- Rota raiz com resposta textual — Evidência: `backend/src/server.js`.
- Rota de saúde com verificação de conexão via Prisma — Evidência: `backend/src/server.js`.
- Inicialização do Prisma Client com adapter MariaDB — Evidência: `backend/src/config/prisma.js`.

### Fluxo das requisições

```text
GET /health → função inline em server.js → prisma.$queryRaw`SELECT 1` → banco de dados → resposta JSON
```

O fluxo existe apenas para verificação de saúde/conexão. Para funcionalidades do domínio, como tarefas, subtarefas, metas, rotinas e usuários, o fluxo é interrompido na camada de API porque não há rotas/controllers implementados para essas entidades.

## 5. 🗄️ Banco de dados e Prisma ORM

- **Tipo de banco:** MySQL, com uso de adapter MariaDB no cliente do backend.
- **ORM:** Prisma
- **Configuração principal:** `backend/prisma.config.ts` e `backend/src/config/prisma.js`
- **Schema Prisma:** `backend/prisma/schema.prisma`
- **Migrations:** Sim
- **Localização das migrations:** `backend/prisma/migrations`

### Models ou entidades identificadas

- `User` — usuário do sistema; campos principais: `id`, `name`, `email`, `passwordHash`, `createdAt`.
- `Task` — tarefas do usuário; campos principais: `id`, `userId`, `title`, `duration`, `estimatedTime`, `scheduledDate`, `completed`, `progress`, `timeOfDay`, `color`.
- `Subtask` — subtarefas de uma tarefa; campos principais: `id`, `taskId`, `userId`, `title`, `completed`, `position`.
- `Goal` — metas do usuário; campos principais: `id`, `userId`, `title`, `description`, `progress`, `completed`, `type`, `scheduledDate`, `completedSteps`.
- `GoalStep` — passos de metas; campos principais: `id`, `goalId`, `userId`, `title`, `completed`, `position`.
- `Routine` — rotinas do usuário; campos principais: `id`, `userId`, `title`, `description`, `icon`, `colorKey`, `scheduledDate`, `isFavorite`.
- `RoutineStep` — passos de rotinas; campos principais: `id`, `routineId`, `userId`, `title`, `duration`, `completed`, `position`.

### Modelagem

| Elemento | Situação | Evidência |
|---|---|---|
| Models principais definidos | Atende | `backend/prisma/schema.prisma` |
| Chaves primárias | Atende | `backend/prisma/schema.prisma`, campos `id @id` |
| Chaves estrangeiras e relações | Atende | `backend/prisma/schema.prisma`, relações com `User`, `Task`, `Goal` e `Routine` |
| Campos coerentes com o domínio | Atende | `backend/prisma/schema.prisma`, models de tarefas, subtarefas, metas e rotinas |
| Prisma Client utilizado no backend | Atende | `backend/src/config/prisma.js` e `backend/src/server.js` |
| Operação real de banco em rota/controller | Parcial | `backend/src/server.js`, rota `/health` executa `prisma.$queryRaw` |

### Operações Prisma encontradas

- `findMany`, `findUnique` ou equivalente: NÃO IDENTIFICADO.
- `create`: NÃO IDENTIFICADO em rotas/controllers.
- `update`: NÃO IDENTIFICADO em rotas/controllers.
- `delete`: NÃO IDENTIFICADO em rotas/controllers.
- Outras operações: `prisma.$connect()` e `prisma.$queryRaw` em `backend/src/server.js`.

### Banco no servidor de produção

A existência de `.env`, `.env.example`, `backend/prisma.config.ts`, adapter MariaDB e commit com mensagem sobre banco no servidor indica preparação ou tentativa de conexão. O conteúdo sensível do `.env` não foi exposto.

**Situação:** PARCIALMENTE EVIDENCIADO

## 6. 🌐 Rotas da API e arquivo do Insomnia

### Rotas encontradas no backend

| Método | Endpoint | Arquivo | Operação realizada | Usa Prisma |
|---|---|---|---|---|
| GET | `/` | `backend/src/server.js` | Retorna texto indicando API online | Não |
| GET | `/health` | `backend/src/server.js` | Executa consulta `SELECT 1` para verificar banco e retorna JSON | Sim |

### Adequação das rotas

- Uso adequado dos métodos HTTP: adequado para as duas rotas existentes.
- Organização por funcionalidade: parcial; as rotas estão diretamente no servidor, sem módulos por entidade.
- Clareza dos nomes: `/health` é claro para verificação de saúde; `/` é genérico.
- Existência de parâmetros: não há parâmetros.
- Recebimento de JSON: `express.json()` configurado, mas não há rotas POST/PUT/PATCH que recebam corpo JSON.
- Respostas em JSON: `/health` responde JSON; `/` responde texto.
- Relação com funcionalidades essenciais do MVP: baixa; não há endpoints para tarefas, subtarefas, metas, rotinas, usuários ou integração com as telas do frontend.

### Arquivo exportado do Insomnia

- **Arquivo encontrado:** NÃO IDENTIFICADO
- **Formato:** NÃO IDENTIFICADO
- **Rotas organizadas por funcionalidade:** Não
- **Nomes claros nas requisições:** Não
- **Exemplos de corpo JSON:** Não
- **Parâmetros e variáveis configurados:** Não
- **Compatibilidade com as rotas do backend:** Não

Não foi encontrado arquivo exportado do Insomnia em formatos comuns como JSON, YAML, HAR ou arquivo com nome relacionado a Insomnia.

## 7. 🎨 Frontend

- **Localização:** `frontend`
- **Framework:** React
- **Linguagem:** TypeScript
- **Ferramenta de criação/build:** Vite
- **Tailwind CSS:** Configurado
- **Roteamento:** React Router

### Arquivos principais

- `frontend/src/main.tsx` — ponto de entrada da aplicação React.
- `frontend/src/app/App.tsx` — renderiza `RouterProvider`.
- `frontend/src/app/routes.tsx` — define rotas da aplicação.
- `frontend/src/app/store.ts` — store em memória para tarefas e simulação de IA.
- `frontend/src/app/types.ts` — tipos de tarefa, subtarefa e progresso.
- `frontend/vite.config.ts` — configura Vite, React e Tailwind.
- `frontend/src/styles/tailwind.css` — importa Tailwind CSS v4.
- `frontend/src/styles/index.css` — importa estilos principais.

### Páginas e componentes

- `frontend/src/app/components/Onboarding.tsx` — tela inicial de apresentação.
- `frontend/src/app/components/Dashboard.tsx` — dashboard com tarefas do dia e progresso.
- `frontend/src/app/components/QuickCapture.tsx` — captura e organização de tarefas com simulação de IA.
- `frontend/src/app/components/FocusMode.tsx` — modo foco, timer, subtarefas e conclusão.
- `frontend/src/app/components/AIChat.tsx` — chat com chamada à API externa da Anthropic e fallback local.
- `frontend/src/app/components/Progress.tsx` — métricas de progresso baseadas no store.
- `frontend/src/app/components/Routines.tsx` — listagem, criação e execução de rotinas em estado local.
- `frontend/src/app/components/Goals.tsx` — cadastro e visualização de metas em estado local.
- `frontend/src/app/components/CalendarView.tsx` — calendário com eventos estáticos e tarefas do store.
- `frontend/src/app/components/MindDump.tsx` — captura de pensamentos, notas locais e transformação em tarefa no store.
- `frontend/src/app/components/Settings.tsx` — configurações salvas em `localStorage`.
- `frontend/src/app/components/Layout.tsx` — layout com navegação lateral.

### Análise do desenvolvimento inicial

| Elemento | Situação | Evidência |
|---|---|---|
| Projeto React iniciado | Atende | `frontend/src/main.tsx`, `frontend/src/app/App.tsx` |
| Uso de JavaScript | Parcial | Backend em JavaScript; frontend usa TypeScript em `.tsx` |
| Tailwind configurado ou utilizado | Atende | `frontend/vite.config.ts`, `frontend/src/styles/tailwind.css` |
| Telas principais iniciadas | Atende | `frontend/src/app/routes.tsx` e componentes em `frontend/src/app/components` |
| Componentes organizados | Atende | `frontend/src/app/components` e `frontend/src/app/components/ui` |
| Navegação entre páginas | Atende | `frontend/src/app/routes.tsx`, `frontend/src/app/components/Layout.tsx` |
| Tela conectada ou preparada para API | Parcial | `AIChat.tsx` usa `fetch` para API externa; não foi identificada chamada ao backend local |

O frontend está significativamente mais desenvolvido que o backend, mas usa TypeScript, não JavaScript puro, nas telas React.

## 8. 🔗 Conexão entre frontend e backend

- **Tipo de comunicação:** NÃO IDENTIFICADO entre frontend e backend do projeto.
- **Cliente HTTP:** `fetch`, usado apenas para API externa da Anthropic em `frontend/src/app/components/AIChat.tsx`.
- **Arquivo de configuração da API:** NÃO IDENTIFICADO
- **URL base:** `https://api.anthropic.com/v1/messages`, encontrada em `frontend/src/app/components/AIChat.tsx`; não é URL do backend local.
- **Variáveis de ambiente:** `backend/.env` e `backend/.env.example` encontrados; valores sensíveis não expostos.
- **CORS no backend:** Ausente; `cors` aparece em dependências da raiz, mas não foi identificado uso em `backend/src/server.js`.
- **Proxy no frontend:** Ausente.

### Endpoints consumidos pelo frontend

| Endpoint | Método | Componente ou página | Finalidade | Compatível com o backend |
|---|---|---|---|---|
| `https://api.anthropic.com/v1/messages` | POST | `frontend/src/app/components/AIChat.tsx` | Chat com assistente externo | Não aplicável ao backend do projeto |

### Fluxos comprovados

- `QuickCapture.tsx` cria tarefas usando `taskStore.addTask`, sem requisição ao backend.
- `Dashboard.tsx`, `FocusMode.tsx`, `Progress.tsx`, `CalendarView.tsx` e `MindDump.tsx` leem ou alteram tarefas pelo `taskStore` em memória.
- `Settings.tsx` persiste configurações em `localStorage`.
- `AIChat.tsx` tenta consumir API externa da Anthropic e usa fallback local em caso de erro.

### Estado da integração

**Classificação:** Não atende.

Não foi identificada comunicação entre frontend e backend local. O backend expõe `/health`, mas o frontend não consome essa rota nem endpoints de domínio. A lógica principal das tarefas permanece em memória no frontend, conforme evidenciado por `frontend/src/app/store.ts`.

## 9. ✅ O que já está implementado

### Backend

- Servidor Express básico em `backend/src/server.js`.
- Middleware `express.json()` em `backend/src/server.js`.
- Rota `GET /` em `backend/src/server.js`.
- Rota `GET /health` com verificação de banco via Prisma em `backend/src/server.js`.
- Configuração do Prisma Client com adapter MariaDB em `backend/src/config/prisma.js`.

### Banco de dados

- Schema Prisma com models `User`, `Task`, `Subtask`, `Goal`, `GoalStep`, `Routine` e `RoutineStep`.
- Migration SQL inicial criando tabelas, índices e chaves estrangeiras.
- Arquivo `.env.example` com variáveis esperadas para conexão.

### Frontend

- Aplicação React/Vite iniciada.
- Rotas de frontend para onboarding, dashboard, captura, rotinas, metas, calendário, mente livre, configurações, foco, chat e progresso.
- Store em memória com tarefas, subtarefas, progresso e simulação de quebra de tarefas.
- Telas de dashboard, captura, foco, progresso, rotinas, metas, calendário, mente livre, configurações e chat.
- Tailwind CSS configurado via plugin Vite e arquivo `tailwind.css`.

### Integração

- Uso de `taskStore` compartilhado entre telas do frontend.
- Integração do backend com banco apenas na rota de saúde.
- NÃO IDENTIFICADO fluxo integrado entre frontend e backend local.

## 10. 🚧 O que está incompleto ou em desenvolvimento

- API de domínio para tarefas, subtarefas, metas e rotinas.
  - **Evidência:** `backend/src/server.js`
  - **Estado observado:** existem apenas `/` e `/health`; não há endpoints CRUD para as entidades do schema.

- Organização interna do backend em rotas/controllers/services.
  - **Evidência:** `backend/src`
  - **Estado observado:** há somente `server.js` e `config/prisma.js`.

- Persistência das funcionalidades principais no banco.
  - **Evidência:** `frontend/src/app/store.ts`, `QuickCapture.tsx`, `FocusMode.tsx`, `Dashboard.tsx`
  - **Estado observado:** tarefas e subtarefas são manipuladas em memória no frontend.

- Integração frontend-backend.
  - **Evidência:** busca por `fetch`, `axios`, `localhost`, `/health` e referências de API no frontend.
  - **Estado observado:** não há chamada ao backend local; há apenas chamada externa à Anthropic em `AIChat.tsx`.

- Arquivo exportado do Insomnia.
  - **Evidência:** varredura do repositório por arquivos `.json`, `.yaml`, `.yml`, `.har`, `.insomnia` e nomes relacionados.
  - **Estado observado:** NÃO IDENTIFICADO.

- CORS no backend.
  - **Evidência:** `backend/src/server.js`
  - **Estado observado:** não há configuração de CORS, embora a dependência `cors` apareça no `package.json` raiz.

- Script raiz para backend.
  - **Evidência:** `package.json`
  - **Estado observado:** script `server` aponta para `backend && tsx server/index.ts`, mas o arquivo de inicialização real identificado é `backend/src/server.js`.

## 11. 📦 Dependências principais

### Backend

| Dependência | Versão | Finalidade identificada |
|---|---:|---|
| `express` | `^5.2.1` | Servidor HTTP/API |
| `@prisma/client` | `^7.8.0` | Cliente Prisma no backend |
| `@prisma/adapter-mariadb` | `^7.8.0` | Adapter Prisma para MariaDB |
| `dotenv` | `^17.4.2` | Leitura de variáveis de ambiente |
| `prisma` | `^7.8.0` | CLI/configuração Prisma em desenvolvimento |
| `nodemon` | `^3.1.14` | Execução do backend em modo desenvolvimento |

### Frontend

| Dependência | Versão | Finalidade identificada |
|---|---:|---|
| `react` | `18.3.1` | Biblioteca de interface, registrada como peer dependency |
| `react-dom` | `18.3.1` | Renderização React no navegador, registrada como peer dependency |
| `vite` | `6.3.5` | Build/dev server do frontend |
| `@vitejs/plugin-react` | `4.7.0` | Plugin React para Vite |
| `typescript` | `^6.0.3` | Linguagem/configuração TypeScript |
| `tailwindcss` | `4.1.12` | Utilitários CSS |
| `@tailwindcss/vite` | `4.1.12` | Integração Tailwind com Vite |
| `react-router` | `7.13.0` | Roteamento do frontend |
| `lucide-react` | `0.487.0` | Ícones |
| `motion` | `12.23.24` | Animações |
| `date-fns` | `3.6.0` | Datas no calendário |
| `canvas-confetti` | `1.9.4` | Animações de celebração |
| `@radix-ui/*` | versões diversas | Componentes UI |
| `@mui/material`, `@mui/icons-material`, `@emotion/*` | versões diversas | Componentes e base visual complementar |

## 12. 🧭 Arquitetura e padrões identificados

- **Arquitetura predominante:** estrutura simples com frontend componentizado e backend mínimo.
- **Separação de responsabilidades:** a separação física entre frontend, backend e banco está clara. A separação interna do frontend é adequada para a etapa inicial. No backend, a lógica está concentrada em `server.js`, sem camadas de rotas/controllers/services.
- **Padrões identificados:** React com componentes de página, hook `useTasks`, store em memória, rotas declarativas com React Router, Prisma schema relacional e migration inicial.
- **Consistência entre os módulos:** parcial. O schema do banco contempla entidades do MVP, e o frontend implementa telas coerentes com essas entidades, mas não há ligação funcional entre as telas e as operações de banco.

# 13. 📝 Avaliação conforme os critérios da AV2

## Quadro avaliativo

| Critério | Valor máximo | Nota atribuída | Evidências e justificativa |
|---|---:|---:|---|
| Organização do repositório, README e professor como colaborador | 1,5 | 1,2 | Repositório separado em `frontend` e `backend`, README completo e estrutura compreensível. Professor como colaborador é NÃO VERIFICÁVEL PELO REPOSITÓRIO. |
| Banco de dados criado e coerente com o MVP | 2,0 | 1,8 | `schema.prisma` e migration definem entidades coerentes com tarefas, subtarefas, metas e rotinas. Criação efetiva em servidor de produção não é comprovável apenas pelo repositório. |
| Arquivo exportado do Insomnia com as rotas organizadas | 1,5 | 0,0 | Arquivo exportado do Insomnia NÃO IDENTIFICADO. |
| Backend iniciado com integração ao banco usando Prisma ORM | 2,0 | 1,0 | Express iniciado, Prisma Client configurado e `/health` consulta o banco. Não há rotas CRUD, controllers ou operações reais de domínio. |
| Frontend iniciado em React, JavaScript e Tailwind | 1,5 | 1,3 | Frontend React/Vite/Tailwind com várias telas e componentes. Usa TypeScript no frontend, não JavaScript puro. |
| Conexão inicial entre frontend e backend | 1,0 | 0,0 | Não foi identificada chamada do frontend para o backend local. Estado principal fica em memória no frontend. |
| Clareza na apresentação e divisão de tarefas do grupo | 0,5 | NÃO VERIFICÁVEL | Há histórico de commits com autores, mas a apresentação e divisão de tarefas não estão documentadas de modo suficiente no repositório. |
| **Total verificável no repositório** | **10,0** | **5,3** | Soma dos critérios com pontuação verificável diretamente no repositório, sem atribuir nota ao item não verificável de apresentação/divisão. |

### Observação sobre o total

- **Pontuação obtida nos itens verificáveis:** 5,3
- **Pontos dependentes de apresentação ou verificação externa:** 0,5 diretamente no critério de apresentação/divisão, além de partes internas não verificáveis como professor colaborador e banco em produção.
- **Nota máxima que pode ser confirmada apenas pelo repositório:** 9,5

Não foi transformado automaticamente o critério de apresentação e divisão de tarefas em nota zero; ele permanece dependente de verificação externa.

## 14. 📌 Síntese por critério

### 14.1 Organização do repositório e README — máximo 1,5

- **Situação:** Atende parcialmente.
- **Evidências:** `README.md`, `PROJECT_STRUCTURE.md`, `frontend`, `backend`, `.gitignore`.
- **Aspectos comprovados:** separação entre frontend e backend, README com objetivo, problema, MVP, tecnologias e execução local.
- **Aspectos ausentes:** backend sem organização por rotas/controllers/services; duplicidade entre `.gitignore` e `gitignore`.
- **Aspectos não verificáveis:** professor como colaborador.
- **Nota sugerida:** 1,2/1,5

### 14.2 Banco de dados e coerência com o MVP — máximo 2,0

- **Situação:** Atende parcialmente.
- **Evidências:** `backend/prisma/schema.prisma`, `backend/prisma/migrations/20260603120614_init/migration.sql`.
- **Models/tabelas principais:** usuários, tarefas, subtarefas, metas, passos de metas, rotinas e passos de rotinas.
- **Coerência com o MVP:** boa aderência estrutural às funcionalidades descritas, especialmente tarefas, subtarefas, metas e rotinas.
- **Criação no servidor de produção:** Não comprovada pelo repositório; parcialmente evidenciada por configuração e histórico.
- **Nota sugerida:** 1,8/2,0

### 14.3 Insomnia e organização das rotas — máximo 1,5

- **Situação:** Não atende.
- **Evidências:** arquivo exportado do Insomnia NÃO IDENTIFICADO.
- **Organização das requisições:** NÃO IDENTIFICADO.
- **Compatibilidade com o backend:** NÃO IDENTIFICADO.
- **Nota sugerida:** 0,0/1,5

### 14.4 Backend com Prisma ORM — máximo 2,0

- **Situação:** Parcial.
- **Evidências:** `backend/src/server.js`, `backend/src/config/prisma.js`, `backend/prisma/schema.prisma`.
- **Servidor Node.js/Express:** configurado e iniciado em `backend/src/server.js`.
- **Prisma configurado:** sim, com `PrismaClient` e adapter MariaDB.
- **Operação no banco:** apenas teste de conexão e `SELECT 1` na rota `/health`.
- **Resposta em JSON:** sim, na rota `/health`.
- **Nota sugerida:** 1,0/2,0

### 14.5 Frontend com React, JavaScript e Tailwind — máximo 1,5

- **Situação:** Atende parcialmente.
- **Evidências:** `frontend/src/main.tsx`, `frontend/src/app/routes.tsx`, `frontend/vite.config.ts`, `frontend/src/styles/tailwind.css`, componentes em `frontend/src/app/components`.
- **React iniciado:** sim.
- **JavaScript:** backend usa JavaScript; frontend usa TypeScript.
- **Tailwind:** configurado e utilizado.
- **Telas e componentes:** várias telas principais iniciadas e navegáveis.
- **Nota sugerida:** 1,3/1,5

### 14.6 Conexão frontend-backend — máximo 1,0

- **Situação:** Não atende.
- **Evidências:** `frontend/src/app/store.ts`, `frontend/src/app/components/AIChat.tsx`, `backend/src/server.js`.
- **Fluxo identificado:** frontend usa store em memória; backend tem `/health`; não há consumo do backend pelo frontend.
- **Compatibilidade das rotas e dados:** não há endpoints de domínio no backend para comparar com as telas.
- **Nota sugerida:** 0,0/1,0

### 14.7 Apresentação e divisão de tarefas — máximo 0,5

- **Situação:** Não verificável.
- **Evidências no repositório:** histórico de commits com múltiplos autores; divisão de tarefas detalhada NÃO IDENTIFICADA.
- **O que precisa ser verificado na apresentação:** participação de cada integrante, divisão de responsabilidades, demonstração das partes implementadas e relação entre decisões técnicas e MVP.
- **Nota sugerida:** A DEFINIR/0,5

## 15. 🔍 Pontos para verificação durante a apresentação

- Demonstrar a execução do backend e o comportamento da rota `/health`.
- Explicar como o Prisma Client se conecta ao MySQL/MariaDB sem expor credenciais.
- Demonstrar se o banco foi criado em servidor externo ou apenas preparado localmente.
- Mostrar como as tabelas do schema se relacionam com as telas de tarefas, metas e rotinas.
- Esclarecer por que as operações principais ainda estão no `taskStore` em memória.
- Demonstrar se existe algum arquivo do Insomnia fora do repositório analisado.
- Mostrar se há alguma integração frontend-backend não versionada no repositório.
- Explicar a divisão de tarefas entre os integrantes com base em evidências de trabalho.

## 16. 📋 Conclusão

O projeto FocusGrid está bem estruturado como aplicação inicial, com separação clara entre frontend e backend, README detalhado e frontend bastante desenvolvido em React/Vite/Tailwind. As telas do MVP estão amplamente representadas no frontend, incluindo dashboard, captura, foco, progresso, rotinas, metas, calendário, mente livre, configurações e chat.

O banco de dados está bem encaminhado no Prisma, com models e migration coerentes com o domínio do MVP. O backend, porém, ainda está em estágio mínimo: existe servidor Express e rota de saúde com Prisma, mas não há rotas de domínio, controllers, services ou CRUDs conectados às entidades do banco.

A principal lacuna técnica para os critérios da AV2 é a ausência de conexão inicial comprovada entre frontend e backend. O frontend manipula o estado principal em memória e o backend não oferece endpoints para as funcionalidades centrais. Também não foi identificado arquivo exportado do Insomnia.

Com base apenas nas evidências disponíveis no repositório, a nota sugerida para os itens verificáveis é **5,3/10,0**, com **0,5 ponto de apresentação/divisão de tarefas a definir** e outros aspectos específicos dependentes de verificação externa, como professor colaborador e banco em produção.
