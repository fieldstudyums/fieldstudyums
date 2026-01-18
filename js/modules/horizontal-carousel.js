export function initHorizontalCarousel() {
    const locationsSection = document.querySelector("#locations");
    if (locationsSection) {
        const track = locationsSection.querySelector(".locations-track");
        const prevButton = locationsSection.querySelector(".arrow-left");
        const nextButton = locationsSection.querySelector(".arrow-right");
        const originalCards = gsap.utils.toArray(".location-card", track);
        const numOriginalCards = originalCards.length;

        if (numOriginalCards === 0) return;

        // Gandakan semua kartu untuk efek loop tak terbatas
        originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
        originalCards.slice().reverse().forEach(card => track.prepend(card.cloneNode(true)));
        
        let isMoving = false;
        let currentIndex = numOriginalCards; // Mulai dari set asli pertama
        let cardWidth = 0;
        const gap = 25;

        const setPosition = (instant = false) => {
            if (instant) track.style.transition = 'none';
            
            const offset = (locationsSection.offsetWidth / 2) - (cardWidth / 2);
            track.style.transform = `translateX(${-currentIndex * (cardWidth + gap) + offset}px)`;

            if (instant) {
                track.offsetHeight; // Paksa browser render posisi baru
                track.style.transition = 'transform 0.6s ease-in-out';
            }
        };
        
        const updateOnResize = () => {
            cardWidth = originalCards[0].offsetWidth;
            setPosition(true);
        };

        const move = (direction) => {
            if (isMoving) return;
            isMoving = true;
            currentIndex += direction;
            setPosition();
        };

        track.addEventListener('transitionend', () => {
            isMoving = false;
            // Reset ke posisi awal jika mencapai klon di kanan
            if (currentIndex >= numOriginalCards * 2) {
                currentIndex = numOriginalCards;
                setPosition(true);
            }
            // Reset ke posisi awal jika mencapai klon di kiri
            if (currentIndex < numOriginalCards) {
                currentIndex = numOriginalCards * 2 - 1;
                setPosition(true);
            }
        });

        nextButton.addEventListener('click', () => move(1));
        prevButton.addEventListener('click', () => move(-1));
        
        window.addEventListener('resize', updateOnResize);
        updateOnResize();
    }
}