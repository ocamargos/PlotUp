
// -----------------------------
// ESTADO DA APLICAÇÃO
// -----------------------------
let isLogin = true;
let usernameStatus = null;

// Carrega usuários do banco (normalizados)
let users = JSON.parse(localStorage.getItem("users")) || [];

// -----------------------------
// ELEMENTOS DO DOM
// -----------------------------
const mainScreen = document.getElementById('mainScreen');
const recoveryScreen = document.getElementById('recoveryScreen');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Login
const loginIdentifier = document.getElementById('loginIdentifier');
const loginPassword = document.getElementById('loginPassword');
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginBtn = document.getElementById('loginBtn');
const forgotLink = document.getElementById('forgotLink');

// Cadastro
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthDate');
const username = document.getElementById('username');
const password = document.getElementById('password');
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const usernameMsg = document.getElementById('usernameMsg');
const signupBtn = document.getElementById('signupBtn');

// Recuperação
const recoveryEmail = document.getElementById('recoveryEmail');
const recoveryBtn = document.getElementById('recoveryBtn');
const backBtn = document.getElementById('backBtn');


// -----------------------------
// HELPERS
// -----------------------------
function normalize(text) {
    return String(text || "").trim().toLowerCase();
}

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function usernameExists(rawUsername) {
    const u = normalize(rawUsername);
    return users.some(user => normalize(user.username) === u);
}

function emailExists(rawEmail) {
    const e = normalize(rawEmail);
    return users.some(user => normalize(user.email) === e);
}


// -----------------------------
// NAVEGAÇÃO ENTRE ABAS
// -----------------------------
loginTab.addEventListener('click', () => {
    isLogin = true;
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    isLogin = false;
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainScreen.classList.add('hidden');
    recoveryScreen.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
    recoveryScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    recoveryEmail.value = '';
});


// -----------------------------
// VISIBILIDADE DAS SENHAS
// -----------------------------
toggleLoginPassword.addEventListener('click', () => {
    const type = loginPassword.type === 'password' ? 'text' : 'password';
    loginPassword.type = type;
});

toggleSignupPassword.addEventListener('click', () => {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
});


// -----------------------------
// VALIDAÇÃO DE USERNAME (TEMPO REAL)
// FORÇA minúsculas e impede uppercase SEM FALHA
// -----------------------------
username.addEventListener("input", (e) => {

    // força lowercase SEMPRE
    const forced = e.target.value.toLowerCase();

    if (e.target.value !== forced) {
        e.target.value = forced;
    }

    const value = forced.trim();

    if (value.length >= 3) {
        if (usernameExists(value)) {
            usernameStatus = "taken";
            username.classList.add("error");
            username.classList.remove("success");
            usernameMsg.textContent = "Este nome de usuário já está em uso";
            usernameMsg.className = "validation-msg error";
        } else {
            usernameStatus = "available";
            username.classList.remove("error");
            username.classList.add("success");
            usernameMsg.textContent = "Nome de usuário disponível!";
            usernameMsg.className = "validation-msg success";
        }
    } else {
        usernameStatus = null;
        username.classList.remove("error", "success");
        usernameMsg.textContent = "";
    }
});

// evita uppercase em colagem
username.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const normalized = pasted.toLowerCase();
    username.value = normalized;
    username.dispatchEvent(new Event('input'));
});


// -----------------------------
// CADASTRO (CORRIGIDO 100%)
// -----------------------------
signupBtn.addEventListener("click", () => {

    const cleanEmail = normalize(email.value);
    const cleanUsername = normalize(username.value);
    const cleanBirth = (birthDate.value || "").trim();
    const cleanPassword = (password.value || "").trim();
    const cleanFullName = (fullName.value || "").trim();

    // campos obrigatórios
    if (!cleanEmail || !cleanBirth || !cleanUsername || !cleanPassword) {
        alert("Por favor, preencha todos os campos obrigatórios (Nome Completo é opcional).");
        return;
    }

    // *** VERIFICAÇÃO INFALÍVEL DE MAIÚSCULAS ***
    if (username.value !== cleanUsername) {
        alert("O nome de usuário deve conter SOMENTE letras minúsculas.");
        username.value = cleanUsername; // corrige automaticamente
        return;
    }

    // username já existe?
    if (usernameExists(cleanUsername)) {
        alert("Este nome de usuário já está em uso. Escolha outro.");
        return;
    }

    // email já existe?
    if (emailExists(cleanEmail)) {
        alert("Este email já está cadastrado. Use outro.");
        return;
    }

    // criar usuário
    const newUser = {
        fullName: cleanFullName || "",
        email: cleanEmail,
        birthDate: cleanBirth,
        username: cleanUsername,
        password: cleanPassword
    };

    users.push(newUser);
    saveUsers();

    usernameStatus = "taken";

    alert("Cadastro realizado com sucesso!");
    window.location.href = "home.html";
});


// -----------------------------
// LOGIN
// -----------------------------
loginBtn.addEventListener("click", () => {
    const idRaw = (loginIdentifier.value || "").trim();
    const pass = (loginPassword.value || "").trim();

    if (!idRaw || !pass) {
        alert("Preencha todos os campos!");
        return;
    }

    const isEmail = idRaw.includes("@");

    // se for username, tem que ser minúsculo
    if (!isEmail && idRaw !== idRaw.toLowerCase()) {
        alert("Para fazer login com NOME DE USUÁRIO, digite apenas letras minúsculas.");
        return;
    }

    const normalizedId = normalize(idRaw);

    const foundUser = users.find(u =>
        (normalize(u.username) === normalizedId || normalize(u.email) === normalizedId)
        && u.password === pass
    );

    if (!foundUser) {
        alert("Usuário não encontrado ou senha incorreta!");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(foundUser));
    window.location.href = "home.html";
});


// -----------------------------
// RECUPERAÇÃO DE SENHA
// -----------------------------
recoveryBtn.addEventListener('click', () => {
    if (recoveryEmail.value) {
        alert("Email de recuperação enviado para: " + recoveryEmail.value);
        recoveryScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        recoveryEmail.value = "";
    } else {
        alert("Por favor, digite seu email.");
    }
});
