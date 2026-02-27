// Configuración global de rutas (El "mapa" de tu proyecto)
const CONFIG = {
    ROOT_IMG: './assets/img/',
    ROOT_AUDIO: './assets/audio/', //Nueva ruta
    ROOT_ICONS: './assets/icons/', //Nueva ruta
    ROOT_JS: './assets/js/',
    API_URL: 'https://api.ejemplo.com/v1/' // Para cuando aprendas a conectar datos
};
const playlist = [
    {titulo: 'Cabeça pra Vovó', artista: 'Bezerra Da Silva', archivo: 'Cabeza_pra_Vovo.mp3'},
    {titulo: 'Meu Pai é General de Umbanda', artista: 'Bezerra Da Silva', archivo: 'Meu_Pai_es_General_de_Umbanda.mp3'},
    {titulo: 'Terreiro de Safado', artista: 'Bezerra Da Silva', archivo: 'Terreiro_de_Safado.mp3'},
    {titulo: 'Vovô Tira-Tira', artista: 'Bezerra Da Silva', archivo: 'Vovo_tira-tira.mp3'},
    {titulo: 'Arruda de Guiné', artista: 'Bezerra Da Silva', archivo: 'Arruda_de_Guine.mp3'},
    {titulo: 'Pai Veio 171', artista: 'Bezerra Da Silva', archivo: 'Pai_Veio_171.mp3'}
];

// Ejemplo de uso:
const miImagen = CONFIG.ROOT_IMG + 'foto-perfil.jpg'; 
console.log("Cargando desde:", miImagen);