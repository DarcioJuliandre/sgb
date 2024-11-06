async function createTableBook() {
  const tableBook = document.querySelector(".table-book");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  ["LivroID", "Título", "Autor", "Gênero", "Status", "ID", "Ações"].forEach(
    (headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    }
  );
  thead.appendChild(headerRow);

  const livros = await carregarLivros();

  livros.forEach((livro) => {
    const { nomeDoLivro } = livro;
    const row = document.createElement("tr");
    const cells = Object.values(livro).map(createCell);
    cells.forEach((cell) => row.appendChild(cell));

    const actionTd = document.createElement("td");

    const editButton = createButton("edit", () =>
      startEditing(
        row,
        cells,
        editButton,
        deleteButton,
        saveButton,
        cancelButton
      )
    );
    const saveButton = createButton(
      "save",
      () =>
        saveChanges(cells, editButton, deleteButton, saveButton, cancelButton),
      true
    );
    const cancelButton = createButton(
      "close",
      () =>
        cancelEditing(
          cells,
          editButton,
          deleteButton,
          saveButton,
          cancelButton
        ),
      true
    );
    const deleteButton = createButton("delete", () =>
      alert(`Excluir o livro: ${nomeDoLivro}?`)
    );

    [editButton, saveButton, cancelButton, deleteButton].forEach((button) =>
      actionTd.appendChild(button)
    );
    row.appendChild(actionTd);
    tbody.appendChild(row);
  });

  tableBook.appendChild(thead);
  tableBook.appendChild(tbody);
}

async function createTableUsers() {
  const tableUsers = document.querySelector(".table-users");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  [
    "ID Usuário",
    "Nome",
    "Sobrenome",
    "CPF",
    "Email",
    "Admin",
    "ID",
    "Ações",
  ].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const usuarios = await carregarUsuarios();

  usuarios.forEach((usuario) => {
    const { nome } = usuario;
    const row = document.createElement("tr");
    const cells = Object.values(usuario).map(createCell);
    cells.forEach((cell) => row.appendChild(cell));

    const actionTd = document.createElement("td");

    const editButton = createButton("edit", () =>
      startEditing(
        row,
        cells,
        editButton,
        deleteButton,
        saveButton,
        cancelButton
      )
    );
    const saveButton = createButton(
      "save",
      () =>
        saveChanges(cells, editButton, deleteButton, saveButton, cancelButton),
      true
    );
    const cancelButton = createButton(
      "close",
      () =>
        cancelEditing(
          cells,
          editButton,
          deleteButton,
          saveButton,
          cancelButton
        ),
      true
    );
    const deleteButton = createButton("delete", () =>
      alert(`Excluir o usuário: ${nome}?`)
    );

    [editButton, saveButton, cancelButton, deleteButton].forEach((button) =>
      actionTd.appendChild(button)
    );
    row.appendChild(actionTd);
    tbody.appendChild(row);
  });

  tableUsers.appendChild(thead);
  tableUsers.appendChild(tbody);
}

async function createTableSolicitacoes() {
  const solicitacoesTable = document.querySelector(".solicitacoes");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  [
    "ID",
    "Data",
    "Hora",
    "ID Usuario",
    "ID Livro",
    "Tipo",
    "Status",
    "ID Solicitacao",
  ].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const solicitacoes = await carregarSolicitacoes();

  solicitacoes.forEach((solicitacao) => {
    const row = document.createElement("tr");
    const cells = Object.values(solicitacao).map(createCell);
    cells.forEach((cell) => row.appendChild(cell));

    const actionTd = document.createElement("td");

    row.appendChild(actionTd);
    tbody.appendChild(row);
  });

  solicitacoesTable.appendChild(thead);
  solicitacoesTable.appendChild(tbody);
}

createTableBook();
createTableUsers();
createTableSolicitacoes();
