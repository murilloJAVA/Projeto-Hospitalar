// =============================
// NAVEGAÇÃO ENTRE TELAS
// =============================
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

  lista.forEach(m => {
    const div = document.createElement("div");

    div.innerHTML = `
      <hr>
      <p><strong>Missão ${m.id}</strong></p>
      <p>Origem: ${m.origem}</p>
      <p>Destino: ${m.destino}</p>
      <p>Tipo: ${m.tipo}</p>
      <p>Prioridade: ${m.prioridade}</p>
      <p>Distância: ${m.distancia}m</p>
      <p>Status: ${m.status}</p>
    `;

    container.appendChild(div);
  });
}


// =============================
// CADASTRAR NOVA MISSÃO
// =============================
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

