// Import semua modul yang kita butuhkan
import { loadContent } from './modules/dom-loader.js';
import { initStickyHeader } from './modules/sticky-header.js';
import { initNestedScroll } from './modules/nested-scroll.js';
import { initHorizontalCarousel } from './modules/horizontal-carousel.js';

// Fungsi utama yang akan dijalankan saat halaman dimuat
async function main() {
    // 1. Muat semua konten HTML dari partials
    await loadContent();

    // 2. Setelah konten siap, jalankan semua skrip inisialisasi
    //    yang bergantung pada elemen DOM.
    console.log("Konten dimuat, menginisialisasi skrip...");
    initStickyHeader();
    initNestedScroll();
    initHorizontalCarousel();
    console.log("Semua skrip berhasil diinisialisasi.");
}

// Jalankan fungsi utama setelah DOM siap
document.addEventListener('DOMContentLoaded', main);