// ====== OBTER USUÁRIO LOGADO ======
const currentUser = getCurrentUser();

if (!currentUser) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "login.html";
}

// ====== SAMPLE POSTS DATA ======
const samplePosts = [
    {
        id: 1,
        author: {
            name: 'Marina Costa',
            username: 'marinacosta',
            avatar: 'MC'
        },
        content: 'Acabei de lançar meu novo projeto! 🚀 Depois de 3 meses de trabalho intenso, finalmente está no ar. Muito feliz com o resultado e animada para receber feedbacks da comunidade! #DesignThinking #UXDesign',
        image: null,
        time: '2h atrás',
        likes: 245,
        comments: 32,
        shares: 18,
        liked: false
    },
    {
        id: 2,
        author: {
            name: 'Carlos Mendes',
            username: 'carlosm',
            avatar: 'CM'
        },
        content: 'Dica do dia: A melhor forma de aprender é ensinando. Quando você explica um conceito para alguém, você consolida seu próprio conhecimento. 💡\n\nCompartilhe o que você sabe, ajude os outros a crescerem! 🌱',
        image: null,
        time: '5h atrás',
        likes: 189,
        comments: 28,
        shares: 45,
        liked: false
    },
    {
        id: 3,
        author: {
            name: 'Ana Silva',
            username: 'anasilva',
            avatar: 'AS'
        },
        content: 'Reflexão sobre trabalho remoto: Não é sobre trabalhar de casa, é sobre ter flexibilidade para trabalhar de onde você for mais produtivo. Para mim, isso mudou tudo! 🏡💻 #RemoteWork #ProductivityTips',
        image: null,
        time: '8h atrás',
        likes: 432,
        comments: 67,
        shares: 89,
        liked: true
    },
    {
        id: 4,
        author: {
            name: 'Pedro Santos',
            username: 'pedrosantos',
            avatar: 'PS'
        },
        content: 'Acabei de finalizar um curso incrível sobre IA e Machine Learning! 🤖✨ O futuro já chegou e as possibilidades são infinitas. Quem mais está estudando sobre o tema? #IA2024 #MachineLearning',
        image: null,
        time: '1d atrás',
        likes: 567,
        comments: 91,
        shares: 123,
        liked: false
    },
    {
        id: 5,
        author: {
            name: 'Julia Oliveira',
            username: 'juliaoliveira',
            avatar: 'JO'
        },
        content: 'Design não é só sobre fazer as coisas bonitas. É sobre resolver problemas, criar experiências e facilitar a vida das pessoas. Quando você entende isso, tudo muda. 🎨✨ #DesignThinking',
        image: null,
        time: '1d atrás',
        likes: 678,
        comments: 84,
        shares: 156,
        liked: true
    },
    {
        id: 6,
        author: {
            name: 'Rafael Lima',
            username: 'rafaellima',
            avatar: 'RL'
        },
        content: 'Minha jornada como desenvolvedor: Comecei há 5 anos sem saber nada de programação. Hoje trabalho com tecnologias que nem existiam quando comecei. A chave? Nunca parar de aprender! 💪 #StartupLife #DevLife',
        image: null,
        time: '2d atrás',
        likes: 891,
        comments: 142,
        shares: 203,
        liked: false
    }
];

let posts = [...samplePosts];

// ====== RENDER POSTS ======
function renderPosts() {
    const container = document.getElementById('postsContainer');
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="post-card">
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
                    <h3 style="font-size: 20px; color: #333; margin-bottom: 8px;">Nenhum post ainda</h3>
                    <p style="font-size: 15px; color: #666;">Seja o primeiro a compartilhar algo!</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-user">
                    <div class="post-avatar">${post.author.avatar}</div>
                    <div class="post-user-info">
                        <div class="post-name">${post.author.name}</div>
                        <div class="post-username">@${post.author.username}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                </div>
                <button class="post-menu-btn">⋯</button>
            </div>
            
            <div class="post-content">${post.content}</div>
            
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            
            <div class="post-actions">
                <button class="action-btn ${post.liked ? 'active' : ''}" onclick="toggleLike(${post.id})">
                    ${post.liked ? '❤️' : '🤍'} ${post.likes}
                </button>
                <button class="action-btn" onclick="openComments(${post.id})">
                    💬 ${post.comments}
                </button>
                <button class="action-btn" onclick="sharePost(${post.id})">
                    🔄 ${post.shares}
                </button>
                <button class="action-btn">
                    📤 Compartilhar
                </button>
            </div>
        </div>
    `).join('');
}

// ====== LIKE POST ======
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderPosts();
    }
}

// ====== OPEN COMMENTS ======
function openComments(postId) {
    console.log('Opening comments for post:', postId);
    alert('Funcionalidade de comentários em desenvolvimento!');
}

// ====== SHARE POST ======
function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares += 1;
        renderPosts();
        showNotification('Post compartilhado com sucesso!');
    }
}

// ====== CREATE POST MODAL ======
function openCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    document.getElementById('postContent').value = '';
    updateCharCount();
}

// ====== CREATE POST ======
function createPost() {
    const content = document.getElementById('postContent').value.trim();
    
    if (!content) {
        alert('Por favor, escreva algo antes de publicar!');
        return;
    }

    if (content.length > 500) {
        alert('O post deve ter no máximo 500 caracteres!');
        return;
    }

    // Usar dados do usuário logado
    const newPost = {
        id: Date.now(),
        author: {
            name: currentUser.nomeCompleto,
            username: currentUser.username,
            avatar: getInitials(currentUser.nomeCompleto)
        },
        content: content,
        image: null,
        time: 'Agora',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false
    };

    posts.unshift(newPost);
    renderPosts();
    closeCreatePostModal();
    
    showNotification('Post publicado com sucesso! 🎉');
}

// ====== CHAR COUNT ======
function updateCharCount() {
    const textarea = document.getElementById('postContent');
    const charCount = document.getElementById('charCount');
    const count = textarea.value.length;
    
    charCount.textContent = count;
    charCount.style.color = count > 500 ? '#ef4444' : count > 450 ? '#f59e0b' : '#666';
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

// ====== FOLLOW BUTTON ======
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-follow')) {
        const btn = e.target;
        if (btn.textContent === 'Seguir') {
            btn.textContent = 'Seguindo';
            btn.style.background = '#f0f0f0';
            btn.style.color = '#666';
        } else {
            btn.textContent = 'Seguir';
            btn.style.background = 'rgb(165, 42, 42)';
            btn.style.color = 'white';
        }
    }
});

// ====== EVENT LISTENERS ======
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    
    const textarea = document.getElementById('postContent');
    if (textarea) {
        textarea.addEventListener('input', updateCharCount);
    }
    
    document.getElementById('createPostModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeCreatePostModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('createPostModal');
            if (!modal.classList.contains('hidden')) {
                closeCreatePostModal();
            }
        }
    });
    
    textarea?.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            createPost();
        }
    });
});

// ====== ADICIONAR ANIMAÇÕES CSS DINAMICAMENTE ======
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

console.log("✅ Home carregado para:", currentUser.nomeCompleto);