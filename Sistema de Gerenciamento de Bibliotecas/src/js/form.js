async function insertOptions(property, selectId, inputId) {
  const livros = await carregarLivros();
  const uniqueValues = [...new Set(livros.map((livro) => livro[property]))];
  uniqueValues.sort((a, b) => a.localeCompare(b));

  const select = document.getElementById(selectId);
  const input = document.getElementById(inputId);

  for (const value of uniqueValues) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }

  const otherOption = document.createElement("option");
  otherOption.value = "outro";
  otherOption.textContent = "Outro";
  select.appendChild(otherOption);

  select.addEventListener("change", () => {
    if (select.value === "outro") {
      input.classList.add("show");
      input.focus();
    } else {
      input.classList.remove("show");
      input.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  insertOptions("autor", "bookAuthor", "customAuthorInput");
  insertOptions("genero", "bookGenre", "customGenreInput");
});
