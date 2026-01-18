/**
 * Memuat konten HTML dari folder partials ke dalam elemen target.
 */
export async function loadContent() {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) {
        console.error('App container not found!');
        return;
    }

    // Daftar file partials yang akan dimuat
    const structuralPartials = ['partials/header.html'];
    const sectionPartials = [
        'partials/section_intro.html',
        'partials/section2.html',
        'partials/section3.html',
        'partials/section4.html',
        'partials/section5.html',
        'partials/section_footer.html'
    ];

    try {
        // Muat struktur utama (header dan main-container)
        const headerRes = await fetch(structuralPartials[0]);
        appContainer.innerHTML = await headerRes.text();

        // Temukan main-container yang baru saja ditambahkan
        const mainContainer = appContainer.querySelector('.main-container');
        if (!mainContainer) {
            console.error('Main container not found inside header partial!');
            return;
        }
        
        // Muat semua section secara paralel
        const sectionPromises = sectionPartials.map(path => fetch(path).then(res => res.text()));
        const sectionHTMLs = await Promise.all(sectionPromises);
        
        // Gabungkan HTML semua section dan masukkan ke main-container
        mainContainer.innerHTML = sectionHTMLs.join('');

    } catch (error) {
        console.error('Error loading partials:', error);
        appContainer.innerHTML = '<p style="color:white; text-align:center;">Gagal memuat konten halaman.</p>';
    }
}