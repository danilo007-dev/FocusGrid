# FocusGrid

FocusGrid é um sistema de organização inteligente criado para pessoas com TDAH e para qualquer usuário que enfrente dificuldade com foco, procrastinação, gestão do tempo e execução de tarefas.

Mais do que uma lista de afazeres, o projeto atua como um segundo cérebro digital: ele ajuda a transformar pensamentos, metas e tarefas complexas em ações pequenas, claras e executáveis.

# Problema que o Sistema Resolve

Pessoas com TDAH frequentemente lidam com desafios que tornam a produtividade tradicional pouco eficaz. Entre os principais pontos estão a dificuldade para priorizar, organizar ideias, estimar tempo, iniciar atividades e sustentar a atenção até a conclusão.

Na prática, isso costuma gerar sobrecarga cognitiva. Quando uma tarefa parece grande demais, vaga demais ou mal definida, o cérebro tende a evitar o início da execução. O resultado é procrastinação, sensação de culpa, acúmulo de pendências e perda de controle da rotina.

Aplicativos tradicionais de produtividade muitas vezes falham porque assumem que o usuário já consegue pensar com clareza, quebrar tarefas sozinho e seguir uma agenda rígida. Para esse público, uma simples lista de tarefas pode aumentar a ansiedade em vez de reduzir.

Além disso, soluções genéricas costumam exigir muitos passos manuais, pouca orientação contextual e pouca adaptação ao estado mental do usuário. Quando falta suporte para começar, o problema não é apenas organizar: é conseguir dar o primeiro passo.

# Objetivo do Projeto

O objetivo do FocusGrid é reduzir a fricção entre intenção e ação. O sistema foi pensado para apoiar o usuário desde o momento em que uma ideia surge até a execução prática da tarefa.

A Inteligência Artificial funciona como uma assistente executiva pessoal. Ela ajuda a capturar pensamentos, interpretar pedidos vagos, sugerir microtarefas, indicar próximos passos e incentivar o início imediato da atividade, sempre com uma comunicação simples, calma e objetiva.

Em vez de exigir planejamento completo de uma vez, o sistema busca reduzir a carga mental e converter objetivos amplos em ações concretas que o usuário consiga realizar agora.

# Funcionalidades do MVP

As funcionalidades abaixo representam o que existe no projeto atual:

- onboarding inicial para apresentar o fluxo do sistema;
- dashboard principal com visualização das tarefas do dia;
- captura rápida de tarefas e ideias;
- organização de tarefas por período do dia;
- criação automática de subtarefas com sugestões de IA;
- modo foco para executar uma tarefa por vez;
- timer de foco com pausa e retomada;
- marcação de subtarefas como concluídas;
- visualização de progresso e taxa de conclusão;
- rotina diária com passos estruturados;
- metas e sonhos com cadastro rápido;
- calendário com eventos de tarefas, rotinas e metas;
- mente livre para capturar pensamentos e transformar ideias em tarefa ou nota;
- assistente de IA para conversar sobre tarefas e destravar o início;
- configurações de experiência, lembretes, notificações e alertas sonoros;
- feedback visual de conclusão com animações e celebração.

Observação: o projeto ainda não possui autenticação completa nem persistência total das tarefas no backend. O estado principal das tarefas está em memória no frontend e as configurações são salvas no `localStorage`.

# Tecnologias Utilizadas

## Frontend

- React 18
- TypeScript
- Vite
- React Router
- Motion
- Tailwind CSS v4
- Lucide React
- date-fns
- canvas-confetti
- Radix UI
- MUI e Emotion para componentes e base visual complementar

## Backend

- Node.js
- Express 5
- Prisma ORM
- API mínima com endpoint de saúde (`/health`)
- integração com banco via Prisma Client

## Banco de Dados

- MySQL
- Prisma schema com adaptação para MariaDB no cliente do backend

## Ferramentas adicionais

- Google Gemini via SDK oficial no backend para o assistente de IA
- `localStorage` para persistência das configurações do usuário
- store em memória para tarefas no MVP atual
- Prisma migrations para estruturação do banco

# Estrutura do Projeto

O repositório está organizado em duas camadas principais:

## Frontend

Responsável pela interface, navegação e experiência do usuário. É aqui que ficam o dashboard, o foco, o chat com IA, o calendário, as rotinas, as metas, a mente livre e as configurações.

Atualmente, o frontend também concentra a lógica de estado das tarefas por meio de um store em memória, além de salvar preferências no navegador.

## Backend

Responsável pela base de servidor e pela conexão com o banco de dados. O backend usa Express e Prisma, expõe uma rota de saúde e já possui o esquema relacional preparado para usuários, tarefas, subtarefas, metas, passos de metas, rotinas e passos de rotinas.

## Banco de Dados

Responsável pelo armazenamento estruturado dos dados do sistema. O schema já contempla entidades para usuários, tarefas, subtarefas, metas e rotinas, permitindo evolução para persistência completa da aplicação.

# Como Executar Localmente

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd TCC
```

## 2. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

## 3. Configurar variáveis de ambiente

O backend possui um arquivo exemplo em `backend/.env.example`. Crie um arquivo `backend/.env` com base nele e preencha os dados do seu banco MySQL/MariaDB e a sua chave do Gemini.

Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@host/db"
DATABASE_USER="usuario"
DATABASE_PASSWORD="senha"
DATABASE_NAME="db"
DATABASE_HOST="host"
GEMINI_API_KEY="sua-chave-do-Gemini"
GEMINI_MODEL="gemini-flash-lite-latest"
```

