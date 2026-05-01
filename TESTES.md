CENÁRIOS POSSÍVEIS DE TESTES. #3

Teste 1 — Cadastro de missão válida

Objetivo: Verificar se uma missão é cadastrada corretamente.

Passos:

Acessar a tela de cadastro
Preencher os campos:
origem: "Farmácia"
destino: "UTI"
tipo: "medicamento"
prioridade: 2
distância: 50
Clicar em "Cadastrar"

Resultado esperado:

A missão deve ser adicionada à lista
Deve aparecer na tela de listagem
Status inicial deve ser "pendente"

----------------------------------------------------------------

Teste 2 — Alteração de status da missão

Objetivo: Verificar se as transições de status funcionam corretamente.

Passos:

Acessar a lista de missões
Selecionar uma missão com status "pendente"
Clicar em "Iniciar"
Em seguida, clicar em "Concluir"

Resultado esperado:

Status muda de:
"pendente" -> "em_execucao"
"em_execucao" -> "concluida"
Botões devem mudar conforme o status
Transições inválidas devem ser bloqueadas

----------------------------------------------------------------

Teste 3 — Geração de alertas

Objetivo: Verificar se os alertas são exibidos corretamente.

Passos:

Acessar a tela de telemetria
Aguardar a atualização automática dos dados
Simular ou observar:
bateria abaixo de 20%
latência acima de 100 ms
uma missão com status "falha"

Resultado esperado:

Exibição de alerta de bateria baixa
Exibição de alerta de latência alta
Exibição de alerta indicando falha de missão
