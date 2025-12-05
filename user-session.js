// ====== SISTEMA DE SESSÃO GLOBAL ======
const CURRENT_USER_KEY = "loggedUser";

// Função para obter usuário logado
function getCurrentUser() {
    try {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

// Função para obter iniciais do nome
function getInitials(fullName) {
    if (!fullName) return "??";
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

// Função para atualizar elementos do usuário na página
function updateUserElements() {
    const user = getCurrentUser();
    
    if (!user) {
        console.warn("⚠️ Nenhum usuário logado!");
        // Redirecionar para login se não estiver na página de login
        if (!window.location.pathname.includes('login.html') && 
            !window.location.pathname.includes('index.html')) {
            window.location.href = "login.html";
        }
        return;
    }

    console.log("✅ Usuário logado:", user.username);

    const initials = getInitials(user.nomeCompleto);

    // Atualizar nomes completos
    document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = user.nomeCompleto;
    });

    // Atualizar usernames
    document.querySelectorAll('[data-user-username]').forEach(el => {
        el.textContent = '@' + user.username;
    });

    // Atualizar avatares com iniciais
    document.querySelectorAll('[data-user-avatar]').forEach(el => {
        el.textContent = initials;
    });

    // Atualizar placeholders personalizados
    document.querySelectorAll('[data-user-placeholder]').forEach(el => {
        const template = el.getAttribute('data-user-placeholder');
        el.placeholder = template.replace('{name}', user.nomeCompleto.split(' ')[0]);
    });

    // Atualizar estatísticas se existirem
    const seguidoresEl = document.querySelector('[data-user-seguidores]');
    if (seguidoresEl) seguidoresEl.textContent = user.seguidores || 0;

    const seguindoEl = document.querySelector('[data-user-seguindo]');
    if (seguindoEl) seguindoEl.textContent = user.seguindo || 0;

    console.log("✅ Elementos do usuário atualizados na página");
}

// Função para fazer logout
function logout() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem(CURRENT_USER_KEY);
        window.location.href = "login.html";
    }
}

// Executar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUserElements);
} else {
    updateUserElements();
}

// Exportar funções globalmente
window.getCurrentUser = getCurrentUser;
window.getInitials = getInitials;
window.updateUserElements = updateUserElements;
window.logout = logout;