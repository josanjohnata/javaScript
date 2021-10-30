let seuVotoPara = document.querySelector(".d1-1 span");
let cargo = document.querySelector(".d1-2 span");
let descricao = document.querySelector(".d1-4");
let aviso = document.querySelector(".d2");
let lateral = document.querySelector(".d1-right");
let numeros = document.querySelector(".d1-3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;
let votos = [];

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHtml = "";
  numero = "";
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i += 1) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.name}<br/>Partido: ${candidato.partido}`;
    aviso.style.display = "block";

    let fotosHtml = "";
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d1-img small"><img src="./img/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d1-img"><img src="./img/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      }
    }

    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = '<div class="votoNuloBranco pisca">VOTO NULO</div>';
  }
}

function clicou(n) {
  let elementNumero = document.querySelector(".numero.pisca");
  if (elementNumero !== null) {
    elementNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elementNumero.classList.remove("pisca");
    if (elementNumero.nextElementSibling !== null) {
      elementNumero.nextElementSibling.classList.add("pisca");
    } else {
      atualizaInterface();
    }
  }
}

function branco() {
  numero = "";
  votoBranco = true;
  seuVotoPara.style.display = "block";
  aviso.style.display = "block";
  numeros.innerHTML = "";
  descricao.innerHTML =
    '<div class="votoNuloBranco pisca">VOTO EM BRANCO</div>';
  lateral.innerHTML = "";
}

function corrige() {
  comecarEtapa();
}

function confirma() {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;

  if (votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'Branco'
    });
    console.log("Confirmando como BRANCO...");
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  }

  if (votoConfirmado) {
    etapaAtual += 1;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="fim pisca">FIM!</div>';
      console.log(votos);
    }
  }
}

comecarEtapa();
