async function carregarLivros() {
  try {
    const url = "http://localhost:5500/livros";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao carregar os dados: " + response.status);
    }

    const livros = await response.json();

    return livros;
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function carregarUsuarios() {
  try {
    const url = "http://localhost:5500/usuarios";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao carregar os dados: " + response.status);
    }

    const usuarios = await response.json();

    return usuarios;
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function carregarSolicitacoes() {
  try {
    const url = "http://localhost:5500/solicitacoes";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao carregar os dados: " + response.status);
    }

    const solicitacoes = await response.json();

    return solicitacoes;
  } catch (error) {
    console.error("Erro:", error);
  }
}

function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function livroHandleClick(livro) {
  const url = `livro.html?id=${livro.idLivro}`;
  window.location.href = url;
}

function criarPrompt(livro) {
  const { nomeDoLivro } = livro;

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <h2>Solicitação de Livro</h2>
    <p>Você deseja solicitar o livro "${nomeDoLivro}"?</p>
  `;

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("button-pattern");
  confirmButton.textContent = "Confirmar";
  confirmButton.addEventListener("click", async () => {
    await enviarSolicitacao(livro);
    overlay.classList.remove("show");
    document.body.removeChild(overlay);
  });

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("button-pattern");
  cancelButton.textContent = "Cancelar";
  cancelButton.addEventListener("click", () => {
    overlay.classList.remove("show");
    document.body.removeChild(overlay);
  });

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  overlay.classList.add("show");
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

async function enviarSolicitacao(livro) {
  try {
    const idUsuario = 1;

    const { idLivro } = livro;

    const tipoSolicitacao = "Empréstimo";
    const statusSolicitacao = "Em andamento";
    const dataAtual = new Date();

    const data = dataAtual.toISOString().split("T")[0];
    const hora = dataAtual.toTimeString().split(" ")[0].slice(0, 5);

    function generateIdSolicitacao() {
      return Math.random().toString(36).substring(2, 6);
    }

    const response = await fetch("http://localhost:5500/solicitacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
        hora,
        idUsuario,
        idLivro,
        tipoSolicitacao,
        statusSolicitacao,
        idSolicitacao: generateIdSolicitacao(), // Função para gerar o ID único da solicitação
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar a solicitação");
    }

    const responseData = await response.json();
    console.log("Solicitação enviada:", responseData);

    await atualizarStatusLivro(livro);
  } catch (error) {
    console.error(error.message);
  }
}

async function atualizarStatusLivro(livro) {
  try {

    const { id } = livro;

    const response = await fetch(`http://localhost:5500/livros/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Reservado",
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o status do livro");
    }

    const data = await response.json();
    console.log("Status do livro atualizado:", data);
  } catch (error) {
    console.error(error.message);
  }
}

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function createCell(value) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

function createButton(icon, onClick, hidden = false) {
  const button = document.createElement("button");
  button.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
  button.classList.add("button-pattern");
  button.style.display = hidden ? "none" : "inline-block";
  button.addEventListener("click", onClick);
  return button;
}

function toggleButtons(
  editButton,
  deleteButton,
  saveButton,
  cancelButton,
  isEditing
) {
  editButton.style.display = isEditing ? "none" : "inline-block";
  deleteButton.style.display = isEditing ? "none" : "inline-block";
  saveButton.style.display = isEditing ? "inline-block" : "none";
  cancelButton.style.display = isEditing ? "inline-block" : "none";
}

function startEditing(
  row,
  cells,
  editButton,
  deleteButton,
  saveButton,
  cancelButton
) {
  cells.forEach((cell) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = cell.textContent;
    cell.textContent = "";
    cell.appendChild(input);
  });
  toggleButtons(editButton, deleteButton, saveButton, cancelButton, true);
}

function saveChanges(
  cells,
  editButton,
  deleteButton,
  saveButton,
  cancelButton
) {
  cells.forEach((cell) => {
    const input = cell.querySelector("input");
    cell.textContent = input.value;
  });
  toggleButtons(editButton, deleteButton, saveButton, cancelButton, false);
}

function cancelEditing(
  cells,
  editButton,
  deleteButton,
  saveButton,
  cancelButton
) {
  cells.forEach((cell) => {
    const input = cell.querySelector("input");
    cell.textContent = input.value;
  });
  toggleButtons(editButton, deleteButton, saveButton, cancelButton, false);
}
