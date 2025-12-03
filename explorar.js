// ====== SAMPLE DATA ======

const categories = [
    { id: 1, name: 'Tecnologia', icon: '💻', count: '3.2k posts' },
    { id: 2, name: 'Design', icon: '🎨', count: '2.8k posts' },
    { id: 3, name: 'Negócios', icon: '💼', count: '2.1k posts' },
    { id: 4, name: 'Educação', icon: '📚', count: '1.9k posts' },
    { id: 5, name: 'Saúde', icon: '🏥', count: '1.5k posts' },
    { id: 6, name: 'Viagens', icon: '✈️', count: '1.3k posts' },
    { id: 7, name: 'Gastronomia', icon: '🍳', count: '1.1k posts' },
    { id: 8, name: 'Esportes', icon: '⚽', count: '980 posts' }
];

const trendingPosts = [
    {
        id: 1,
        author: { name: 'Lucas Tech', username: 'lucastech', avatar: 'LT' },
        title: 'O Futuro da IA Generativa',
        description: 'Explorando as últimas tendências em inteligência artificial e como isso vai mudar o mundo...',
        icon: '🤖',
        badge: '🔥 Trending',
        likes: 1245,
        comments: 189,
        views: '12.5k'
    },
    {
        id: 2,
        author: { name: 'Maria Design', username: 'mariadesign', avatar: 'MD' },
        title: 'Princípios de UX que Todo Designer Deveria Conhecer',
        description: 'Um guia completo sobre os fundamentos do design de experiência do usuário...',
        icon: '🎯',
        badge: '⭐ Popular',
        likes: 987,
        comments: 156,
        views: '9.8k'
    },
    {
        id: 3,
        author: { name: 'Pedro Empreendedor', username: 'pedroempreendedor', avatar: 'PE' },
        title: 'Como Escalar sua Startup em 2024',
        description: 'Estratégias comprovadas para crescimento acelerado e captação de investimentos...',
        icon: '🚀',
        badge: '💡 Insight',
        likes: 756,
        comments: 98,
        views: '7.2k'
    },
    {
        id: 4,
        author: { name: 'Ana Produtividade', username: 'anaprodutividade', avatar: 'AP' },
        title: 'Técnicas de Gestão de Tempo para Profissionais',
        description: 'Métodos eficazes para aumentar sua produtividade e equilibrar vida pessoal e profissional...',
        icon: '⏰',
        badge: '🔥 Trending',
        likes: 892,
        comments: 134,
        views: '8.5k'
    },
    {
        id: 5,
        author: { name: 'Carlos Dev', username: 'carlosdev', avatar: 'CD' },
        title: 'Arquitetura de Software Moderna',
        description: 'Padrões e práticas para construir sistemas escaláveis e resilientes...',
        icon: '🏗️',
        badge: '💻 Tech',
        likes: 1034,
        comments: 201,
        views: '11.2k'
    },
    {
        id: 6,
        author: { name: 'Fernanda Marketing', username: 'fernandamkt', avatar: 'FM' },
        title: 'Marketing Digital: Estratégias de 2024',
        description: 'As tendências mais relevantes para impulsionar sua marca nas redes sociais...',
        icon: '📱',
        badge: '📈 Growth',
        likes: 645,
        comments: 87,
        views: '6.3k'
    }
];

const popularUsers = [
    {
        id: 1,
        name: 'Sofia Inovação',
        username: 'sofiainovacao',
        avatar: 'SI',
        bio: 'Especialista em transformação digital e inovação corporativa',
        followers: '45.2k',
        posts: 328
    },
    {
        id: 2,
        name: 'Ricardo Mentor',
        username: 'ricardomentor',
        avatar: 'RM',
        bio: 'Mentor de carreira e desenvolvimento profissional',
        followers: '38.7k',
        posts: 412
    },
    {
        id: 3,
        name: 'Juliana Código',
        username: 'julianacodigo',
        avatar: 'JC',
        bio: 'Desenvolvedora full-stack e criadora de conteúdo tech',
        followers: '52.1k',
        posts: 567
    },
    {
        id: 4,
        name: 'Bruno Negócios',
        username: 'brunonegocios',
        avatar: 'BN',
        bio: 'Consultor de estratégia e gestão empresarial',
        followers: '41.5k',
        posts: 289
    }
];

