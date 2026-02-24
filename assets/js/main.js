/** Añadir lógica */
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ELEMENTOS DEL DOM ---
    const statusElement = document.getElementById('js-check');
    const audio = document.getElementById('pistas-control');
    const playBtn = document.getElementById('btn-play');
    const playIcon = playBtn.querySelector('img');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const pistaNombre = document.getElementById('pista-nombre');
    const progreso = document.getElementById('progreso');
    const contenedorLista = document.getElementById('lista-nombre');
   
    let indiceActual = 0;

    // --- 2. VERIFICACIÓN DE CONFIGURACIÓN ---
    if (typeof CONFIG !== 'undefined' && typeof playlist !== 'undefined') {
        console.log("✅ Sistema Halcón: Configuración y Playlist detectadas.");
        statusElement.innerText = "¡Sistema Halcón Online!";
        statusElement.style.color = "var(--color-principal)";
    } else {
        console.error("❌ Error: No se encontró CONFIG o Playlist.");
        if(statusElement) statusElement.innerText = "Error de carga";
        return; 
    }

    // --- 3. FUNCIONES LÓGICAS ---
    function cargarCancion(indice) {
        const cancion = playlist[indice];
        audio.src = CONFIG.ROOT_AUDIO + cancion.archivo;
        pistaNombre.textContent = `${cancion.titulo} - ${cancion.artista}`;
        actualizarInterfazLista(indice);
    }

    function actualizarInterfazLista(indice) {
        const anterior = document.querySelector('.pista-activa');
        if(anterior) anterior.classList.remove('pista-activa');

        const botonActual = document.querySelector(`[data-indice="${indice}"]`);
        if(botonActual)  {
            botonActual.classList.add('pista-activa');
            botonActual.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }

    // --- 4. EVENTOS DE CONTROL ---
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.src = CONFIG.ROOT_ICONS + 'pause.svg';
        } else {
            audio.pause();
            playIcon.src = CONFIG.ROOT_ICONS + 'play-fill.svg';
        }
    });

    btnNext.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % playlist.length;
        cargarCancion(indiceActual);
        audio.play();
        playIcon.src = CONFIG.ROOT_ICONS + 'pause.svg';
    });

    btnPrev.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + playlist.length) % playlist.length;
        cargarCancion(indiceActual);
        audio.play();
        playIcon.src = CONFIG.ROOT_ICONS + 'pause.svg';
    });

    // --- 5. BARRA DE PROGRESO ---
    audio.addEventListener('timeupdate', () => { 
        if (audio.duration) {
            const porcentaje = (audio.currentTime / audio.duration) * 100;
            progreso.value = porcentaje;
        }
    });

    audio.addEventListener('ended', () => {
        btnNext.click();
    });

    progreso.addEventListener('input', () =>  {
        if (!isNaN(audio.duration)) {
            const tiempoDestino = (progreso.value / 100) * audio.duration;
            audio.currentTime = tiempoDestino;
        }
    });

    // ---- 7. Inyección Dinámica de PlayList ---
    playlist.forEach((cancion, indice) => {
        const item = document.createElement('button');
        item.classList.add('pista-item');
        item.setAttribute('data-indice', indice);
        item.textContent = `${cancion.titulo}`;
        
        item.addEventListener('click', () => {
            indiceActual = indice; 
            cargarCancion(indiceActual);
            audio.play();
            playIcon.src = CONFIG.ROOT_ICONS + 'pause.svg';
        });
        
        contenedorLista.appendChild(item); // Solo una vez
    });

    // --- 6. INICIO (Al final para que el DOM esté listo) ---
    cargarCancion(indiceActual);
});