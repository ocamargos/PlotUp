// ====== SAMPLE DATA ======
const sampleResults = [
    {
        type: 'usuario',
        name: 'Ana Silva',
        username: 'anasilva',
        avatar: 'AS',
        content: 'Desenvolvedora Full Stack apaixonada por tecnologia e inovação. Criando soluções que fazem a diferença!',
        category: 'tecnologia',
        date: '2 dias atrás',
        badge: 'Verificado',
        stats: '2.5k seguidores'
    },
    {
        type: 'post',
        name: 'Carlos Mendes',
        username: 'carlosm',
        avatar: 'CM',
        content: 'Acabei de lançar meu novo projeto de design! 🎨 Depois de 3 meses de trabalho, finalmente está no ar. Confira e me diga o que achou!',
        category: 'design',
        date: '5 horas atrás',
        badge: 'Trending',
        stats: '245 curtidas'
    },
    {
        type: 'usuario',
        name: 'Marina Costa',
        username: 'marinacosta',
        avatar: 'MC',
        content: 'Especialista em Marketing Digital e Growth Hacking. Ajudando empresas a crescerem online.',
        category: 'marketing',
        date: '1 semana atrás',
        badge: 'Popular',
        stats: '8.2k seguidores'
    },
    {
        type: 'post',
        name: 'Pedro Santos',
        username: 'pedrosantos',
        avatar: 'PS',
        content: 'Reflexão do dia: A melhor forma de prever o futuro é inventá-lo. Não espere acontecer, faça acontecer! 💪',
        category: 'negocios',
        date: '1 dia atrás',
        badge: 'Destaque',
        stats: '567 curtidas'
    },
    {
        type: 'usuario',
        name: 'Julia Oliveira',
        username: 'juliaoliveira',
        avatar: 'JO',
        content: 'UX/UI Designer focada em criar experiências memoráveis. Design centrado no usuário é minha paixão!',
        category: 'design',
        date: '3 dias atrás',
        badge: 'Novo',
        stats: '1.2k seguidores'
    },
    {
        type: 'post',
        name: 'Rafael Lima',
        username: 'rafaellima',
        avatar: 'RL',
        content: 'Compartilhando meu primeiro artigo sobre arquitetura de software! Feedbacks são muito bem-vindos 🚀',
        category: 'tecnologia',
        date: '12 horas atrás',
        badge: 'Em alta',
        stats: '189 curtidas'
    },
    {
        type: 'usuario',
        name: 'Beatriz Ferreira',
        username: 'beatrizf',
        avatar: 'BF',
        content: 'Product Manager com foco em estratégia e crescimento. Transformando ideias em produtos incríveis.',
        category: 'negocios',
        date: '4 dias atrás',
        badge: 'Destaque',
        stats: '3.8k seguidores'
    },
    {
        type: 'post',
        name: 'Lucas Rocha',
        username: 'lucasrocha',
        avatar: 'LR',
        content: 'Dica de produtividade: Use a técnica Pomodoro para aumentar seu foco. 25 minutos de trabalho intenso + 5 de descanso! ⏱️',
        category: 'negocios',
        date: '8 horas atrás',
        badge: 'Popular',
        stats: '423 curtidas'
    },
    {
        type: 'usuario',
        name: 'Fernanda Souza',
        username: 'fernandasouza',
        avatar: 'FS',
        content: 'Content Creator e Social Media. Ajudando marcas a contarem suas histórias de forma autêntica.',
        category: 'marketing',
        date: '2 dias atrás',
        badge: 'Verificado',
        stats: '5.6k seguidores'
    },
    {
        type: 'post',
        name: 'Thiago Alves',
        username: 'thiagoalves',
        avatar: 'TA',
        content: 'Meu workflow de design atualizado! Figma + Notion + Linear = produtividade máxima. O que vocês usam? 🛠️',
        category: 'design',
        date: '1 dia atrás',
        badge: 'Trending',
        stats: '312 curtidas'
    },
    {
        type: 'usuario',
        name: 'Camila Martins',
        username: 'camilamartins',
        avatar: 'CM',
        content: 'Empreendedora digital e mentora de negócios. Ajudando pessoas a realizarem seus sonhos.',
        category: 'negocios',
        date: '5 dias atrás',
        badge: 'Popular',
        stats: '4.3k seguidores'
    },
    {
        type: 'post',
        name: 'Gabriel Dias',
        username: 'gabrieldias',
        avatar: 'GD',
        content: 'Acabei de finalizar um curso sobre IA e Machine Learning. O futuro já chegou e é incrível! 🤖✨',
        category: 'tecnologia',
        date: '3 horas atrás',
        badge: 'Novo',
        stats: '156 curtidas'
    }
];

let currentResults = [...sampleResults];

// ====== RENDER RESULTS ======
function renderResults(results) {
    const grid = document.getElementById('resultsGrid');
    
    if (results.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">😔</div>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente ajustar seus filtros ou termos de pesquisa</p>
            </div>
        `;
        document.getElementById('resultsCount').textContent = '0 resultados encontrados';
        return;
    }

    grid.innerHTML = results.map(result => `
        <div class="result-card">
            <div class="result-user">
                <div class="result-avatar">${result.avatar}</div>
                <div class="result-user-info">
                    <div class="result-name">${result.name}</div>
                    <div class="result-username">@${result.username}</div>
                </div>
            </div>
            <div class="result-content">${result.content}</div>
            <div class="result-meta">
                <span>🕐 ${result.date}</span>
                <span>📁 ${result.category}</span>
                <span>${result.stats}</span>
            </div>
            <div style="margin-top: 12px;">
                <span class="result-badge">${result.badge}</span>
            </div>
        </div>
    `).join('');

    document.getElementById('resultsCount').textContent = 
        `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
}

// ====== SEARCH FUNCTION ======
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    let filtered = [...sampleResults];

    if (searchTerm) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(searchTerm) ||
            r.username.toLowerCase().includes(searchTerm) ||
            r.content.toLowerCase().includes(searchTerm)
        );
    }

    if (typeFilter) {
        filtered = filtered.filter(r => r.type === typeFilter);
    }

    if (categoryFilter) {
        filtered = filtered.filter(r => r.category === categoryFilter);
    }

    currentResults = filtered;
    renderResults(filtered);
}

// ====== SORT FUNCTION ======
function handleSort() {
    const sortValue = document.getElementById('sortSelect').value;
    // Sort logic can be implemented here
    console.log('Sorting by:', sortValue);
}

// ====== EVENT LISTENERS ======
document.addEventListener('DOMContentLoaded', () => {
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter change events
    document.getElementById('typeFilter').addEventListener('change', performSearch);
    document.getElementById('dateFilter').addEventListener('change', performSearch);
    document.getElementById('categoryFilter').addEventListener('change', performSearch);
    document.getElementById('popularityFilter').addEventListener('change', performSearch);

    // Initial render
    renderResults(sampleResults);
});