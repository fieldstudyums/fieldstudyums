export function initStickyHeader() {
    const mainContainer = document.querySelector('.main-container');
    const stickyHeader = document.querySelector('.sticky-header');

    if (!mainContainer || !stickyHeader) return;

    const handleScroll = () => {
        const viewportHeight = window.innerHeight;
        // Atur snap type berdasarkan posisi scroll
        mainContainer.style.scrollSnapType = mainContainer.scrollTop < viewportHeight * 0.9 ? 'y mandatory' : 'none';
        // Tampilkan header jika sudah melewati section pertama
        stickyHeader.classList.toggle('active', mainContainer.scrollTop >= viewportHeight);
    };

    mainContainer.addEventListener('scroll', handleScroll);
}