const recommendedPosts = [
    {
        id: 1,
        author: { name: 'Gabriel Tech', username: 'gabrieltech', avatar: 'GT' },
        content: 'Acabei de publicar um artigo sobre as melhores práticas de Clean Code. Essencial para todo desenvolvedor que quer escrever código mais legível e manutenível! 💻✨',
        time: '2h atrás',
        likes: 234,
        comments: 45,
        shares: 23
    },
    {
        id: 2,
        author: { name: 'Larissa Criativa', username: 'larissacriativa', avatar: 'LC' },
        content: 'Meu processo criativo para desenvolver identidades visuais marcantes. Cada projeto é uma nova jornada de descoberta! 🎨🚀 #DesignGraphic',
        time: '4h atrás',
        likes: 456,
        comments: 67,
        shares: 89
    },
    {
        id: 3,
        author: { name: 'Roberto Liderança', username: 'robertolideranca', avatar: 'RL' },
        content: 'Liderança não é sobre ter todas as respostas, mas sobre fazer as perguntas certas e empoderar sua equipe para encontrá-las. 💡👥',
        time: '6h atrás',
        likes: 678,
        comments: 92,
        shares: 145
    },
    {
        id: 4,
        author: { name: 'Camila Dados', username: 'camiladados', avatar: 'CD' },
        content: 'Análise de dados é como contar histórias com números. Cada gráfico revela insights valiosos para tomada de decisão! 📊📈',
        time: '8h atrás',
        likes: 389,
        comments: 54,
        shares: 67
    },
    {
        id: 5,
        author: { name: 'Thiago Startup', username: 'thiagostartup', avatar: 'TS' },
        content: 'Construir uma startup é 10% ideia e 90% execução. Compartilhando minha jornada de 0 a 100 clientes em 6 meses! 🚀💪',
        time: '12h atrás',
        likes: 892,
        comments: 134,
        shares: 201
    },
    {
        id: 6,
        author: { name: 'Paula Wellness', username: 'paulawellness', avatar: 'PW' },
        content: 'Saúde mental no trabalho não é luxo, é necessidade. Pequenas pausas durante o dia fazem toda a diferença! 🧘‍♀️💚',
        time: '1d atrás',
        likes: 1245,
        comments: 198,
        shares: 312
    }
];

// ====== RENDER FUNCTIONS ======

function renderCategories() {
    const container = document.getElementById('categoriesGrid');
    
    container.innerHTML = categories.map(category => `
        <div class="category-card" onclick="filterByCategory('${category.name}')">
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.count}</div>
        </div>
    `).join('');
}

