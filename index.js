
        const USERS_KEY = "plotup_users";
        const CURRENT_USER_KEY = "loggedUser";

        // Funções do banco de dados
        function getUsers() {
            try {
                return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
            } catch {
                return [];
            }
        }

        function saveUsers(users) {
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }

        function setCurrentUser(user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }

        function getCurrentUser() {
            try {
                const user = localStorage.getItem(CURRENT_USER_KEY);
                return user ? JSON.parse(user) : null;
            } catch {
                return null;
            }
        }

        function fazerLogout() {
            localStorage.removeItem(CURRENT_USER_KEY);
            location.reload();
        }

        function irParaHome() {
            window.location.href = "home.html";
        }

        // Verificar se tem usuário logado ao carregar
        window.addEventListener('load', function() {
            const user = getCurrentUser();
            
            if (user) {
                // Mostrar opção de logout ou ir para o site
                document.getElementById('loggedInfo').classList.remove('hidden');
                document.getElementById('loggedUsername').textContent = user.username;
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('cadastroForm').classList.add('hidden');
                document.querySelector('.tabs').classList.add('hidden');
                console.log("ℹ️ Usuário já logado:", user.username);
            } else {
                console.log("ℹ️ Nenhum usuário logado - mostrando formulário");
            }
        });

        // Alternar entre login e cadastro
        document.getElementById('tabLogin').addEventListener('click', function() {
            document.getElementById('loginForm').classList.remove('hidden');
            document.getElementById('cadastroForm').classList.add('hidden');
            document.getElementById('tabLogin').classList.add('active');
            document.getElementById('tabCadastro').classList.remove('active');
            document.getElementById('message').innerHTML = '';
        });

        document.getElementById('tabCadastro').addEventListener('click', function() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('cadastroForm').classList.remove('hidden');
            document.getElementById('tabLogin').classList.remove('active');
            document.getElementById('tabCadastro').classList.add('active');
            document.getElementById('message').innerHTML = '';
        });

        // Mostrar mensagem
        function showMessage(text, type) {
            const msg = document.getElementById('message');
            msg.innerHTML = '<div class="msg ' + type + '">' + text + '</div>';
            setTimeout(function() { msg.innerHTML = ''; }, 3000);
        }

        // LOGIN
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("🔐 Processando login...");
            
            const user = document.getElementById('loginUser').value.trim();
            const pass = document.getElementById('loginPass').value;
            
            if (!user || !pass) {
                showMessage('Preencha todos os campos!', 'error');
                return;
            }
            
            const users = getUsers();
            const found = users.find(function(u) {
                return (u.username === user || u.email === user) && u.password === pass;
            });
            
            if (found) {
                console.log("✅ Login bem-sucedido:", found.username);
                setCurrentUser(found);
                showMessage('Login realizado! Redirecionando...', 'success');
                
                setTimeout(function() {
                    window.location.href = "home.html";
                }, 1000);
            } else {
                console.log("❌ Credenciais inválidas");
                showMessage('Usuário ou senha incorretos!', 'error');
            }
        });

        // CADASTRO
        document.getElementById('cadastroForm').addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("📝 Processando cadastro...");
            
            const nome = document.getElementById('cadNome').value.trim();
            const user = document.getElementById('cadUser').value.trim();
            const email = document.getElementById('cadEmail').value.trim();
            const nascimento = document.getElementById('cadNascimento').value;
            const pass = document.getElementById('cadPass').value;
            
            if (!nome || !user || !email || !nascimento || !pass) {
                showMessage('Preencha todos os campos!', 'error');
                return;
            }
            
            if (pass.length < 6) {
                showMessage('Senha deve ter no mínimo 6 caracteres!', 'error');
                return;
            }

            const birthDate = new Date(nascimento);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            let realAge = age;
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                realAge--;
            }

            if (realAge < 13) {
                showMessage('Você precisa ter pelo menos 13 anos!', 'error');
                return;
            }
            
            const users = getUsers();
            
            if (users.find(function(u) { return u.username === user; })) {
                showMessage('Nome de usuário já existe!', 'error');
                return;
            }
            
            if (users.find(function(u) { return u.email === email; })) {
                showMessage('E-mail já cadastrado!', 'error');
                return;
            }

            const parts = nascimento.split("-");
            const dataBR = parts[2] + '/' + parts[1] + '/' + parts[0];
            
            const newUser = {
                id: Date.now().toString(),
                nomeCompleto: nome,
                username: user,
                email: email,
                password: pass,
                nascimento: dataBR,
                telefone: "",
                contaPrivada: false,
                tema: "claro",
                seguidores: 0,
                seguindo: 0,
                dataCriacao: new Date().toISOString()
            };
            
            console.log("✅ Cadastro criado:", newUser.username);
            
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);
            
            showMessage('Cadastro realizado! Redirecionando...', 'success');
            
            setTimeout(function() {
                window.location.href = "home.html";
            }, 1000);
        });

        console.log("🚀 Sistema carregado");
        console.log("📊 Total de usuários:", getUsers().length);