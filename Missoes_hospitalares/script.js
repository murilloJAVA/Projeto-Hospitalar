//modelo de navegacao de status
const transicoes = {
  pendente: ["em_execucao", "cancelada"],
  em_execucao: ["concluida", "falha"],
  falha: ["pendente"]
};

let robo = {
  bateria: 100,
  latencia: 0,
  status: "livre",
  missaoAtual: null
};

// NAVEGAÇÃO ENTRE TELAS
function mostrarTela(tela) {
  document.getElementById("telaCadastro").style.display = "none";
  document.getElementById("telaLista").style.display = "none";
  document.getElementById("telaTelemetria").style.display = "none"; 

  if (tela === "cadastro") {
    document.getElementById("telaCadastro").style.display = "block";
  }

  if (tela === "lista") {
  document.getElementById("telaLista").style.display = "block";

  const listaFiltrada = filtrarStatus();
  renderizarMissoes(listaFiltrada);
}

  if (tela === "telemetria") {
    document.getElementById("telaTelemetria").style.display = "block";
  }
}


// =============================
// "BANCO DE DADOS" (ARRAY)
// =============================
let missoes = [
  {
    id: 101,
    origem: "Farmacia",
    destino: "Enfermaria A",
    tipo: "medicamento",
    prioridade: 2,
    distancia: 60,
    status: "pendente"
  },
  {
    id: 102,
    origem: "Posto de Enfermagem",
    destino: "Laboratorio",
    tipo: "amostra",
    prioridade: 3,
    distancia: 120,
    status: "pendente"
  },
  {
    id: 103,
    origem: "Almoxarifado",
    destino: "Centro Cirurgico",
    tipo: "material",
    prioridade: 1,
    distancia: 20,
    status: "em_execucao"
  }

];

    let proximoId = 104;


// =============================
// RENDERIZAR MISSÕES NA TELA
// =============================
function renderizarMissoes(lista = missoes) {
  const container = document.getElementById("listaMissoes");
  
  container.innerHTML = "";

  //definir ordem de missões 
  lista.sort((a, b) => {
    if (b.prioridade !== a.prioridade) {
      return b.prioridade - a.prioridade;
    }

    return a.distancia - b.distancia;
  });

  lista.forEach(m => {
    const div = document.createElement("div");
    let botoes = "";
    
    if (m.status === "pendente") {
    botoes += `<button onclick="alterarStatus(${m.id}, 'em_execucao')">Iniciar</button>`;
    botoes += `<button onclick="alterarStatus(${m.id}, 'cancelada')">Cancelar</button>`;
    }

    if (m.status === "em_execucao") {
      botoes += `<button onclick="alterarStatus(${m.id}, 'concluida')">Concluir</button>`;
      botoes += `<button onclick="alterarStatus(${m.id}, 'falha')">Falha</button>`;
    }

    if (m.status === "falha") {
      botoes += `<button onclick="alterarStatus(${m.id}, 'pendente')">Reagendar</button>`;
    }

    if (m.status === "concluida" || m.status === "cancelada") {
    botoes += `<p><em>Sem ações disponíveis</em></p>`;
    }

    div.innerHTML = `
      <hr>
      <p><strong>Missão ${m.id}</strong></p>
      <p>Origem: ${m.origem}</p>
      <p>Destino: ${m.destino}</p>
      <p>Tipo: ${m.tipo}</p>
      <p>Prioridade: ${m.prioridade}</p>
      <p>Distância: ${m.distancia}m</p>
      <p>Status: ${m.status}</p>

      ${botoes}
    `;

    container.appendChild(div);
  });
}

// CADASTRAR NOVA MISSÃO
document.getElementById("formMissao").addEventListener("submit", function(e) {
  e.preventDefault();

  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;
  const tipo = document.getElementById("tipo").value;
  const prioridade = parseInt(document.getElementById("prioridade").value);
  const distancia = parseFloat(document.getElementById("distancia").value);

  // validações básicas
  if (!origem || !destino || distancia <= 0) {
    alert("Preencha corretamente os campos!");
    return;
  }

  const novaMissao = {
    id: proximoId++,
    origem,
    destino,
    tipo,
    prioridade,
    distancia,
    status: "pendente"
  };

  missoes.push(novaMissao);

  alert("Missão cadastrada!");

  document.getElementById("formMissao").reset();
});

function filtrarStatus() {
    const filtro = document.getElementById("filtroStatus").value;

    if (filtro === "todas") {
    return missoes;
  }

  const resultado = missoes.filter(m => {
    return m.status === filtro;
  });

  return resultado;
}

document.getElementById("filtroStatus").addEventListener("change", function() {
  const listaFiltrada = filtrarStatus();
  renderizarMissoes(listaFiltrada);
});

//alterar status da missao
function alterarStatus(id, novoStatus) {
  const missao = missoes.find(m => m.id === id);

  if (!missao) {
  alert("Missão não encontrada");
  return;
  }

  const permitidos = transicoes[missao.status] || [];
  if (!permitidos.includes(novoStatus)) {
  alert("Transição inválida!");
  return;
  }

  missao.status = novoStatus;

  const listaFiltrada = filtrarStatus();
  renderizarMissoes(listaFiltrada);

  missao.status = novoStatus;
  enviarStatus(missao);
  salvarMissoes?.();
}

function atualizarTelemetria() {
  robo.bateria -= Math.random() * 2;
  if (robo.bateria < 0) robo.bateria = 0;

  robo.latencia = Math.floor(Math.random() * 200);

  const emExecucao = missoes.find(m => m.status === "em_execucao");

  robo.missaoAtual = emExecucao ? emExecucao.id : "Nenhuma";
  robo.status = emExecucao ? "ocupado" : "livre";

  document.getElementById("bateria").textContent = robo.bateria.toFixed(1);
  document.getElementById("latencia").textContent = robo.latencia;
  document.getElementById("statusRobot").textContent = robo.status;
  document.getElementById("missaoAtual").textContent = robo.missaoAtual;
  document.getElementById("horaAtualizacao").textContent = new Date().toLocaleTimeString();

  const divAlertas = document.getElementById("alertas");
  divAlertas.innerHTML = "";

  if (robo.bateria < 20) {
  divAlertas.innerHTML += "<p>⚠️ Bateria baixa!</p>";
  }

  if (robo.latencia > 100) {
  divAlertas.innerHTML += "<p>⚠️ Latência alta!</p>";
  }

  const falha = missoes.find(m => m.status === "falha");

  if (falha) {
    divAlertas.innerHTML += `<p>❌ Missão ${falha.id} falhou!</p>`;
  }
  
}

function enviarStatus(missao) {
  const json = {
    missao: missao.id,
    status: missao.status
  };

  document.getElementById("jsonSaida").textContent =
  JSON.stringify(json, null, 2);
}

setInterval(atualizarTelemetria, 2000);


