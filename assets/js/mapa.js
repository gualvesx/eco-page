    // Inicializa o mapa cobrindo toda a tela, com centro no Brasil
    var map = L.map('map', {
        center: [-22.12918223115807, -51.39940012356393],
        zoom: 13
});

// Adiciona os tiles do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Lista de locais ecológicos
var locais = [
  { nome: "Presidente Prudente", lat: -22.12918223115807 , lon: -51.39940012356393 },
  { nome: "Floresta da Tijuca", lat: -22.9519, lon: -43.2105 },
  { nome: "Parque Nacional da Serra da Capivara", lat: -9.2132, lon: -42.8013 }
];

// Percorre a lista e adiciona os marcadores no mapa
locais.forEach(local => {
  L.marker([local.lat, local.lon]).addTo(map)
    .bindPopup(`🌿 ${local.nome}`);
});

// Define um ícone personalizado com tema ecológico
var iconePersonalizado = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/490/490091.png', // Ícone de folha
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Adiciona alguns marcadores com o ícone ecológico
var marcadoresEcologicos = [
  { lat: -22.1023, lon: -51.4442, texto: 'Refúgio Ecológico - Área de Proteção' },
  { lat: -22.1237, lon: -51.4024, texto: 'Reserva Ambiental - Projeto de Reflorestamento' },
  { lat: -22.1113, lon: -51.3674, texto: 'Espaço Verde Urbano - Conexão com a Natureza' }
];
marcadoresEcologicos.forEach(marcador => {
  L.marker([marcador.lat, marcador.lon], { icon: iconePersonalizado }).addTo(map)
    .bindPopup(`🌱 ${marcador.texto}`);
});

// Array para armazenar pontos marcados dinamicamente
let pontos = [];

// Função para adicionar marcador ao clicar no mapa e salvar o ponto
map.on('click', function(e) {
  // Cria um marcador com o ícone personalizado
  L.marker([e.latlng.lat, e.latlng.lng], { icon: iconePersonalizado }).addTo(map)
    .bindPopup('🌳 Novo ponto ecológico!');
  
  // Armazena a posição clicada
  let ponto = {
    lat: e.latlng.lat,
    lng: e.latlng.lng
  };
  pontos.push(ponto);

  // Salva os pontos no LocalStorage
  localStorage.setItem("pontos", JSON.stringify(pontos));
  console.log("Ponto salvo:", ponto);
});

// Função para limpar os marcadores adicionados dinamicamente (exemplo)
function limparMarcadores() {
  pontos = [];
  localStorage.removeItem("pontos");
  // Para simplificar, recarregamos a página para limpar os marcadores dinâmicos
  location.reload();
}

// Carrega pontos salvos ao abrir o site
window.onload = function() {
  let pontosSalvos = localStorage.getItem("pontos");
  if (pontosSalvos) {
    pontos = JSON.parse(pontosSalvos);
    pontos.forEach(p => {
      L.marker([p.lat, p.lng], { icon: iconePersonalizado }).addTo(map)
        .bindPopup('🌳 Ponto ecológico salvo!');
    });
  }
};