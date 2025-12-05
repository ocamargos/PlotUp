// ====== SISTEMA DE BANCO DE DADOS ======
const USERS_KEY = "plotup_users";
const CURRENT_USER_KEY = "loggedUser";

// ===============================
// FUNÇÕES DE BANCO DE DADOS
// ===============================
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// ===============================
// 1️⃣ CARREGAR DADOS DO USUÁRIO LOGADO
// ===============================
function carregarDadosUsuario() {
    const user = getCurrentUser();

    if (!user) {
        alert("Nenhum usuário logado!");
        window.location.href = "login.html";
        return;
    }

    // CARD DO TOPO
    document.getElementById("nomeCompletoHeader").innerText = user.nomeCompleto;
    document.getElementById("nomeUsuarioHeader").innerText = `@${user.username}`;
    document.getElementById("idUsuario").innerText = `ID: ${user.id}`;

    // FOTO (inicial)
    const foto = document.getElementById("fotoPerfilCirculo");
    foto.innerText = user.nomeCompleto.charAt(0).toUpperCase();

    // ESTATÍSTICAS (se quiser implementar depois)
    document.getElementById("seguidores").innerText = user.seguidores || 0;
    document.getElementById("seguindo").innerText = user.seguindo || 0;

    // CARD "Informações Pessoais"
    document.getElementById("nome_completo").innerText = user.nomeCompleto;
    document.getElementById("nome_usuario").innerText = `@${user.username}`;
    document.getElementById("nascimento").innerText = user.nascimento || "00/00/0000";
    document.getElementById("email").innerText = user.email;
    document.getElementById("telefone").innerText = user.telefone || "(00) 00000-0000";

    // TOGGLE TEMA E PRIVACIDADE
    document.getElementById("contaPrivada").checked = user.contaPrivada || false;
    document.getElementById("temaEscuro").checked = user.tema === "escuro";

    if (user.tema === "escuro") document.body.classList.add("dark-theme");
}

// ===============================
// 2️⃣ SALVAR ALTERAÇÕES DO PERFIL
// ===============================
document.getElementById("salvarInfoPessoais").addEventListener("click", () => {
    const user = getCurrentUser();
    const users = getUsers();

    // Inputs
    const nomeCompleto = document.getElementById("input_nome_completo").value.trim();
    const username = document.getElementById("input_nome_usuario").value.trim();
    const nascimento = document.getElementById("input_nascimento").value;
    const email = document.getElementById("input_email").value.trim();
    const telefone = document.getElementById("input_telefone").value.trim();

    // Validação nome de usuário único
    if (username && users.some(u => u.username === username && u.id !== user.id)) {
        alert("Esse nome de usuário já está em uso!");
        return;
    }

    // Aplicar alterações
    if (nomeCompleto) user.nomeCompleto = nomeCompleto;
    if (username) user.username = username;
    if (nascimento) user.nascimento = nascimento;
    if (email) user.email = email;
    if (telefone) user.telefone = telefone;

    // Atualizar banco
    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;
    saveUsers(users);

    // Atualizar sessão
    setCurrentUser(user);

    alert("Informações atualizadas!");
    carregarDadosUsuario();
});

// ===============================
// 3️⃣ ALTERAR TEMA E PRIVACIDADE
// ===============================
document.getElementById("contaPrivada").addEventListener("change", (e) => {
    const user = getCurrentUser();
    const users = getUsers();

    user.contaPrivada = e.target.checked;

    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;
    saveUsers(users);
    setCurrentUser(user);
});

document.getElementById("temaEscuro").addEventListener("change", (e) => {
    const user = getCurrentUser();
    const users = getUsers();

    if (e.target.checked) {
        document.body.classList.add("dark-theme");
        user.tema = "escuro";
    } else {
        document.body.classList.remove("dark-theme");
        user.tema = "claro";
    }

    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;
    saveUsers(users);
    setCurrentUser(user);
});

// ===============================
// 4️⃣ EXCLUIR CONTA
// ===============================
document.getElementById("excluirConta").addEventListener("click", () => {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

    const user = getCurrentUser();
    const users = getUsers();

    const updated = users.filter(u => u.id !== user.id);

    saveUsers(updated);
    localStorage.removeItem(CURRENT_USER_KEY);

    alert("Conta excluída com sucesso!");
    window.location.href = "login.html";
});

// Inicialização
carregarDadosUsuario();
