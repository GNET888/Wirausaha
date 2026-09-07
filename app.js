// Fungsi Berpindah ke Halaman Artikel Khusus
function openArticle(articleKey) {
    const article = articlesData[articleKey];
    if (!article) return;
    
    // Isi data ke halaman artikel
    document.getElementById('page-article-category').textContent = article.category;
    document.getElementById('page-article-title').textContent = article.title;
    document.getElementById('page-article-author').textContent = article.author;
    document.getElementById('page-article-time').textContent = article.time;
    document.getElementById('page-article-image').src = article.image;
    document.getElementById('page-article-content').innerHTML = article.content;
    
    // Sembunyikan beranda, tampilkan halaman artikel
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('article-page').classList.add('active');
    
    // Scroll ke atas halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi Kembali ke Beranda
function showHome() {
    document.getElementById('article-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi Tombol "Lihat Analisis Lengkap"
function loadMoreArticles() {
    const terkiniList = document.getElementById('terkini-list');
    const newItems = document.createElement('li');
    newItems.className = 'flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pb-4 border-b dark:border-gray-700 group cursor-pointer';
    newItems.setAttribute('onclick', "openArticle('side-1')");
    newItems.innerHTML = `
        <div class="w-full sm:w-40 h-28 sm:h-24 overflow-hidden rounded-md flex-shrink-0"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover group-hover-image transition-transform duration-300" alt="Arsip"></div>
        <div>
            <span class="text-xs font-bold text-gray-500">ARSIP STRATEGIS</span>
            <h3 class="text-xl font-bold mt-1 article-title-hover">Evaluasi Komprehensif Ekosistem Wirausaha Nasional</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">Laporan tahunan mengenai efektivitas inkubasi bisnis dan pertumbuhan kemitraan strategis lintas sektor...</p>
            <p class="text-xs text-gray-500 mt-2">Arsip Dokumen</p>
        </div>
    `;
    terkiniList.appendChild(newItems);
    document.getElementById('load-more-btn').textContent = "SEMUA LAPORAN TELAH DITAMPILKAN";
    document.getElementById('load-more-btn').disabled = true;
    document.getElementById('load-more-btn').classList.add('opacity-50', 'cursor-not-allowed');
}

// Pencarian (Search Bar Interaktif)
function handleSearch(query) {
    if (!query.trim()) return;
    showHome();
    const banner = document.getElementById('content-header-banner');
    const bannerText = document.getElementById('banner-text');
    banner.classList.remove('hidden');
    bannerText.textContent = `Hasil pencarian topik: "${query}"`;
    window.scrollTo({ top: 200, behavior: 'smooth' });
}

function resetSearchBanner() {
    document.getElementById('content-header-banner').classList.add('hidden');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Inisialisasi Event Listeners & State saat DOM Siap
document.addEventListener('DOMContentLoaded', function() {
    const desktopSearch = document.getElementById('desktop-search');
    if (desktopSearch) {
        desktopSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
            }
        });
    }
    
    const mobileSearch = document.getElementById('mobile-search');
    if (mobileSearch) {
        mobileSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
                toggleMobileMenu();
            }
        });
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (lightIcon) lightIcon.classList.add('hidden');
        if (darkIcon) darkIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if (lightIcon) lightIcon.classList.remove('hidden');
        if (darkIcon) darkIcon.classList.add('hidden');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (lightIcon) lightIcon.classList.toggle('hidden');
            if (darkIcon) darkIcon.classList.toggle('hidden');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    
    const header = document.getElementById('main-header');
    const placeholder = document.querySelector('.placeholder-for-sticky');
    if (header && placeholder) {
        const headerHeight = header.offsetHeight;
        placeholder.style.height = `${headerHeight}px`;
        window.onscroll = () => {
            header.classList.toggle('sticky', window.pageYOffset > 50);
        };
    }
    
    function updateDateTime() {
        const datetimeElement = document.getElementById('current-datetime');
        if (datetimeElement) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            datetimeElement.textContent = now.toLocaleDateString('id-ID', options) + ' WIB';
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 60000);
});
