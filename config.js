// ====== SISTEMA DE BANCO DE DADOS ======
const USERS_KEY = 'plotup_users';
const CURRENT_USER_KEY = 'loggedUser'; // <-- CHAVE CORRIGIDA

// Funções de Banco de Dados
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

function getCurrentUser() {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

function updateUserInDatabase(updatedUser) {
    const users = getUsers();
    const index = users.findIndex(u => u.username === updatedUser.username);
    
    if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser)); // mantém logado
        return true;
    }
    return false;
}

function deleteUserFromDatabase(username) {
    const users = getUsers();
    const filteredUsers = users.filter(u => u.username !== username);
    localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
    localStorage.removeItem(CURRENT_USER_KEY);
}

function isUsernameTaken(username, currentUsername) {
    const users = getUsers();
    return users.some(user => 
        user.username.toLowerCase() === username.toLowerCase() && 
        user.username !== currentUsername
    );
}

// Funções auxiliares
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function formatPhone(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    return value;
}

function generateUserId() {
    const users = getUsers();
    const id = String(users.length + 1).padStart(9, '0');
    return id.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
}

// ====== CARREGAMENTO INICIAL ======
let currentUser = null;

window.addEventListener('DOMContentLoaded', () => {
    currentUser = getCurrentUser();

    if (!currentUser) {
        alert('Você precisa fazer login primeiro!');
        window.location.href = 'index.html';
        return;
    }

    // Adicionar ID se não existir
    if (!currentUser.id) {
        currentUser.id = generateUserId();
        updateUserInDatabase(currentUser);
    }

    // Adicionar configurações padrão se não existirem
    if (!currentUser.settings) {
        currentUser.settings = {
            contaPrivada: false,
            idioma: 'Português',
            temaEscuro: false,
            seguidores: 0,
            seguindo: 0
        };
        updateUserInDatabase(currentUser);
    }

    carregarDadosUsuario();
    configurarEventListeners();
});

// ====== CARREGAR DADOS DO USUÁRIO ======
function carregarDadosUsuario() {
    // Foto de perfil
    const fotoPerfilCirculo = document.getElementById('fotoPerfilCirculo');
    fotoPerfilCirculo.textContent = getInitials(currentUser.fullName);

    // Header do card
    document.getElementById('nomeCompletoHeader').textContent = currentUser.fullName;
    document.getElementById('nomeUsuarioHeader').textContent = '@' + currentUser.username;
    document.getElementById('idUsuario').textContent = 'ID: ' + currentUser.id;

    // Stats
    document.getElementById('seguidores').textContent = currentUser.settings.seguidores || 0;
    document.getElementById('seguindo').textContent = currentUser.settings.seguindo || 0;

    // Informações pessoais
    document.getElementById('nome_completo').textContent = currentUser.fullName;
    document.getElementById('nome_usuario').textContent = '@' + currentUser.username;
    document.getElementById('nascimento').textContent = formatDate(currentUser.birthDate);
    document.getElementById('email').textContent = currentUser.email;
    document.getElementById('telefone').textContent = currentUser.telefone || 'Não informado';

    // Configurações da conta
    document.getElementById('contaPrivada').checked = currentUser.settings.contaPrivada || false;
    document.getElementById('idioma').textContent = currentUser.settings.idioma || 'Português';
    document.getElementById('temaEscuro').checked = currentUser.settings.temaEscuro || false;
    document.getElementById('temaTexto').textContent = currentUser.settings.temaEscuro ? 'Escuro' : 'Claro';

    // Preencher inputs do popup
    document.getElementById('input_nome_completo').value = currentUser.fullName;
    document.getElementById('input_nome_usuario').value = currentUser.username;
    document.getElementById('input_nascimento').value = currentUser.birthDate;
    document.getElementById('input_email').value = currentUser.email;
    document.getElementById('input_telefone').value = currentUser.telefone || '';
    document.getElementById('selectIdioma').value = currentUser.settings.idioma || 'Português';

    // Aplicar tema
    if (currentUser.settings.temaEscuro) {
        document.body.classList.add('dark-theme');
    }
}

