// Configuração das datas importantes
const firstMeetDate = new Date('2025-02-15');
const firstKissDate = new Date('2025-02-27');
const proposalDate = new Date('2025-05-10');
const weddingDate = new Date('2026-11-20');

// Mostra a surpresa do pedido de casamento
function showProposalSurprise() {
    const proposal = document.getElementById('proposal-surprise');
    proposal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Cria muitos corações para celebrar
    for (let i = 0; i < 50; i++) {
        createHearts();
    }
}

// Esconde a surpresa do pedido de casamento
function hideProposalSurprise() {
    const proposal = document.getElementById('proposal-surprise');
    proposal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Atualiza o contador de tempo juntos
function updateCounters() {
    const now = new Date();
    
    // Tempo desde o primeiro encontro
    const timeTogether = now - firstMeetDate;
    
    const days = Math.floor(timeTogether / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeTogether % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeTogether % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeTogether % (1000 * 60)) / 1000);
    
    document.getElementById('days-together').textContent = days;
    document.getElementById('hours-together').textContent = hours;
    document.getElementById('minutes-together').textContent = minutes;
    document.getElementById('seconds-together').textContent = seconds;
    
    // Contagem regressiva para o casamento
    const timeToWedding = weddingDate - now;
    if (timeToWedding > 0) {
        const weddingDays = Math.floor(timeToWedding / (1000 * 60 * 60 * 24));
        document.getElementById('wedding-countdown').textContent = `Faltam ${weddingDays} dias`;
    } else {
        document.getElementById('wedding-countdown').textContent = `Já casados!`;
    }
}

// Cria corações flutuantes
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '♥';
    
    // Posição aleatória
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    
    heartsContainer.appendChild(heart);
    
    // Remove o coração após a animação terminar
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Atualiza o ano atual no footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Inicializa e atualiza os contadores
updateCounters();
setInterval(updateCounters, 1000);

// Cria corações periodicamente
setInterval(createHearts, 300);

// Mostra a surpresa do pedido de casamento (já aconteceu)
showProposalSurprise();

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-lightbox');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Get all gallery images
const galleryImages = document.querySelectorAll('.gallery-item img');
let currentImageIndex = 0;

// Open lightbox when clicking on an image
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navigation between images
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightbox();
    }
});

// Update lightbox content
function updateLightbox() {
    const currentImage = galleryImages[currentImageIndex];
    lightboxImg.src = currentImage.src;
    lightboxCaption.textContent = currentImage.getAttribute('data-caption') || currentImage.alt;
}

// Proposal surprise buttons
document.getElementById('see-more').addEventListener('click', () => {
    alert('Estamos planejando cada detalhe do nosso casamento para que seja o dia mais especial das nossas vidas! ❤️');
    hideProposalSurprise();
});