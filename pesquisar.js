
// ==================== Supabase Config ====================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://oxlhawuluhnwzixygwmy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94bGhhd3VsdWhud3ppeHlnd215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MDMzMDcsImV4cCI6MjA4MDM3OTMwN30.wSUfof-IqLXWyIUhq45hXnxGCxrg-szNjlVohIqXXtM';
const supabase = createClient(supabaseUrl, supabaseKey);

// ==================== Render Results ====================
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
                <div class="result-avatar">${result.avatar || result.full_name[0]}</div>
                <div class="result-user-info">
                    <div class="result-name">${result.full_name}</div>
                    <div class="result-username">@${result.username}</div>
                </div>
            </div>
            <div class="result-content">${result.content || ''}</div>
            <div class="result-meta">
                ${result.date ? `<span>🕐 ${result.date}</span>` : ''}
                ${result.category ? `<span>📁 ${result.category}</span>` : ''}
                ${result.stats ? `<span>${result.stats}</span>` : ''}
            </div>
            ${result.badge ? `<div style="margin-top: 12px;"><span class="result-badge">${result.badge}</span></div>` : ''}
        </div>
    `).join('');

    document.getElementById('resultsCount').textContent = 
        `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
}

// ==================== Search Function ====================
async function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    let results = [];

    // ====== Buscar Usuários ======
    if (!typeFilter || typeFilter === 'usuario') {
        const { data: usersData, error: usersError } = await supabase
            .from('users')
            .select('*')
            .ilike('username', `%${searchTerm}%`)
            .or(`full_name.ilike.%${searchTerm}%`);

        if (usersError) console.error('Erro ao buscar usuários:', usersError);
        else {
            results.push(...usersData.map(u => ({
                type: 'usuario',
                full_name: u.full_name,
                username: u.username,
                avatar: u.full_name[0],
                content: '',
                badge: '',
                stats: '', 
            })));
        }
    }

    // ====== Buscar Posts ======
    if (!typeFilter || typeFilter === 'post') {
        let query = supabase
            .from('posts')
            .select('*, users(full_name, username)')
            .ilike('content', `%${searchTerm}%`);

        if (categoryFilter) {
            query = query.eq('category', categoryFilter);
        }

        const { data: postsData, error: postsError } = await query;

        if (postsError) console.error('Erro ao buscar posts:', postsError);
        else {
            results.push(...postsData.map(p => ({
                type: 'post',
                full_name: p.users.full_name,
                username: p.users.username,
                avatar: p.users.full_name[0],
                content: p.content,
                category: p.category,
                date: new Date(p.created_at).toLocaleDateString(),
                badge: p.badge,
                stats: `${p.likes || 0} curtidas`,
            })));
        }
    }

    renderResults(results);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    document.getElementById('typeFilter').addEventListener('change', performSearch);
    document.getElementById('categoryFilter').addEventListener('change', performSearch);

    // Inicial render (todos)
    performSearch();
});
