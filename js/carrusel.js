const carrusel_folder = '/img/carrusel/';
const carruselItems = [
    '1920_290.jpg',
    '640_119.jpg',
    '612_153.jpg',
    '1500_397.jpg',
    '1040_280.jpg.webp',
    '1000_281.jpg',
    '945_280.jpg.webp',
    '1680_500.jpg',
    '1920_640.jpg',
    '720_264.jpg',
    '1100_413.jpg',
    '1200_600.png',
];

const fileTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    bmp: 'image/bmp',
    
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    avi: 'video/avi',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska'
};

function getFileMIME(src) {
    const parts = src.split('.');
    const ext = parts.length > 1 ? parts.pop().toLowerCase() : '';
    return fileTypes[ext] || null;
}

function loadCarouselItems() {
    const carouselInner = document.getElementById('carouselItems');
    const carouselIndicators = document.getElementById('carouselIndicators');

    carruselItems.forEach((file_name, index) => {
        const itemMIME = getFileMIME(file_name);
        if (!itemMIME) {
            return;
        }
        
        const indic = document.createElement('button');
        indic.setAttribute('type', 'button');
        indic.setAttribute('data-bs-target', '#carouselHero');
        indic.setAttribute('data-bs-slide-to', index);
        indic.setAttribute('aria-label', `Slide ${index + 1}`);

        const divItem = document.createElement('div');
        divItem.classList.add('carousel-item');

        if (index === 0) {
            divItem.classList.add('active');
            indic.classList.add('active');
            indic.setAttribute('aria-current', 'true');
        }

        if (itemMIME.startsWith('video')) {
            const video = document.createElement('video');
            video.classList.add('d-block', 'w-100');
            video.autoplay = true;
            video.loop = true;
            video.muted = true;

            video.setAttribute('playsinline', 'true');

            const source = document.createElement('source');
            source.src = carrusel_folder + file_name;
            source.type = itemMIME;

            video.appendChild(source);
            divItem.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.classList.add('d-block', 'w-100');
            img.src = carrusel_folder + file_name;
            img.alt = `Elemento de carrusel: ${file_name}`;
            divItem.appendChild(img);
        }

        carouselInner.appendChild(divItem);
        carouselIndicators.appendChild(indic);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadCarouselItems();
});