#!/usr/bin/env node
/**
 * Script de teste de integração da API FocusGrid
 * Valida todos os endpoints e fluxos principais
 */

const API_URL = process.env.API_URL || "http://localhost:3000/api";
let token = "";
let userId = "";
let taskId = "";
let taskWithSubtasks = null;
let goalId = "";
let routineId = "";
let testsPassed = 0;
let testsFailed = 0;

async function request(method, path, body = null) {
  const url = `${API_URL}${path}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = response.status === 204 ? null : await response.json();

  return { status: response.statusCode || response.status, data };
}

function assertEquals(actual, expected, message) {
  if (actual === expected) {
    console.log(`✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`✗ ${message} - Expected: ${expected}, Got: ${actual}`);
    testsFailed++;
  }
}

function assertExists(value, message) {
  if (value) {
    console.log(`✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`✗ ${message} - Value does not exist`);
    testsFailed++;
  }
}

async function runTests() {
  console.log(`\n🧪 Iniciando testes de integração da API FocusGrid`);
  console.log(`📡 URL da API: ${API_URL}\n`);

  try {
    // 1. Teste de registro
    console.log("\n📝 [1] Testando Registro...");
    const registerRes = await request("POST", "/auth/register", {
      name: "Teste User",
      email: `test-${Date.now()}@example.com`,
      password: "senha-segura-123"
    });
    assertEquals(registerRes.status, 201, "Status de registro deve ser 201");
    assertExists(registerRes.data?.token, "Token deve ser retornado após registro");
    assertExists(registerRes.data?.user?.id, "User ID deve ser retornado");
    
    token = registerRes.data?.token;
    userId = registerRes.data?.user?.id;

    // 2. Teste de login
    console.log("\n🔑 [2] Testando Login...");
    const loginRes = await request("POST", "/auth/login", {
      email: registerRes.data?.user?.email,
      password: "senha-segura-123"
    });
    assertEquals(loginRes.status, 200, "Status de login deve ser 200");
    assertExists(loginRes.data?.token, "Token deve ser retornado após login");
    token = loginRes.data?.token;

    // 3. Teste de obter dados atuais
    console.log("\n👤 [3] Testando GET /auth/me...");
    const meRes = await request("GET", "/auth/me");
    assertEquals(meRes.status, 200, "Status deve ser 200");
    assertExists(meRes.data?.user?.id, "User data deve ser retornado");

    // 4. Teste de criar tarefa com subtarefas
    console.log("\n✅ [4] Testando Criar Tarefa com Subtarefas...");
    const createTaskRes = await request("POST", "/tasks", {
      title: "Estudar Biologia",
      duration: 30,
      dueDate: "2026-08-31",
      timeOfDay: "09:00",
      color: "#A8E6CF",
      subtasks: [
        { title: "Abrir caderno" },
        { title: "Ler capítulo" }
      ]
    });
    assertEquals(createTaskRes.status, 201, "Status de criação deve ser 201");
    assertExists(createTaskRes.data?.task?.id, "Task ID deve ser retornado");
    assertEquals(createTaskRes.data?.task?.progress, 0, "Progress inicial deve ser 0");
    assertEquals(createTaskRes.data?.task?.subtasks?.length, 2, "Deve ter 2 subtarefas");
    
    taskWithSubtasks = createTaskRes.data?.task;
    taskId = taskWithSubtasks?.id;

    // 5. Teste de listar tarefas
    console.log("\n📋 [5] Testando Listar Tarefas...");
    const listTasksRes = await request("GET", "/tasks");
    assertEquals(listTasksRes.status, 200, "Status deve ser 200");
    assertExists(Array.isArray(listTasksRes.data?.tasks), "Deve retornar array de tarefas");

    // 6. Teste de obter tarefa individual
    console.log("\n🔍 [6] Testando GET /tasks/{taskId}...");
    const getTaskRes = await request("GET", `/tasks/${taskId}`);
    assertEquals(getTaskRes.status, 200, "Status deve ser 200");
    assertEquals(getTaskRes.data?.task?.id, taskId, "Task ID deve corresponder");

    // 7. Teste de atualizar subtarefa (marca como concluída)
    console.log("\n☑️  [7] Testando Atualizar Subtarefa...");
    const subtaskId = taskWithSubtasks?.subtasks?.[0]?.id;
    const updateSubtaskRes = await request("PATCH", `/tasks/${taskId}/subtasks/${subtaskId}`, {
      completed: true
    });
    assertEquals(updateSubtaskRes.status, 200, "Status deve ser 200");
    assertEquals(updateSubtaskRes.data?.subtask?.completed, true, "Subtarefa deve estar concluída");

    // 8. Teste de atualizar tarefa (marcar como concluída)
    console.log("\n✏️  [8] Testando Atualizar Tarefa...");
    const updateTaskRes = await request("PATCH", `/tasks/${taskId}`, {
      title: "Estudar Biologia (Atualizado)"
    });
    assertEquals(updateTaskRes.status, 200, "Status deve ser 200");
    assertEquals(updateTaskRes.data?.task?.title, "Estudar Biologia (Atualizado)", "Título deve ser atualizado");

    // 9. Teste de criar meta
    console.log("\n🎯 [9] Testando Criar Meta...");
    const createGoalRes = await request("POST", "/goals", {
      title: "Entrar na faculdade",
      dream: "Conseguir bolsa integral",
      steps: [
        { title: "Pesquisar cursos" },
        { title: "Preparar para ENEM" }
      ]
    });
    assertEquals(createGoalRes.status, 201, "Status deve ser 201");
    assertExists(createGoalRes.data?.goal?.id, "Goal ID deve ser retornado");
    assertEquals(createGoalRes.data?.goal?.steps?.length, 2, "Deve ter 2 passos");
    
    goalId = createGoalRes.data?.goal?.id;

    // 10. Teste de listar metas
    console.log("\n📊 [10] Testando Listar Metas...");
    const listGoalsRes = await request("GET", "/goals");
    assertEquals(listGoalsRes.status, 200, "Status deve ser 200");
    assertExists(Array.isArray(listGoalsRes.data?.goals), "Deve retornar array de metas");

    // 11. Teste de atualizar passo da meta
    console.log("\n📍 [11] Testando Atualizar Passo da Meta...");
    const goalStepId = createGoalRes.data?.goal?.steps?.[0]?.id;
    const updateGoalStepRes = await request("PATCH", `/goals/${goalId}/steps/${goalStepId}`, {
      completed: true
    });
    assertEquals(updateGoalStepRes.status, 200, "Status deve ser 200");
    assertEquals(updateGoalStepRes.data?.step?.completed, true, "Passo deve estar concluído");

    // 12. Teste de criar rotina
    console.log("\n⏰ [12] Testando Criar Rotina...");
    const createRoutineRes = await request("POST", "/routines", {
      title: "Rotina Matinal",
      description: "Comece o dia com energia",
      icon: "sun",
      colorKey: "green",
      steps: [
        { title: "Beber água", duration: "1 min" },
        { title: "Alongamento", duration: "5 min" }
      ]
    });
    assertEquals(createRoutineRes.status, 201, "Status deve ser 201");
    assertExists(createRoutineRes.data?.routine?.id, "Routine ID deve ser retornado");
    assertEquals(createRoutineRes.data?.routine?.steps?.length, 2, "Deve ter 2 passos");
    
    routineId = createRoutineRes.data?.routine?.id;

    // 13. Teste de listar rotinas
    console.log("\n🔄 [13] Testando Listar Rotinas...");
    const listRoutinesRes = await request("GET", "/routines");
    assertEquals(listRoutinesRes.status, 200, "Status deve ser 200");
    assertExists(Array.isArray(listRoutinesRes.data?.routines), "Deve retornar array de rotinas");

    // 14. Teste de atualizar rotina (favoritar)
    console.log("\n⭐ [14] Testando Atualizar Rotina...");
    const updateRoutineRes = await request("PATCH", `/routines/${routineId}`, {
      isFavorite: true
    });
    assertEquals(updateRoutineRes.status, 200, "Status deve ser 200");
    assertEquals(updateRoutineRes.data?.routine?.isFavorite, true, "Rotina deve estar como favorita");

    // 15. Teste de atualizar passo da rotina
    console.log("\n📍 [15] Testando Atualizar Passo da Rotina...");
    const routineStepId = createRoutineRes.data?.routine?.steps?.[0]?.id;
    const updateRoutineStepRes = await request("PATCH", `/routines/${routineId}/steps/${routineStepId}`, {
      completed: true
    });
    assertEquals(updateRoutineStepRes.status, 200, "Status deve ser 200");
    assertEquals(updateRoutineStepRes.data?.step?.completed, true, "Passo deve estar concluído");

    // 16. Teste de deletar tarefa
    console.log("\n🗑️  [16] Testando Deletar Tarefa...");
    const deleteTaskRes = await request("DELETE", `/tasks/${taskId}`);
    assertEquals(deleteTaskRes.status, 204, "Status deve ser 204");

    // 17. Teste de deletar meta
    console.log("\n🗑️  [17] Testando Deletar Meta...");
    const deleteGoalRes = await request("DELETE", `/goals/${goalId}`);
    assertEquals(deleteGoalRes.status, 204, "Status deve ser 204");

    // 18. Teste de erro - acesso sem token
    console.log("\n🚫 [18] Testando Acesso Negado (sem token)...");
    token = "";
    const noTokenRes = await request("GET", "/tasks");
    assertEquals(noTokenRes.status, 401, "Status deve ser 401 sem token");

    // 19. Teste de erro - token inválido
    console.log("\n🚫 [19] Testando Token Inválido...");
    token = "invalid-token-xyz";
    const invalidTokenRes = await request("GET", "/tasks");
    assertEquals(invalidTokenRes.status, 401, "Status deve ser 401 com token inválido");

    // 20. Teste de erro - recurso não encontrado
    console.log("\n🚫 [20] Testando Recurso Não Encontrado...");
    token = loginRes.data?.token;
    const notFoundRes = await request("GET", "/tasks/invalid-id-xyz");
    assertEquals(notFoundRes.status, 404, "Status deve ser 404 para recurso inexistente");

  } catch (error) {
    console.error("\n❌ Erro durante testes:", error.message);
    testsFailed++;
  }

  // Resumo dos testes
  console.log("\n" + "=".repeat(50));
  console.log(`✅ Testes Passaram: ${testsPassed}`);
  console.log(`❌ Testes Falharam: ${testsFailed}`);
  console.log(`📊 Total: ${testsPassed + testsFailed} testes`);
  console.log("=".repeat(50) + "\n");

  if (testsFailed === 0) {
    console.log("🎉 Todos os testes passaram com sucesso!");
    process.exit(0);
  } else {
    console.log("⚠️  Alguns testes falharam. Verifique a saída acima.");
    process.exit(1);
  }
}

// Executar testes
runTests();