`GEMINI_API_KEY` deve existir somente em `backend/.env`. Nunca use essa chave em uma variável `VITE_*`, no frontend ou no Git. Como a chave enviada nesta conversa foi exposta, ela deve ser revogada no Google AI Studio e substituída por uma nova chave antes do uso.

## 4. Executar o frontend

```bash
npm run dev
```

Esse comando inicia o frontend em modo de desenvolvimento com Vite.

## 5. Executar o backend

Em outro terminal:

```bash
cd backend
npm run dev
```

O backend roda em `http://localhost:3000` e expõe a rota `GET /health` para validação da conexão com o banco.

## Integração de IA

O frontend envia as mensagens para o backend, e o backend consulta o Gemini. O endpoint autenticado disponível é:

```text
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json
```

Exemplo de corpo:

```json
{
	"message": "Não sei por onde começar meu trabalho de biologia.",
	"history": []
}
```

O modelo pode ser trocado pela variável `GEMINI_MODEL`, desde que esteja disponível no Google AI Studio. O serviço limita mensagem e histórico, não registra prompts completos e retorna erros sanitizados ao frontend.

Para testar a validação de configuração sem consumir créditos:

```bash
cd backend
npm run test:ai-config
```

## 6. Executar o banco de dados

O projeto não inclui container ou script automático de banco. Portanto, é necessário ter uma instância MySQL/MariaDB disponível e acessível pelas variáveis de ambiente do backend.

Se você quiser validar a aplicação inteira de uma vez, mantenha o banco ativo, suba o backend e depois o frontend.

## Observação importante sobre os scripts

O repositório possui um script raiz `dev:all`, mas o backend presente no código está em `backend/src/server.js`. Para a execução local mais confiável, o fluxo recomendado é iniciar o frontend com `npm run dev` na raiz e o backend com `cd backend && npm run dev`.

## Deploy

### Frontend — Hostinger / Apache

O frontend está em `frontend/` e será publicado na subpasta `/tecti/2026/gpec14/`.
O Vite usa esse caminho em produção e o React Router deriva dele como `basename`.
O arquivo `frontend/public/.htaccess` é copiado para `dist` e encaminha rotas internas
para `index.html`.

Crie `frontend/.env.production` (não versionado) antes da build:

```env
VITE_API_URL=https://SEU-SERVICO.onrender.com/api
VITE_BASE_PATH=/tecti/2026/gpec14/
```

Na raiz do repositório, execute `npm install` e `npm run build`. Transfira **o conteúdo**
de `frontend/dist/` via FileZilla para `/tecti/2026/gpec14/` no Apache. Não envie a
pasta `dist` como subpasta, nem `node_modules`, arquivos `.env` ou o código-fonte.
Teste a página inicial, uma rota interna e a atualização dessa rota.

### Backend — Render

Crie um Web Service com Runtime `Node`, Root Directory `backend`, Build Command
`npm ci && npm run generate` e Start Command `npm start`. A versão recomendada é
Node `>=20.19.0`. O servidor usa `PORT` do Render e escuta em `0.0.0.0`.

Configure estas variáveis no Render, substituindo os valores indicados:

```env
NODE_ENV=production
HOST=0.0.0.0
FRONTEND_URL=https://SEU-DOMINIO/tecti/2026/gpec14
DATABASE_URL=mysql://usuario:senha@host:3306/banco
DATABASE_HOST=host
DATABASE_PORT=3306
DATABASE_USER=usuario
DATABASE_PASSWORD=senha
DATABASE_NAME=banco
JWT_SECRET=segredo-longo-aleatorio-e-exclusivo
```

Não crie `PORT` manualmente. `FRONTEND_URL` pode conter origens separadas por vírgula
para permitir localhost durante o desenvolvimento. Configure `/health` como Health
Check Path; a rota retorna `{ "status": "ok" }` sem expor dados sensíveis.

### Banco e Prisma

O backend usa Prisma Client com `@prisma/adapter-mariadb` para MySQL/MariaDB. O
`DATABASE_URL` é necessário para `prisma generate`; as variáveis `DATABASE_HOST`,
`DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD` e `DATABASE_NAME` são usadas
em runtime. As migrations estão em `backend/prisma/migrations`.

Após provisionar o banco de produção, execute uma vez:

```bash
cd backend
npx prisma migrate deploy
```

Nunca use `prisma migrate reset` em produção. Não há seed configurado.

### Parâmetros operacionais

```text
Frontend directory: frontend/
Build command: npm run build (na raiz)
Build output: frontend/dist/
Public path: /tecti/2026/gpec14/
Vite base: /tecti/2026/gpec14/
React Router basename: /tecti/2026/gpec14
.htaccess necessário: sim

Backend directory: backend/
Root Directory: backend
Build Command: npm ci && npm run generate
Start Command: npm start
Health Check: /health
Database library: Prisma + @prisma/adapter-mariadb
Prisma migrations: sim, npx prisma migrate deploy
```

# Próximas Melhorias

Algumas evoluções naturais para o projeto são:

- autenticação completa de usuários;
- persistência total das tarefas, metas e rotinas no banco;
- sincronização com calendário externo;
- análises de produtividade com gráficos mais profundos;
- sugestões avançadas por IA com base no histórico do usuário;
- notificações mais inteligentes e contextuais;
- aplicativo mobile;
- gamificação adaptada ao comportamento do usuário;
- histórico de hábitos e padrões de execução.

## Visão do Produto

O FocusGrid foi desenhado para diminuir a sobrecarga mental e aumentar a capacidade de ação. A proposta é ajudar o usuário a sair do estado de bloqueio e transformar organização em algo simples, guiado e menos cansativo.