function salvarEdicao() {
    // Pega valores dos inputs do popup
    const nomeCompleto = document.getElementById("input_nome_completo").value;
    const nomeUsuario = document.getElementById("input_nome_usuario").value;
    const nascimento = document.getElementById("input_nascimento").value;
    const email = document.getElementById("input_email").value;
    const telefone = document.getElementById("input_telefone").value;

    // Atualiza os textos do card
    document.getElementById("nome_completo").textContent =
        "Nome Completo: " + nomeCompleto;

    document.getElementById("nome_usuario").textContent =
        "Nome de Usuário: " + nomeUsuario;

    // Converte data YYYY-MM-DD → DD/MM/YYYY
    if (nascimento) {
        const [ano, mes, dia] = nascimento.split("-");
        document.getElementById("nascimento").textContent =
            "Data de Nascimento: " + `${dia}/${mes}/${ano}`;
    }

    document.getElementById("email").textContent =
        "E-Mail: " + email;

    document.getElementById("telefone").textContent =
        "Telefone (Celular): " + telefone;
}