import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxlhawuluhnwzixygwmy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94bGhhd3VsdWhud3ppeHlnd215Iiwicm9sZS...';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// -----------------------------
// ESTADO DA APLICAÇÃO
// -----------------------------
let isLogin = true; // Define qual aba está ativa
let usernameStatus = null;

// -----------------------------
// ELEMENTOS DO DOM
// -----------------------------
const mainScreen = document.getElementById('mainScreen');
const recoveryScreen = document.getElementById('recoveryScreen');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const loginIdentifier = document.getElementById('loginIdentifier');
const loginPassword = document.getElementById('loginPassword');
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginBtn = document.getElementById('loginBtn');
const forgotLink = document.getElementById('forgotLink');

const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthDate');
const username = document.getElementById('username');
const password = document.getElementById('password');
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const usernameMsg = document.getElementById('usernameMsg');
const signupBtn = document.getElementById('signupBtn');

const recoveryEmail = document.getElementById('recoveryEmail');
const recoveryBtn = document.getElementById('recoveryBtn');
const backBtn = document.getElementById('backBtn');

// -----------------------------
// HELPERS
// -----------------------------
function normalize(text) {
    return String(text || "").trim().toLowerCase();
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
    loginPassword.type = loginPassword.type === 'password' ? 'text' : 'password';
});
toggleSignupPassword.addEventListener('click', () => {
    password.type = password.type === 'password' ? 'text' : 'password';
});

// -----------------------------
// VERIFICAÇÕES SUPABASE
// -----------------------------
async function usernameExists(rawUsername) {
    const { data } = await supabase.from('users').select('id').eq('username', rawUsername).single();
    return !!data;
}

async function emailExists(rawEmail) {
    const { data } = await supabase.from('users').select('id').eq('email', rawEmail).single();
    return !!data;
}

// -----------------------------
// CADASTRO
// -----------------------------
signupBtn.addEventListener('click', async () => {
    const cleanEmail = normalize(email.value);
    const cleanUsername = normalize(username.value);
    const cleanBirth = (birthDate.value || "").trim();
    const cleanPassword = (password.value || "").trim();
    const cleanFullName = (fullName.value || "").trim();

    if (!cleanEmail || !cleanBirth || !cleanUsername || !cleanPassword) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    if (username.value !== cleanUsername) {
        alert("O nome de usuário deve ser minúsculo.");
        username.value = cleanUsername;
        return;
    }

    if (await usernameExists(cleanUsername)) {
        alert("Nome de usuário já existe.");
        return;
    }

    if (await emailExists(cleanEmail)) {
        alert("Email já cadastrado.");
        return;
    }

    const { data, error } = await supabase.from('users').insert([{
        full_name: cleanFullName,
        username: cleanUsername,
        email: cleanEmail,
        password_hash: cleanPassword,
        birth_date: cleanBirth
    }]);

    if (error) {
        console.error(error);
        alert("Erro ao criar usuário.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    loginTab.click(); // volta para aba de login
});

// -----------------------------
// LOGIN
// -----------------------------
loginBtn.addEventListener('click', async () => {
    if (!isLogin) return; // só funciona na aba login

    const idRaw = (loginIdentifier.value || "").trim();
    const pass = (loginPassword.value || "").trim();

    if (!idRaw || !pass) {
        alert("Preencha todos os campos!");
        return;
    }

    const normalizedId = normalize(idRaw);
    const isEmail = idRaw.includes("@");

    let query = supabase.from('users').select('*');
    query = isEmail ? query.eq('email', normalizedId) : query.eq('username', normalizedId);

    const { data, error } = await query.single();

    if (error || !data || data.password_hash !== pass) {
        alert("Usuário não encontrado ou senha incorreta!");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(data));
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
        alert("Digite seu email.");
    }
});
