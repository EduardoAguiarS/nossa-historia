    // Configuração das datas importantes
    const firstMeetDate = new Date('2025-02-27');
    const relationshipDate = new Date('2025-03-05');
    const proposalDate = new Date('2025-05-10');
    const weddingDate = new Date('2026-11-21');

    // Verifica se é dia do pedido de casamento ou depois
    function checkProposalDate() {
        const now = new Date();
        if (now >= proposalDate) {
            // Se já passou da data do pedido, mostra a surpresa
            showProposalSurprise();
        } else {
            // Se ainda não chegou, mostra um alerta no dia 10 de maio
            const timeToProposal = proposalDate - now;
            const daysToProposal = Math.floor(timeToProposal / (1000 * 60 * 60 * 24));
            
            if (daysToProposal === 0) {
                // É dia 10 de maio!
                showProposalSurprise();
            }
        }
    }

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
        
        // Contagem regressiva para o pedido de casamento
        const timeToProposal = proposalDate - now;
        if (timeToProposal > 0) {
            const proposalDays = Math.floor(timeToProposal / (1000 * 60 * 60 * 24));
            document.getElementById('proposal-countdown').textContent = `Faltam ${proposalDays} dias`;
        } else {
            document.getElementById('proposal-countdown').textContent = `Dia Especial!`;
        }
        
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

    // Verifica se é dia do pedido de casamento
    checkProposalDate();

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
    document.getElementById('accept-proposal').addEventListener('click', () => {
        alert('Eu te amo mais que tudo neste mundo! ❤️ Vamos viver esse momento mágico juntos!');
        hideProposalSurprise();
    });

    document.getElementById('see-more').addEventListener('click', () => {
        alert('Vamos passar o dia em Aparecida do Norte. Prepare-se para uma surpresa especial às 16h no Santuário Nacional! ❤️');
        hideProposalSurprise();
    });

    // Mostrar modal de boas-vindas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const welcomeModal = document.getElementById('welcome-modal');
    welcomeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Atualizar contagem regressiva no modal
    updateProposalCountdown();
    setInterval(updateProposalCountdown, 1000);
    
    // Fechar modal
    document.querySelector('.close-welcome').addEventListener('click', function() {
        welcomeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    document.getElementById('continue-to-site').addEventListener('click', function() {
        welcomeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Contagem regressiva detalhada para o pedido de casamento
function updateProposalCountdown() {
    const now = new Date();
    const timeToProposal = proposalDate - now;
    
    if (timeToProposal > 0) {
        const days = Math.floor(timeToProposal / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeToProposal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeToProposal % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeToProposal % (1000 * 60)) / 1000);
        
        // Atualizar modal
        document.getElementById('days-until-proposal-modal').textContent = days;
        
        // Atualizar contagem regressiva
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Adicionar mensagem especial quando faltar pouco tempo
        if (days === 0) {
            document.querySelector('.proposal-message').innerHTML = `
                <strong>O grande dia chegou!</strong><br><br>
                Hoje, diante de Nossa Senhora Aparecida, vou te mostrar o quanto você é especial.<br><br>
                Se você pudesse ver o amor que tenho por você, entenderia que cada detalhe seu é uma obra-prima que eu tenho a honra de admirar todos os dias.
            `;
        }
    }
}

// Adicionar imagem de Nossa Senhora Aparecida na seção de mensagem
const loveLetter = document.querySelector('.love-letter');
const maryElement = document.createElement('div');
maryElement.className = 'mary-image';
maryElement.innerHTML = `
    <img src="https://i.pinimg.com/originals/e5/5e/5a/e55e5a6fdfa28d8b18b3542c6ff70c60.png" alt="Nossa Senhora Aparecida" style="width: 100px; filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5));">
    <p style="font-size: 0.9rem; margin-top: 10px;">Que Nossa Senhora Aparecida abençoe nosso amor</p>
`;
loveLetter.insertBefore(maryElement, loveLetter.querySelector('.signature'));