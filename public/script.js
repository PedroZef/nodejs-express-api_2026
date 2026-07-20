const grid = document.getElementById('podcastsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

async function fetchPodcasts(query = '') {
    grid.innerHTML = '';
    loading.classList.remove('hidden');
    error.classList.add('hidden');

    try {
        const API_BASE = 'http://localhost:3333';
        const url = query ? `${API_BASE}/api/podcasts?podcastName=${encodeURIComponent(query)}` : `${API_BASE}/api/list`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Falha na requisição');
        
        const data = await response.json();
        
        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 0;">Nenhum podcast encontrado.</div>';
            return;
        }

        renderCards(data);
    } catch (err) {
        console.error(err);
        error.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function renderCards(podcasts) {
    podcasts.forEach((podcast, index) => {
        const card = document.createElement('a');
        card.href = podcast.link || '#';
        card.target = "_blank";
        card.className = 'card';
        card.style.animation = `float 0.5s ease backwards ${index * 0.1}s`;
        
        const tags = podcast.categories.map(cat => `<span class="tag">${cat}</span>`).join('');
        const cover = podcast.cover || 'https://via.placeholder.com/640x360.png?text=Sem+Imagem';
        
        card.innerHTML = `
            <img src="${cover}" alt="${podcast.episode}" class="card-image" loading="lazy">
            <div class="card-content">
                <div class="podcast-name">${podcast.podcastName}</div>
                <h3 class="episode-title">${podcast.episode}</h3>
                <div class="categories">${tags}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => fetchPodcasts(searchInput.value.trim()));
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchPodcasts(searchInput.value.trim());
});

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        document.body.classList.remove('light-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    applyTheme(true);
}

themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-mode');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Initial Load
fetchPodcasts();
