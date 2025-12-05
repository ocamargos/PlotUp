
        const USERS_KEY = "plotup_users";
        const CURRENT_USER_KEY = "loggedUser";

        // Funções do banco de dados
        function getUsers() {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        }

        function saveUsers(users) {
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }

        function setCurrentUser(user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }

        function getCurrentUser() {
            return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
        }

        // Verificar se já está logado
        if (getCurrentUser()) {
            window.location.href = "home.html";
        }

        // Alternar entre login e cadastro
        function switchTab(tab) {
            const loginForm = document.getElementById('loginForm');
            const cadastroForm = document.getElementById('cadastroForm');
            const tabs = document.querySelectorAll('.tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            
            if (tab === 'login') {
                loginForm.classList.remove('hidden');
                cadastroForm.classList.add('hidden');
                tabs[0].classList.add('active');
            } else {
                loginForm.classList.add('hidden');
                cadastroForm.classList.remove('hidden');
                tabs[1].classList.add('active');
            }
            
            document.getElementById('message').innerHTML = '';
        }

        // Mostrar mensagem
        function showMessage(text, type) {
            const msg = document.getElementById('message');
            msg.innerHTML = `<div class="msg ${type}">${text}</div>`;
            setTimeout(() => msg.innerHTML = '', 3000);
        }

        // LOGIN
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const user = document.getElementById('loginUser').value.trim();
            const pass = document.getElementById('loginPass').value;
            
            const users = getUsers();
            const found = users.find(u => 
                (u.username === user || u.email === user) && u.password === pass
            );
            
            if (found) {
                setCurrentUser(found);
                showMessage('Login realizado com sucesso!', 'success');
                setTimeout(() => window.location.href = "home.html", 500);
            } else {
                showMessage('Usuário ou senha incorretos!', 'error');
            }
        });

        // CADASTRO
        document.getElementById('cadastroForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('cadNome').value.trim();
            const user = document.getElementById('cadUser').value.trim();
            const email = document.getElementById('cadEmail').value.trim();
            const pass = document.getElementById('cadPass').value;
            
            if (pass.length < 6) {
                showMessage('Senha deve ter no mínimo 6 caracteres!', 'error');
                return;
            }
            
            const users = getUsers();
            
            if (users.find(u => u.username === user)) {
                showMessage('Nome de usuário já existe!', 'error');
                return;
            }
            
            if (users.find(u => u.email === email)) {
                showMessage('E-mail já cadastrado!', 'error');
                return;
            }
            
            const newUser = {
                id: Date.now().toString(),
                nomeCompleto: nome,
                username: user,
                email: email,
                password: pass,
                nascimento: "",
                telefone: "",
                contaPrivada: false,
                tema: "claro",
                seguidores: 0,
                seguindo: 0,
                dataCriacao: new Date().toISOString()
            };
            
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);
            
            showMessage('Cadastro realizado com sucesso!', 'success');
            setTimeout(() => window.location.href = "home.html", 500);
        });