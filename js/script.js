const form = document.getElementById("formInscricao");
const mensagem = document.getElementById("mensagem");
const resumo = document.getElementById("resumo");
const dadosResumo = document.getElementById("dadosResumo");
const btnLimpar = document.getElementById("btnLimpar");

function limparErros() {
    document.querySelectorAll(".erro").forEach(el => el.textContent = "");
    document.querySelectorAll(".invalido").forEach(el => el.classList.remove("invalido"));
}

function erroCampo(id, texto) {
    const campo = document.getElementById(id);
    campo.classList.add("invalido");
    const erro = campo.parentElement.querySelector(".erro");
    if (erro) erro.textContent = texto;
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    limparErros();
    mensagem.textContent = "";

    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const email = document.getElementById("email").value.trim();
    const instituicao = document.getElementById("instituicao").value.trim();
    const curso = document.getElementById("curso").value.trim();
    const dataParticipacao = document.getElementById("dataParticipacao").value;
    const minicurso = document.getElementById("minicurso").value;
    const modalidade = document.querySelector('input[name="modalidade"]:checked');
    const interessesMarcados = [...document.querySelectorAll('input[name="interesses"]:checked')];
    const observacoes = document.getElementById("observacoes").value.trim();

    let valido = true;

    if (nome.length < 3) {
        erroCampo("nome", "Informe o nome completo.");
        valido = false;
    }

    if (!idade || Number(idade) < 16 || Number(idade) > 100) {
        erroCampo("idade", "A idade deve estar entre 16 e 100 anos.");
        valido = false;
    }

    if (!emailValido(email)) {
        erroCampo("email", "Informe um e-mail válido.");
        valido = false;
    }

    if (!instituicao) {
        erroCampo("instituicao", "Informe a instituição.");
        valido = false;
    }

    if (!curso) {
        erroCampo("curso", "Informe o curso.");
        valido = false;
    }

    if (!dataParticipacao) {
        erroCampo("dataParticipacao", "Selecione a data de participação.");
        valido = false;
    }

    if (!minicurso) {
        erroCampo("minicurso", "Selecione um minicurso.");
        valido = false;
    }

    if (!modalidade) {
        document.getElementById("erroModalidade").textContent = "Selecione uma modalidade.";
        valido = false;
    }

    if (interessesMarcados.length === 0) {
        document.getElementById("erroInteresses").textContent = "Selecione pelo menos uma área de interesse.";
        valido = false;
    }

    const interesses = interessesMarcados.map(item => item.value);

    if (
        minicurso === "Introdução à Inteligência Artificial" &&
        !interesses.includes("Inteligência Artificial")
    ) {
        document.getElementById("erroInteresses").textContent =
            "Para este minicurso, selecione também Inteligência Artificial como área de interesse.";
        valido = false;
    }

    if (
        minicurso === "JavaScript para Web" &&
        modalidade &&
        modalidade.value === "Online"
    ) {
        document.getElementById("erroModalidade").textContent =
            "O minicurso JavaScript para Web está disponível somente na modalidade Presencial.";
        valido = false;
    }

    if (!valido) {
        mensagem.style.color = "#b42318";
        mensagem.textContent = "Confira os campos obrigatórios.";
        return;
    }

    mensagem.style.color = "#267a3d";
    mensagem.textContent = "Inscrição realizada com sucesso!";

    dadosResumo.innerHTML = `
        <p><strong>Participante:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Instituição:</strong> ${instituicao}</p>
        <p><strong>Curso:</strong> ${curso}</p>
        <p><strong>Minicurso:</strong> ${minicurso}</p>
        <p><strong>Modalidade:</strong> ${modalidade.value}</p>
        <p><strong>Interesses:</strong> ${interesses.join(", ")}</p>
        ${observacoes ? `<p><strong>Observações:</strong> ${observacoes}</p>` : ""}
    `;

    resumo.classList.remove("oculto");
    resumo.scrollIntoView({ behavior: "smooth", block: "start" });
});

btnLimpar.addEventListener("click", function() {
    form.reset();
    limparErros();
    mensagem.textContent = "";
    resumo.classList.add("oculto");
    dadosResumo.innerHTML = "";
});