function renderTrendingPosts() {
    const container = document.getElementById('trendingGrid');
    
    container.innerHTML = trendingPosts.map(post => `
        <div class="trending-card" onclick="openPostDetails(${post.id}, 'trending')">
            <div class="trending-image">
                ${post.icon}
                <span class="trending-badge">${post.badge}</span>
            </div>
            <div class="trending-content">
                <div class="trending-author">
                    <div class="trending-author-avatar">${post.author.avatar}</div>
                    <div class="trending-author-name">${post.author.name}</div>
                </div>
                <div class="trending-title">${post.title}</div>
                <div class="trending-description">${post.description}</div>
                <div class="trending-stats">
                    <span class="trending-stat">❤️ ${post.likes}</span>
                    <span class="trending-stat">💬 ${post.comments}</span>
                    <span class="trending-stat">👁️ ${post.views}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPopularUsers() {
    const container = document.getElementById('popularGrid');
    
    container.innerHTML = popularUsers.map(user => `
        <div class="popular-card">
            <div class="popular-avatar">${user.avatar}</div>
            <div class="popular-name">${user.name}</div>
            <div class="popular-username">@${user.username}</div>
            <div class="popular-bio">${user.bio}</div>
            <div class="popular-stats">
                <div class="popular-stat">
                    <span class="popular-stat-value">${user.followers}</span>
                    <span class="popular-stat-label">Seguidores</span>
                </div>
                <div class="popular-stat">
                    <span class="popular-stat-value">${user.posts}</span>
                    <span class="popular-stat-label">Posts</span>
                </div>
            </div>
            <button class="btn-follow-popular" onclick="followUser('${user.username}')">
                Seguir
            </button>
        </div>
    `).join('');
}

function renderRecommendedPosts() {
    const container = document.getElementById('recommendedGrid');
    
    container.innerHTML = recommendedPosts.map(post => `
        <div class="recommended-card" onclick="openPostDetails(${post.id}, 'recommended')">
            <div class="recommended-header">
                <div class="recommended-avatar">${post.author.avatar}</div>
                <div class="recommended-author">
                    <div class="recommended-author-name">${post.author.name}</div>
                    <div class="recommended-author-username">@${post.author.username}</div>
                </div>
                <div class="recommended-time">${post.time}</div>
            </div>
            <div class="recommended-content">${post.content}</div>
            <div class="recommended-actions">
                <span class="recommended-action">❤️ ${post.likes}</span>
                <span class="recommended-action">💬 ${post.comments}</span>
                <span class="recommended-action">🔄 ${post.shares}</span>
            </div>
        </div>
    `).join('');
}

// ====== INTERACTION FUNCTIONS ======

function filterByCategory(categoryName) {
    showNotification(`Filtrando posts por: ${categoryName}`);
    console.log('Filtering by category:', categoryName);
    // Implementar lógica de filtro aqui
}

function followUser(username) {
    showNotification(`Você começou a seguir @${username}! 🎉`);
    console.log('Following user:', username);
}

function openPostDetails(postId, type) {
    const modal = document.getElementById('contentModal');
    const modalBody = document.getElementById('modalBodyContent');
    
    let post;
    if (type === 'trending') {
        post = trendingPosts.find(p => p.id === postId);
    } else {
        post = recommendedPosts.find(p => p.id === postId);
    }
    
    if (!post) return;
    
    if (type === 'trending') {
        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 80px; margin-bottom: 16px;">${post.icon}</div>
                <h2 style="font-size: 28px; font-weight: 700; color: #333; margin-bottom: 16px;">${post.title}</h2>
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 20px;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, rgb(165, 42, 42), rgb(205, 82, 82)); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; color: white;">
                        ${post.author.avatar}
                    </div>
                    <div style="text-align: left;">
                        <div style="font-weight: 700; color: #333;">${post.author.name}</div>
                        <div style="font-size: 14px; color: #666;">@${post.author.username}</div>
                    </div>
                </div>
            </div>
            <p style="font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 24px;">
                ${post.description}
            </p>
            <div style="display: flex; justify-content: center; gap: 32px; padding: 20px; background: #f8f8f8; border-radius: 12px;">
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: 700; color: rgb(165, 42, 42);">${post.likes}</div>
                    <div style="font-size: 13px; color: #666;">Curtidas</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: 700; color: rgb(165, 42, 42);">${post.comments}</div>
                    <div style="font-size: 13px; color: #666;">Comentários</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: 700; color: rgb(165, 42, 42);">${post.views}</div>
                    <div style="font-size: 13px; color: #666;">Visualizações</div>
                </div>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, rgb(165, 42, 42), rgb(205, 82, 82)); display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: bold; color: white;">
                    ${post.author.avatar}
                </div>
                <div>
                    <div style="font-size: 18px; font-weight: 700; color: #333;">${post.author.name}</div>
                    <div style="font-size: 14px; color: #666;">@${post.author.username} • ${post.time}</div>
                </div>
            </div>
            <p style="font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 24px;">
                ${post.content}
            </p>
            <div style="display: flex; justify-content: space-around; padding: 20px; background: #f8f8f8; border-radius: 12px;">
                <div style="text-align: center; cursor: pointer;">
                    <div style="font-size: 28px;">❤️</div>
                    <div style="font-size: 14px; color: #666; margin-top: 4px;">${post.likes}</div>
                </div>
                <div style="text-align: center; cursor: pointer;">
                    <div style="font-size: 28px;">💬</div>
                    <div style="font-size: 14px; color: #666; margin-top: 4px;">${post.comments}</div>
                </div>
                <div style="text-align: center; cursor: pointer;">
                    <div style="font-size: 28px;">🔄</div>
                    <div style="font-size: 14px; color: #666; margin-top: 4px;">${post.shares}</div>
                </div>
            </div>
        `;
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeContentModal() {
    const modal = document.getElementById('contentModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// ====== SEARCH FUNCTION ======
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 2) {
            console.log('Searching for:', query);
            showNotification(`Buscando por: "${query}"`);
            // Implementar lógica de busca aqui
        }
    });
}

// ====== NOTIFICATION ======
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(165, 42, 42, 0.3);
        z-index: 1001;
        font-weight: 600;
        color: rgb(165, 42, 42);
        animation: slideInRight 0.4s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// ====== VERIFICAÇÃO DE LOGIN ======
function checkLogin() {
    const currentUser = localStorage.getItem('loggedUser');
    if (!currentUser) {
        alert('Você precisa fazer login primeiro!');
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(currentUser);
}

// ====== APLICAR TEMA ======
function applyTheme() {
    const currentUser = checkLogin();
    if (currentUser && currentUser.settings && currentUser.settings.temaEscuro) {
        document.body.classList.add('dark-theme');
    }
}

// ====== HIGHLIGHT ACTIVE PAGE ======
function highlightActivePage() {
    const links = document.querySelectorAll('header a');
    const currentPage = window.location.pathname.split('/').pop();
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    applyTheme();
    highlightActivePage();
    
    renderCategories();
    renderTrendingPosts();
    renderPopularUsers();
    renderRecommendedPosts();
    setupSearch();
    
    // Close modal when clicking outside
    document.getElementById('contentModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeContentModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('contentModal');
            if (!modal.classList.contains('hidden')) {
                closeContentModal();
            }
        }
    });
});

// ====== ADD ANIMATIONS CSS ======
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);