// ====== EVENT LISTENERS ======
function configurarEventListeners() {
    // Validação de username em tempo real
    const inputUsername = document.getElementById('input_nome_usuario');
    const usernameValidation = document.getElementById('usernameValidation');
    
    inputUsername.addEventListener('input', (e) => {
        const value = e.target.value;
        
        if (value.length >= 3 && value !== currentUser.username) {
            if (isUsernameTaken(value, currentUser.username)) {
                usernameValidation.textContent = 'Este nome de usuário já está em uso';
                usernameValidation.className = 'validation-msg error';
                inputUsername.style.borderColor = '#ef4444';
            } else {
                usernameValidation.textContent = 'Nome de usuário disponível!';
                usernameValidation.className = 'validation-msg success';
                inputUsername.style.borderColor = '#22c55e';
            }
        } else if (value === currentUser.username) {
            usernameValidation.textContent = '';
            inputUsername.style.borderColor = '#ddd';
        } else {
            usernameValidation.textContent = '';
            inputUsername.style.borderColor = '#ddd';
        }
    });

    // Formatação de telefone
    const inputTelefone = document.getElementById('input_telefone');
    inputTelefone.addEventListener('input', (e) => {
        e.target.value = formatPhone(e.target.value);
    });

    // Salvar informações pessoais
    document.getElementById('salvarInfoPessoais').addEventListener('click', salvarInformacoesPessoais);

    // Salvar configurações da conta
    document.getElementById('salvarInfoConta').addEventListener('click', salvarConfiguracoesConta);

    // Toggle conta privada
    document.getElementById('contaPrivada').addEventListener('change', (e) => {
        currentUser.settings.contaPrivada = e.target.checked;
        updateUserInDatabase(currentUser);
        alert(e.target.checked ? 'Conta definida como privada' : 'Conta definida como pública');
    });

    // Toggle tema
    document.getElementById('temaEscuro').addEventListener('change', (e) => {
        currentUser.settings.temaEscuro = e.target.checked;
        document.getElementById('temaTexto').textContent = e.target.checked ? 'Escuro' : 'Claro';
        
        if (e.target.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        updateUserInDatabase(currentUser);
    });

    // Excluir conta
    document.getElementById('excluirConta').addEventListener('click', excluirConta);

    // Alterar foto (simulação)
    document.getElementById('changePhotoBtn').addEventListener('click', () => {
        alert('Funcionalidade de upload de foto será implementada em breve!');
    });
}

// ====== SALVAR INFORMAÇÕES PESSOAIS ======
function salvarInformacoesPessoais() {
    const nomeCompleto = document.getElementById('input_nome_completo').value.trim();
    const nomeUsuario = document.getElementById('input_nome_usuario').value.trim();
    const nascimento = document.getElementById('input_nascimento').value;
    const email = document.getElementById('input_email').value.trim();
    const telefone = document.getElementById('input_telefone').value.trim();

    // Validações
    if (!nomeCompleto || !nomeUsuario || !nascimento || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (nomeUsuario !== currentUser.username && isUsernameTaken(nomeUsuario, currentUser.username)) {
        alert('Este nome de usuário já está em uso. Escolha outro.');
        return;
    }

    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Atualizar dados
    currentUser.fullName = nomeCompleto;
    currentUser.username = nomeUsuario;
    currentUser.birthDate = nascimento;
    currentUser.email = email;
    currentUser.telefone = telefone;

    // Salvar no banco de dados
    if (updateUserInDatabase(currentUser)) {
        alert('Informações pessoais atualizadas com sucesso!');
        carregarDadosUsuario();
        document.getElementById('popup_info_pessoais').hidePopover();
    } else {
        alert('Erro ao salvar informações. Tente novamente.');
    }
}

// ====== SALVAR CONFIGURAÇÕES DA CONTA ======
function salvarConfiguracoesConta() {
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const idioma = document.getElementById('selectIdioma').value;

    // Atualizar idioma
    currentUser.settings.idioma = idioma;
    document.getElementById('idioma').textContent = idioma;

    // Se estiver alterando senha
    if (senhaAtual || novaSenha || confirmarSenha) {
        if (!senhaAtual) {
            alert('Digite sua senha atual para alterá-la.');
            return;
        }

        if (senhaAtual !== currentUser.password) {
            alert('Senha atual incorreta!');
            return;
        }

        if (novaSenha.length < 6) {
            alert('A nova senha deve ter no mínimo 6 caracteres.');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        currentUser.password = novaSenha;
    }

    // Salvar no banco de dados
    if (updateUserInDatabase(currentUser)) {
        alert('Configurações atualizadas com sucesso!');
        document.getElementById('senhaAtual').value = '';
        document.getElementById('novaSenha').value = '';
        document.getElementById('confirmarSenha').value = '';
        document.getElementById('popup_info_conta').hidePopover();
    } else {
        alert('Erro ao salvar configurações. Tente novamente.');
    }
}

// ====== EXCLUIR CONTA ======
function excluirConta() {
    const confirmacao = confirm(
        'ATENÇÃO: Esta ação é irreversível!\n\n' +
        'Tem certeza que deseja excluir sua conta permanentemente?\n' +
        'Todos os seus dados serão perdidos.'
    );

    if (!confirmacao) return;

    const confirmarNome = prompt('Digite seu nome de usuário para confirmar: @' + currentUser.username);

    if (confirmarNome === currentUser.username) {
        deleteUserFromDatabase(currentUser.username);
        alert('Conta excluída com sucesso. Você será redirecionado para a página de login.');
        window.location.href = 'index.html';
    } else {
        alert('Nome de usuário incorreto. Exclusão cancelada.');
    }
}
